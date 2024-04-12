import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Carts Router", () => {
	it("should return a user's cart", async () => {
		const userId = 1;
		const response = await request.get(`/carts/${userId}`);
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an("object");
	});

	it("should add a product to the cart", async () => {
		const userId = 1;
		const productToAdd = { productId: 1, quantity: 2 };
		const response = await request
			.post(`/carts/${userId}/add`)
			.send(productToAdd);
		expect(response.status).to.equal(200);
		expect(response.body).to.include(productToAdd);
	});

	it("should remove a product from the cart", async () => {
		const userId = 1;
		const productToRemove = { productId: 1 };
		const response = await request
			.delete(`/carts/${userId}/remove`)
			.send(productToRemove);
		expect(response.status).to.equal(200);
		expect(response.body).to.not.include(productToRemove);
	});
});
