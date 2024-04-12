import { Router } from "express";
import { passportCall } from "../utils.js";
import { logoutSession } from "../controller/session.controller.js";

const router = Router();

//ruta cierre de sesion
router.get("/", passportCall("jwt"), logoutSession);

export default router;
