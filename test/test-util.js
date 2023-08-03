import { prismaClient } from "../src/application/database.js";

export const removeTestUser = async () => {
	await prismaClient.user.deleteMany({
		where: {
			username: "user",
		},
	});
};

export const createTestUser = async () => {
	await prismaClient.user.create({
		data: {
			username: "user",
			password: "rahasia",
			name: "user test",
			token: "test",
		},
	});
};

export const getTestUser = async () => {
	return prismaClient.user.findUnique({
		where: {
			username: "user",
		},
	});
};

export const removeAllTestContact = async () => {
	await prismaClient.contact.deleteMany({
		where: {
			username: "user",
		},
	});
};

export const createTestContact = async () => {
	await prismaClient.contact.create({
		data: {
			username: "user",
			first_name: "test",
			last_name: "test",
			email: "test@gmail.com",
			phone: "0811223344",
		},
	});
};

export const createManyTestContacts = async () => {
	for (let i = 0; i < 15; i++) {
		await prismaClient.contact.create({
			data: {
				username: "user",
				first_name: `test ${i}`,
				last_name: `test ${i}`,
				email: `test${i}@gmail.com`,
				phone: `0811223344${i}`,
			},
		});
	}
};

export const getTestContact = async () => {
	return prismaClient.contact.findFirst({
		where: {
			username: "user",
		},
	});
};
