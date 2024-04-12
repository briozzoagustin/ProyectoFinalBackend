import { ticketService } from "../repositories/services.js";

//creo ticket
const saveTicket = async (req, res) => {
	const ticket = req.body;
	const user = req.user;
	await ticketService.createTicket(user);
	res.json(ticket);
};

//obtengo todos los productos
const getAllTickets = async (req, res) => {
	const tickets = await ticketService.getAllTickets();
	res.send(tickets);
};

//obtener tickets por id
const getTicketById = async (req, res) => {
	const tid = req.params.tid;
	const ticket = await ticketService.getTicketById(tid);
	ticket._id = ticket._id.toString();
	res.render("finish-purchase", ticket);
};

//obtener tickets por email de usuario
const getTicketByEmail = async (req, res) => {
	const userEmail = req.user.user.user.email;
	const ticket = await ticketService.getTicketByEmail(userEmail);
	ticket._id = ticket._id.toString();
	res.render("finish-purchase", ticket);
};

export { saveTicket, getAllTickets, getTicketById, getTicketByEmail };
