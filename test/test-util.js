import { when } from "joi";
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

export const removeAllTestContacts = async () => {
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

export const removeAllTestAddresses = async () => {
	await prismaClient.address.deleteMany({
		where: {
			contact: {
				username: "user",
			},
		},
	});
};

export const createTestAddress = async () => {
	const contact = await getTestContact();
	await prismaClient.address.create({
		data: {
			street: "jalan test",
			city: "kota test",
			province: "provinsi test",
			coutry: "indonesia",
			postal_code: "24356",
		},
	});
};

export const getTestAddress = async () => {
	return prismaClient.address.findFirst({
		where: {
			contact: {
				username: "user",
			},
		},
	});
};
