import Users from "../dao/dbManagers/userDao.js";
import UserRepository from "./user.repository.js";
import Products from "../dao/dbManagers/productDao.js";
import ProductRepository from "./product.repository.js";
import Tickets from "../dao/dbManagers/ticketDao.js";
import TicketRepository from "./ticket.repository.js";
import Carts from "../dao/dbManagers/cartDao.js";
import CartRepository from "./cart.repository.js";

const usersDao = new Users();
const productsDao = new Products();
const ticketsDao = new Tickets();
const cartsDao = new Carts();

export const userService = new UserRepository(usersDao);
export const productService = new ProductRepository(productsDao);
export const ticketService = new TicketRepository(ticketsDao);
export const cartService = new CartRepository(cartsDao);
