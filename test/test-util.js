import { prismaClient } from "../src/application/database.js";

const removeTestUser = async () => {
	await prismaClient.user.deleteMany({
		where: {
			username: "user",
		},
	});
};

const createTestUser = async () => {
	await prismaClient.user.create({
		data: {
			username: "user",
			password: "rahasia",
			name: "user test",
			token: "test",
		},
	});
};

const getTestUser = async () => {
	return prismaClient.user.findUnique({
		where: {
			username: "user",
		},
	});
};

export { removeTestUser, createTestUser, getTestUser };
