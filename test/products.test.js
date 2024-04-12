import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Products Router", () => {
	it("should return a list of products", async () => {
		const response = await request.get("/products");
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an("array");
	});

	it("should create a new product", async () => {
		const newProduct = { name: "New Product", price: 9.99 };
		const response = await request.post("/products").send(newProduct);
		expect(response.status).to.equal(201);
		expect(response.body).to.include(newProduct);
	});

	it("should update an existing product", async () => {
		const updatedProduct = { name: "Updated Product", price: 12.99 };
		const response = await request.put("/products/1").send(updatedProduct);
		expect(response.status).to.equal(200);
		expect(response.body).to.include(updatedProduct);
	});
});
