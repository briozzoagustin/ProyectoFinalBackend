import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	availability: { type: Number, required: true },
	productImage: { type: String },
	owner: { type: String, default: "admin" },
});
productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel;
