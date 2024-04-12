import { Router } from "express";
import { __filename, __dirname } from "../utils.js";
import { generateProductMocks } from "../utils.js";

const router = Router();

router.get("/", (req, res) => {
	const products = [];
	for (let i = 0; i < 100; i++) {
		products.push(generateProductMocks());
	}

	res.render("mocking", { products });
});

export default router;
