import memoryProductDao from "./memory/product.dao.js";
import mongoProductDao from "./dbManagers/productDao.js";
import memoryUserDao from "./memory/user.dao.js";
import mongoUserDao from "./dbManagers/userDao.js";
import memoryCartDao from "./memory/cart.dao.js";
import mongoCartDao from "./dbManagers/cartDao.js";
import mongoTicketDao from "./dbManagers/ticketDao.js";
import memoryTicketDao from "./memory/ticket.dao.js";
import { PERSISTENCE } from "../config/config.js";

export const PRODUCTDAO =
	PERSISTENCE === "MONGO" ? new mongoProductDao() : new memoryProductDao();
export const USERDAO =
	PERSISTENCE === "MONGO" ? new mongoUserDao() : new memoryUserDao();
export const CARTDAO =
	PERSISTENCE === "MONGO" ? new mongoCartDao() : new memoryCartDao();
export const TICKETDAO =
	PERSISTENCE === "MONGO" ? new mongoTicketDao() : new memoryTicketDao();
