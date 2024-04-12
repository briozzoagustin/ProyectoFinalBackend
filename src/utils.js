import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcrypt";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

const secretCookie = process.env.PASS_COOKIE;

export const generateToken = (user) => {
	const token = jwt.sign({ user }, secretCookie, { expiresIn: "2h" });
	return token;
};

export const authToken = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) res.status(401).json({ error: "Error de autenticacion" });

	jwt.verify(authHeader, secretKey, (err, user) => {
		if (err) res.status(401).json({ error: "Token invalido" });

		req.user = user;
		next();
	});
};

export const passportCall = (strategy) => {
	return async (req, res, next) => {
		passport.authenticate(strategy, (error, user, info) => {
			if (error) {
				return next(error); //manejar errores de autenticacion
			}

			if (!user) {
				if (info && info.message) {
					return res
						.status(401)
						.json({ status: "error", message: info.message });
				} else {
					return res
						.status(401)
						.json({ status: "error", message: "No autorizado" });
				}
			}

			req.user = user; //asignar el usuario a req.user
			next();
		})(req, res, next);
	};
};

export const authorization = () => {
	return async (req, res, next) => {
		if (req.session.user && req.session.user.role.admin) {
			return next();
		} else return res.status(403).json("error de autenticacion");
	};
};
//hasheo de contraseña
export const createHash = (password) =>
	bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//compara la contraseña sin hashear con la que esta en la base de datos
export const isValidPassword = (savedPassword, password) => {
	console.log({ "cloud password": savedPassword, loginPassword: password });
	return bcrypt.compareSync(password, savedPassword);
};

//generar un producto de mocking
export const generateProductMocks = () => {
	return {
		name: faker.commerce.productName(),
		description: faker.lorem.sentence(),
		price: faker.datatype.number({ min: 10, max: 1000, precision: 0.01 }),
		category: faker.commerce.department(),
		availability: faker.datatype.number({ min: 0, max: 100 }),
	};
};
