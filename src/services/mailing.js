import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { userService } from "../repositories/services.js";

dotenv.config();

//configuracion de nodemailer
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // true for 465, false for other ports 587
	auth: {
		user: process.env.MAILING_USER,
		pass: process.env.MAILING_PASSWORD,
	},
});

//enviar correo electronico al usuario que se elimino su cuenta por inactividad
async function sendEmail(emailAddress) {
	const mailOptions = {
		from: process.env.MAILING_USER,
		to: emailAddress,
		subject: "Eliminación de cuenta por inactividad",
		text: "Tu cuenta ha sido eliminada debido a la inactividad durante un período de tiempo.",
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log(`Correo enviado a ${emailAddress}`);
	} catch (error) {
		console.error("Error al enviar el correo:", error);
	}
}

//enviar correo electronico cuando se elimina un producto al usuario premium
async function sendEmailToPremium(emailAddress) {
	const mailOptions = {
		from: process.env.MAILING_USER,
		to: emailAddress,
		subject: "Eliminación de producto",
		text: "Se ha eliminado un producto que creaste.",
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log(`Correo enviado a ${emailAddress}`);
	} catch (error) {
		console.error("Error al enviar el correo:", error);
	}
}

//eliminar usuarios inactivos
async function deleteInactiveUsers() {
	const limiteInactividad = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); //ultimos 30 días
	try {
		const usuarios = await userService.getAllUsers();

		const usuariosInactivos = usuarios.filter(
			(user) =>
				user.last_connection < limiteInactividad &&
				(user.role === "user" || user.role === "premium")
		);
		if (usuariosInactivos) {
			for (const usuario of usuariosInactivos) {
				await sendEmail(usuario.email);
				await userService.deleteUser(usuario._id);
				console.log(
					`Correo enviado y usuario ${usuario.email} eliminado por inactividad`
				);
			}
		} else {
			res.json({ message: "No hay usuarios inactivos" });
		}
	} catch (error) {
		res.json({ message: "Error al encontrar usuarios inactivos:", error });
	}
}

//llamar a la función para eliminar usuarios inactivos y enviar correos
deleteInactiveUsers().catch((error) => {
	console.error("Error al eliminar usuarios inactivos:", error);
});

//enviar correo de recuperacion
const enviarCorreoRecuperacion = (emailAddress, recoveryLink) => {
	const mailOptions = {
		from: process.env.MAILING_USER,
		to: emailAddress,
		subject: "Recuperación de contraseña",
		text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${recoveryLink}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error("Error al enviar el correo:", error);
		} else {
			console.log("Correo enviado:", info.response);
		}
	});
};

export { deleteInactiveUsers, sendEmailToPremium, enviarCorreoRecuperacion };
