import { userService } from "../repositories/services.js";
import { createUserDTO } from "../DTO/userDTO.js";
import notifier from "node-notifier";

//guardar usuario
const saveUser = async (req, res) => {
	const { first_name, last_name, email, age, password } = req.body;

	if (!first_name || !last_name || !email || !age || !password) {
		return res.status(400).json({
			status: "error",
			error: "Incomplete values",
		});
	}
	try {
		//crea un nuevo usuario utilizando el modelo User y el esquema de usuario
		const newUser = new User({
			first_name,
			last_name,
			email,
			age,
			password,
		});
		//asocia un carrito vacío al nuevo usuario
		const newCart = new Cart();
		await newCart.save();
		newUser.cart = newCart._id;

		//establecer el rol predeterminado como 'user'
		newUser.role = "user";
		const createdUser = await userService.createUser(newUser);

		res.status(201).json({
			status: "success",
			message: "Usuario creado exitosamente",
			user: createdUser,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: "error",
			error: "No se pudo crear el usuario",
		});
	}
};

//obtener todos los usuarios
const getAllUsers = async (req, res) => {
	try {
		const allUsers = await userService.getAllUsers();
		const userDTOs = allUsers.map((users) => createUserDTO(users));
		res.render("all-users", { users: userDTOs });
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener usuarios",
			error: error.message,
		});
	}
};

//obtener usuario por id
const getUserById = async (req, res) => {
	const uid = req.params.uid;
	const userId = await userService.getUserById(uid);
	res.send(userId);
};

//obtener usuario por id para cambiar de rol
const getUserForChange = async (req, res) => {
	const uid = req.params.uid;
	const userId = await userService.getUserById(uid);
	const users = await userService.getAllUsers();
	res.render("edit-users", { userId: userId, users: users });
};

//cambiar rol de usuario
const changeRoleUser = async (req, res) => {
	const uid = req.params.uid;
	const { newRole } = req.body;
	//obtengo información sobre la carga de documentos del usuario
	const user = await userService.getUserById(uid);

	//verificao la existencia de los documentos requeridos
	const requiredDocuments = [
		"identification",
		"addressProof",
		"bankStatement",
	];
	const hasRequiredDocuments = requiredDocuments.every((documentType) =>
		user.documents.some((document) => document.name === documentType)
	);

	if (hasRequiredDocuments) {
		//cambiar rol de usuario solo si cargo los documentos
		const updatedUser = await userService.updateUser(uid, newRole);
		notifier.notify({
			title: "Exito",
			message: "Rol modificado correctamente",
		});
		res.send(updatedUser);
	} else {
		notifier.notify({
			title: "Error",
			message: "Antes debes cargar los documentos correspondiente",
		});
	}
};

//obtener usuario por mail
const getUserByEmail = async (req, res) => {
	const email = req.params.userEmail;
	const userId = await userService.getUserIdByEmail(email);
	res.send(userId);
};

//ir a la ruta para subir los documentos
const goUpDocument = async (req, res) => {
	const uid = req.params.uid;
	const userId = await userService.getUserById(uid);
	res.render("up-document", { userId });
};

//guardo la imagen de perfil con multer
const uploadProfileUser = async (req, res) => {
	try {
		const userId = req.params.uid;
		const imagePath = req.file.path;
		await userService.uploadProfileUser(userId, imagePath);

		notifier.notify({
			title: "Foto agregada",
			message: "Tu imagen fue agregada al perfil",
		});
		res.redirect(303, `/api/users/${userId}/profile`);
	} catch (error) {
		res.status(500).json({
			error: "Error interno del servidor al subir la imagen de perfil",
		});
	}
};

//subir documentos con multer
const uploadDocumentUser = async (req, res) => {
	try {
		const userId = req.params.uid;
		const documentType = req.body.documentType;
		if (!req.file) {
			return res
				.status(400)
				.json({ error: "Por favor, selecciona un archivo." });
		}
		const filePath = req.file.path;
		await userService.uploadDocument(userId, documentType, filePath);

		notifier.notify({
			title: "Carga documento",
			message: "Tu documento fue cargado correctamente",
		});

		res.redirect(303, `/api/users/${userId}/profile`);
	} catch (error) {
		res.status(500).json({
			error: "Error interno del servidor al subir el archivo.",
		});
	}
};

//ir al perfil
const getProfile = async (req, res) => {
	const userId = req.params.uid;
	const profile = await userService.getUserById(userId);
	res.render("profile", profile);
};

//eliminar usuario
const deleteUser = async (req, res) => {
	const userId = req.params.uid;
	await userService.deleteUser(userId);
	notifier.notify({
		title: "Exito",
		message: "Usuario eliminado correctamente",
	});
	return;
};

export {
	saveUser,
	getAllUsers,
	getUserById,
	changeRoleUser,
	getUserForChange,
	getUserByEmail,
	goUpDocument,
	uploadDocumentUser,
	getProfile,
	uploadProfileUser,
	deleteUser,
};
