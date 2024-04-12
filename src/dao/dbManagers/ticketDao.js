import ticketModel from "../models/ticket.model.js";

export default class TicketDao {
	constructor() {
		console.log(`Working users with Database persistence in mongodb`);
	}

	//crear un ticket
	create = async (data) => {
		try {
			const newTicket = await ticketModel.create(data);
			return newTicket;
		} catch (error) {
			throw new Error("Error al guardar el ticket: " + error.message);
		}
	};

	//obtener ticket por id
	getById = async (tid) => {
		try {
			let ticketId = await ticketModel.findById({ _id: tid });
			return ticketId;
		} catch (error) {
			throw new Error(
				"Error al obtener el ticket por ID: " + error.message
			);
		}
	};

	//obtener ticket por email
	getByEmail = async (userEmail) => {
		try {
			let ticket = await ticketModel.findOne({ purchaser: userEmail });
			return ticket;
		} catch (error) {
			throw new Error(
				"Error al obtener el ticket por email: " + error.message
			);
		}
	};

	//actualizar ticket
	update = async (tid, data) => {
		try {
			const updatedTicket = await ticketModel.findByIdAndUpdate(
				tid,
				data,
				{ new: true }
			);
			return updatedTicket;
		} catch (error) {
			throw new Error("Error al actualizar el ticket: " + error.message);
		}
	};

	//eliminar ticket
	deleteTicket = async (tid) => {
		try {
			const deletedTicket = await ticketModel.findByIdAndDelete(tid);
			return deletedTicket;
		} catch (error) {
			throw new Error("Error al eliminar el ticket: " + error.message);
		}
	};
}
