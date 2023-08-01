import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe("POST /api/users", function () {
	afterEach(async () => {
		await prismaClient.user.deleteMany({
			where: {
				username: "mukhtasar93",
			},
		});
	});

	it("should can register new user", async () => {
		const result = await supertest(web).post("api/users").send({
			username: "mukhtasar93",
			password: "rahasia",
			name: "Mukhtasar",
		});

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe("mukhtasar93");
		expect(result.body.data.name).toBe("Mukhtasar");
		expect(result.body.data.name).toBeUndefined();
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
