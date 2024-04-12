import userModel from "../models/user.model.js";

export default class Users {
	constructor() {
		console.log(`Working users with Database persistence in mongodb`);
	}

	//crear un usuario
	create = async (user) => {
		try {
			let result = await userModel.create(user);
			return result;
		} catch (error) {
			throw new Error("Error al crear usuario: " + error.message);
		}
	};

	//obtener todos los usuarios
	getAll = async () => {
		try {
			let users = await userModel.find().lean();
			return users;
		} catch (error) {
			throw new Error(
				"Error al obtener todos los usuarios: " + error.message
			);
		}
	};

	//obtener un usuario por id
	getById = async (uid) => {
		try {
			let result = await userModel.findById(uid);
			return result;
		} catch (error) {
			throw new Error(
				"Error al obtener usuario por ID: " + error.message
			);
		}
	};

	//obtener un usuario por email
	getByEmail = async (email) => {
		try {
			const user = await userModel.findOne({ email: email });
			if (user) {
				return user._id;
			} else {
				return null;
			}
		} catch (error) {
			throw new Error(
				"Error al obtener el ID del usuario por email: " + error.message
			);
		}
	};

	//obtener todos los datos del usuario por su email
	getDataByEmail = async (email) => {
		try {
			const user = await userModel.findOne({ email: email });
			if (user) {
				return user;
			} else {
				return null;
			}
		} catch (error) {
			throw new Error(
				"Error al obtener el usuario por email: " + error.message
			);
		}
	};

	//actualiza el id del carrito del usuario
	updateIdCart = async (user) => {
		try {
			await userModel.findByIdAndUpdate(user._id, user, { new: true });
			return user; // Devuelve el usuario actualizado
		} catch (error) {
			throw new Error(`Error al actualizar el usuario: ${error.message}`);
		}
	};

	//cambiar rol de usuario
	update = async (uid, newRole) => {
		try {
			const result = await userModel.findByIdAndUpdate(uid, {
				role: newRole,
			});
			return result;
		} catch (error) {
			throw new Error(
				"Error al cambiar rol del usuario: " + error.message
			);
		}
	};

	//subir imagen de perfil del usuario
	upAvatar = async (uid, imagePath) => {
		try {
			const user = await userModel.findById(uid);
			if (!user) {
				throw new Error("Usuario no encontrado");
			}
			user.profileImage = imagePath;
			await user.save();

			return {
				message:
					"Ruta de la imagen actualizada correctamente en la base de datos",
			};
		} catch (error) {
			throw new Error("Error al subir foto de perfil: " + error.message);
		}
	};

	//subir los documentos del usuario
	upDocument = async (uid, documentType, filePath) => {
		try {
			const user = await userModel.findById(uid);
			if (!user) {
				throw new Error("Usuario no encontrado");
			}
			user.documents.push({
				name: documentType,
				reference: filePath,
			});
			await user.save();

			return { success: true };
		} catch (error) {
			throw new Error("Error al subir documento: " + error.message);
		}
	};

	//eliminar usuario
	delete = async (uid) => {
		try {
			let userDeleted = await userModel.findByIdAndDelete(uid);
			return userDeleted;
		} catch (error) {
			throw new Error("Error al eliminar usuario: " + error.message);
		}
	};
}
