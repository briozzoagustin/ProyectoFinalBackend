import cartModel from "../models/cart.model.js";

export default class CartDao {
	constructor() {
		console.log(`Working with Database persistence in mongodb`);
	}

	//crear carrito
	create = async (data) => {
		try {
			const newCart = await cartModel.create(data);
			return newCart;
		} catch (error) {
			throw new Error("Error al crear el carrito: " + error.message);
		}
	};

	//obtener carrito por id
	getById = async (cid) => {
		try {
			let result = await cartModel.findById({ _id: cid });
			return result;
		} catch (error) {
			throw new Error("Error al obtener el carrito: " + error.message);
		}
	};

	//agregar producto al carrito
	addProduct = async (cid, pid) => {
		try {
			const cart = await cartModel.findOne({ _id: cid });
			const productExists = cart.products.some(
				(p) => String(p.product) === pid
			);

			if (!productExists) {
				const newProduct = { product: pid, quantity: 1 };
				cart.products.push(newProduct);
				const updatedCart = await cart.save();

				if (!updatedCart) {
					return null;
				}
				return updatedCart;
			}
		} catch (error) {
			throw new Error(
				"Error al agregar el producto al carrito: " + error.message
			);
		}
	};

	//controlar si un producto ya existe en el carrito
	isThere = async (cartId, productId) => {
		try {
			const cart = await cartModel.findOne({ _id: cartId });
			if (cart) {
				const productInCart = cart.products.some(
					({ product }) => String(product._id) === productId
				);
				if (productInCart) {
					return productInCart;
				} else {
					return null;
				}
			} else {
				return null;
			}
		} catch (error) {
			throw new Error(
				"Error al buscar el producto en el carrito: " + error.message
			);
		}
	};

	//incrementar la cantidad si el producto esta en el carrito
	incrementQuantity = async (cid, pid) => {
		try {
			const cart = await cartModel.findOne({ _id: cid });
			const productIndex = cart.products.findIndex(
				(p) => String(p.product._id) === pid
			);
			if (productIndex !== -1) {
				cart.products[productIndex].quantity += 1;
				const updatedCart = await cart.save();

				if (!updatedCart) {
					return null;
				}
				return updatedCart;
			} else {
				return null;
			}
		} catch (error) {
			throw new Error(
				"Error al agregar el producto al carrito: " + error.message
			);
		}
	};

	//eliminar producto del carrito
	removeOneProduct = async (cid, pid) => {
		try {
			const cart = await cartModel.findOne({ _id: cid });
			const updatedProducts = cart.products.filter(
				(p) => String(p.product._id) !== pid
			);
			cart.products = updatedProducts;
			const updatedCart = await cart.save();
			if (!updatedCart) {
				return null;
			}
			return updatedCart;
		} catch (error) {
			throw new Error(
				"Error al agregar producto al carrito: " + error.message
			);
		}
	};

	//vaciar carrito
	removeAllProducts = async (cid) => {
		try {
			const cart = await cartModel.findById(cid);
			if (!cart) {
				throw new Error("Cart not found");
			}
			cart.products = [];
			await cart.save();

			return cart;
		} catch (error) {
			throw new Error(
				"Error al eliminar todos los productos del carrito: " +
					error.message
			);
		}
	};

	//incrementar la cantidad del producto en el carrito
	increase = async (cid, pid) => {
		try {
			const cart = await cartModel.findOne({ _id: cid });
			if (!cart) {
				throw new Error("Carrito no encontrado");
			}

			const productIndex = cart.products.findIndex(
				(p) => String(p.product._id) === pid
			);
			if (productIndex !== -1) {
				cart.products[productIndex].quantity += 1;

				const updatedCart = await cart.save();
				return updatedCart;
			} else {
				throw new Error("Producto no encontrado en el carrito");
			}
		} catch (error) {
			throw new Error(
				`Error al aumentar la cantidad del producto: ${error.message}`
			);
		}
	};

	//decrementar la cantidad del producto en el carrito
	decrease = async (cid, pid) => {
		try {
			const cart = await cartModel.findOne({ _id: cid });
			if (!cart) {
				throw new Error("Carrito no encontrado");
			}

			const productIndex = cart.products.findIndex(
				(p) => String(p.product._id) === pid
			);
			if (productIndex !== -1) {
				if (cart.products[productIndex].quantity > 1) {
					cart.products[productIndex].quantity -= 1;
				} else {
					cart.products.splice(productIndex, 1); // Si la cantidad es 1, elimina el producto del carrito
				}

				const updatedCart = await cart.save();
				return updatedCart;
			} else {
				throw new Error("Producto no encontrado en el carrito");
			}
		} catch (error) {
			throw new Error(
				`Error al disminuir la cantidad del producto: ${error.message}`
			);
		}
	};

	//eliminar el carrito
	delete = async (cid) => {
		try {
			const deletedCart = await cartModel.findByIdAndDelete(cid);
			return deletedCart;
		} catch (error) {
			throw new Error("Error al eliminar el carrito: " + error.message);
		}
	};
}
