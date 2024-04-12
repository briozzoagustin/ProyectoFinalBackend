import productsModel from "../models/product.model.js";

export default class ProductDao {
	constructor() {
		console.log(`Working users with Database persistence in mongodb`);
	}

	//crear un producto
	create = async (product) => {
		try {
			const newProduct = await productsModel.create(product);
			return newProduct;
		} catch (error) {
			throw new Error("Error al crear el producto: " + error.message);
		}
	};

	//obtener todos los productos
	getAll = async () => {
		try {
			let products = await productsModel.find({}).lean();
			return products;
		} catch (error) {
			throw new Error(
				"Error al obtener todos los productos: " + error.message
			);
		}
	};

	//obtener paginacion
	getPagination = async (page, perPage) => {
		try {
			const totalProducts = await productsModel.countDocuments();
			const totalPages = Math.ceil(totalProducts / perPage);

			const products = await productsModel
				.find()
				.lean()
				.skip((page - 1) * perPage)
				.limit(perPage)
				.exec();

			return { products, totalPages };
		} catch (error) {
			throw new Error(
				`Error al obtener todos los productos: ${error.message}`
			);
		}
	};

	//obtener producto por id
	getById = async (pid) => {
		try {
			let productId = await productsModel.findById(pid);
			return productId;
		} catch (error) {
			throw new Error("Error al obtener el producto: " + error.message);
		}
	};

	//actualizar un producto
	update = async (pid, product) => {
		try {
			const updatedProduct = await productsModel.findByIdAndUpdate(
				pid,
				product,
				{ new: true }
			);
			return updatedProduct;
		} catch (error) {
			throw new Error(
				"Error al actualizzar el producto: " + error.message
			);
		}
	};

	//subir foto del producto
	upImage = async (pid, imagePath) => {
		try {
			const product = await productsModel.findById(pid);
			if (!product) {
				throw new Error("Producto no encontrado");
			}
			product.productImage = imagePath;
			await product.save();

			return {
				message:
					"Ruta de la imagen actualizada correctamente en la base de datos",
			};
		} catch (error) {
			throw new Error("Error al subir imagen: " + error.message);
		}
	};

	//eliminar producto
	delete = async (pid) => {
		try {
			const deletedProduct = await productsModel.findByIdAndDelete(pid);
			return deletedProduct;
		} catch (error) {
			throw new Error("Error al eliminar el prodcuto: " + error.message);
		}
	};
}
