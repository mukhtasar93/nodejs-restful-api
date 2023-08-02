import supertest from "supertest";
import { web } from "../src/application/web.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import { logger } from "../src/application/logging.js";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {
	afterEach(async () => {
		await removeTestUser();
	});

	it("should can register new user", async () => {
		const result = await supertest(web).post("api/users").send({
			username: "user",
			password: "rahasia",
			name: "user test",
		});
		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("user");
		expect(result.body.data.name).toBe("user test");
		expect(result.body.data.password).toBeUndefined();
	});

	it("should reject if request invalid", async () => {
		const result = await supertest(web).post("api/users").send({
			username: "",
			password: "",
			name: "",
		});
		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});
});

describe("POST /api/users/login", function () {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		await removeTestUser();
	});

	it("should can login", async () => {
		const result = await supertest(web)
			.post("/api/users/login")
			.send({
				username: "user",
				password: await bcrypt.hash("rahasia", 10),
			});

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.token).toBeDefined();
		expect(result.body.data.token).not.toBe("test");
	});

	it("should reject login if request is invalid", async () => {
		const result = await supertest(web).post("/api/users/login").send({
			username: "",
			password: "",
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it("should reject login if passsword is wrong", async () => {
		const result = await supertest(web).post("/api/users/login").send({
			username: "user",
			password: "salah",
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});

	it("should reject login if username is wrong", async () => {
		const result = await supertest(web).post("/api/users/login").send({
			username: "salah",
			password: "salah",
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

describe("GET /api/users/current", function () {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		await removeTestUser();
	});

	it("should can get current user", async () => {
		const result = await supertest(web)
			.get("/api/users/current")
			.set("Authorization", "test");

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("user");
		expect(result.body.data.name).toBe("user test");
	});

	it("should reject if token is invalid", async () => {
		const result = await supertest(web)
			.get("/api/users/current")
			.set("Authorization", "salah");

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

describe("PATCH /api/user/current", function () {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		await removeTestUser();
	});

	it("should can update user", async () => {
		const result = await supertest(web)
			.patch("/api/user/current")
			.set("Authorization", "test")
			.send({
				name: "Mukhtasar",
				password: "rahasia",
			});

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("user");
		expect(result.body.data.name).toBe("Mukhtasar");

		const user = await getTestUser();
		expect(await bcrypt.compare("rahasialagi", user.passsword)).toBe(true);
	});

	it("should can update name", async () => {
		const result = await supertest(web)
			.patch("/api/user/current")
			.set("Authorization", "test")
			.send({
				name: "Mukhtasar",
			});

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("user");
		expect(result.body.data.name).toBe("Mukhtasar");
	});

	it("should can update user password", async () => {
		const result = await supertest(web)
			.patch("/api/user/current")
			.set("Authorization", "test")
			.send({
				password: "rahasialagi",
			});

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("user");
		expect(result.body.data.name).toBe("user test");

		const user = await getTestUser();
		expect(await bcrypt.compare("rahasialagi", user.passsword)).toBe(true);
	});

	it("should reject if request is not valid", async () => {
		const result = await supertest(web)
			.patch("/api/user/current")
			.set("Authorization", "salah")
			.send({});

		expect(result.status).toBe(401);
	});
});

describe("DELETE /api/users/logout", function () {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		await removeTestUser();
	});

	it("should can logout", async () => {
		const result = await supertest(web)
			.delete("/api/users/logout")
			.set("Authorization", "test");

		expect(result.status).toBe(200);
		expect(result.body.data).toBe("OK");

		const user = await getTestUser();
		expect(user.token).toBeNull();
	});

	it("should reject logout if token is invalid", async () => {
		const result = await supertest(web)
			.delete("/api/users/logout")
			.set("Authorization", "salah");

		expect(result.status).toBe(401);
	});
});
