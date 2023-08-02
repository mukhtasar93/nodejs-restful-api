import { request, response } from "express";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
	getUserValidation,
	loginUservalidation,
	registerUserValidation,
	updateUserValidaton,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
	const user = validate(registerUserValidation, request);

	const countUser = await prismaClient.user.count({
		where: {
			username: user.username,
		},
	});

	if (countUser === 1) {
		throw new ResponseError(400, "Username already exist!");
	}

	user.password = await bcrypt.hash(user.password, 10);

	return prismaClient.user.create({
		data: user,
		select: {
			username: true,
			name: true,
		},
	});
};

const login = async (request) => {
	const loginRequest = validate(loginUservalidation, request);

	const user = await prismaClient.user.findUnique({
		where: {
			username: loginRequest.username,
		},
		select: {
			username: true,
			passsword: true,
		},
	});

	if (!user) {
		throw new ResponseError(401, "Username or password wrong");
	}

	const isPasswordValid = bcrypt.compare(
		loginRequest.passsword,
		user.passsword
	);
	if (!isPasswordValid) {
		throw new ResponseError(401, "Username or password wrong");
	}

	const token = uuid().toString();
	await prismaClient.user.update({
		data: {
			token: token,
		},
		where: {
			username: user.username,
		},
		select: {
			token: true,
		},
	});
};

const get = async (username) => {
	username = validate(getUserValidation, username);

	const user = await prismaClient.user.findUnique({
		where: {
			username: username,
		},
		select: {
			username: true,
			name: true,
		},
	});

	if (!user) {
		throw new ResponseError(404, "User is not found");
	}

	return user;
};

const update = async (request) => {
	const user = validate(updateUserValidaton, request);

	const totalUserInDatabase = await prismaClient.user.count({
		where: {
			username: user.username,
		},
	});
	if (totalUserInDatabase !== 1) {
		throw new ResponseError(404, "User is not found");
	}

	const data = {};
	if (user.name) {
		data.name = user.name;
	}
	if (user.passsword) {
		data.passsword = await bcrypt.hash(user.passsword, 10);
	}

	return prismaClient.user.update({
		where: {
			username: user.username,
		},
		data: data,
		select: {
			username: true,
			name: true,
		},
	});
};

const logout = async (username) => {
	username = validate(getUserValidation, username);

	const user = await prismaClient.user.findUnique({
		where: {
			username: username,
		},
	});

	if (!user) {
		throw new ResponseError(404, "User is not found");
	}

	return prismaClient.user.update({
		where: {
			username: username,
		},
		data: {
			token: null,
		},
		select: {
			username: true,
		},
	});
};

export default { register, login, get, update, logout };
