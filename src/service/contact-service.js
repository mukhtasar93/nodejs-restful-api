import { request } from "express";
import {
	createContactValidation,
	getContactValidation,
} from "../validation/contact-validation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "uuid";
import { ResponseError } from "../error/response-error.js";
const create = async (user, request) => {
	const contact = validate(createContactValidation, request);
	contact.username = user.username;

	return prismaClient.contact.create({
		data: contact,
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			phone: true,
		},
	});
};

const get = async (user, contacdId) => {
	contacdId = validate(getContactValidation, contacdId);

	const contact = await prismaClient.contact.findFirst({
		where: {
			username: user.username,
			id: contacdId,
		},
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			phone: true,
		},
	});

	if (!contact) {
		throw new ResponseError(404, "contact is not found");
	}
};

export default {
	create,
	get,
};
