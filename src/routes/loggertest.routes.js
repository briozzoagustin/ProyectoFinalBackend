import { Router } from "express";

import { loggerMiddleware } from "../logger.js";

const router = Router();

//ruta prueba de logs
router.get("/", loggerMiddleware, (req, res) => {
	req.logger.debug("Este es un mensaje de nivel DEBUG");
	req.logger.http("Este es un mensaje de nivel HTTP");
	req.logger.info("Este es un mensaje de nivel INFO");
	req.logger.warning("Este es un mensaje de nivel WARNING");
	req.logger.error("Este es un mensaje de nivel ERROR");
	req.logger.fatal("Este es un mensaje de nivel FATAL");

	res.send(
		"Logs generados en la consola o archivo de registro según el entorno."
	);
});

export default router;
