import Joi from "joi";

const registerUserValidation = Joi.object({
	username: Joi.string().max(100).required(),
	password: Joi.string().max(100).required(),
	name: Joi.string().max(100).required(),
});

const loginUservalidation = Joi.object({
	username: Joi.string().max(100).required(),
	password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidaton = Joi.object({
	username: Joi.string().max(100).required(),
	password: Joi.string().max(100).optional(),
	name: Joi.string().max(100).optional(),
});

export {
	registerUserValidation,
	loginUservalidation,
	getUserValidation,
	updateUserValidaton,
};
