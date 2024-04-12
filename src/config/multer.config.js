import multer from "multer";
import { __dirname } from "../utils.js";

//defino la función storage que determina la carpeta de destino
function storage(folderName) {
	return multer.diskStorage({
		destination: function (req, file, cb) {
			if (folderName === "profiles") {
				const uploadPath = "./public/upload/profiles/";
				cb(null, uploadPath);
			} else if (folderName === "products") {
				const uploadPath = "./public/upload/products/";
				cb(null, uploadPath);
			} else if (folderName === "documents") {
				const uploadPath = "./public/upload/documents/";
				cb(null, uploadPath);
			} else {
				cb(new Error("Tipo de archivo no válido"));
			}
		},
		filename: function (req, file, cb) {
			let uniqueFilename;
			const userId = req.params.uid;
			const documentType = req.body.documentType;

			if (folderName === "products") {
				uniqueFilename = `${userId}_${file.originalname}`;
			} else {
				uniqueFilename = `${userId}_${documentType}_${file.originalname}`;
			}

			cb(null, uniqueFilename);
		},
	});
}

//configuración de multer para subir diferentes tipos de archivos a diferentes carpetas
export const uploadProfileImage = multer({ storage: storage("profiles") });
export const uploadProductImage = multer({ storage: storage("products") });
export const uploadDocument = multer({ storage: storage("documents") });
