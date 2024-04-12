import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Sessions Router", () => {
	it("should create a new session for a user", async () => {
		const userCredentials = {
			username: "user123",
			password: "password123",
		};
		const response = await request.post("/sessions").send(userCredentials);
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an("object");
		expect(response.body).to.have.property("token");
	});

	it("should return an error for invalid credentials", async () => {
		const invalidCredentials = {
			username: "user123",
			password: "wrongpassword",
		};
		const response = await request
			.post("/sessions")
			.send(invalidCredentials);
		expect(response.status).to.equal(401);
	});

	it("should get user information after authentication", async () => {
		const token = "valid_token"; // Use a valid token obtained from a successful session
		const response = await request
			.get("/sessions/user")
			.set("Authorization", `Bearer ${token}`);
		expect(response.status).to.equal(200);
		expect(response.body).to.be.an("object");
		expect(response.body).to.have.property("username");
	});
});
