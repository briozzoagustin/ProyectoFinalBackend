import { __dirname } from "../utils.js";

//autorizacion de administradores
export function isAdmin(req, res, next) {

  if (req.user && req.user.user.user.role == 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}

// autorización de usuarios premium
export function isPremium(req, res, next) {
  if (req.user && req.user.user.user.role == 'premium') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}

//autorización de usuarios
export function isUser(req, res, next) {

  if (req.user && req.user.user.user.role == 'user') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}



