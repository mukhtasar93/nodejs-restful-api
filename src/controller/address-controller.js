import { request } from "express";
import addressService from "../service/address-service";

const create = async (req, res, next) => {
	try {
		const user = req.user;
		const request = req.body;
		const contactId = request.params.contactId;

		const result = addressService.create(user, contactId, request);

		res.status(200).json({
			data: result,
		});
	} catch (e) {
		next(e);
	}
};

const get = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = request.params.contactId;
		const addressId = request.params.addressId;
		const result = addressService.get(user, contactId, addressId);

		res.status(200).json({
			data: result,
		});
	} catch (e) {
		next(e);
	}
};

const update = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = request.params.contactId;
		const addressId = request.params.addressId;
		const request = req.body;
		request.id = addressId;

		const result = addressService.update(user, contactId, request);

		res.status(200).json({
			data: result,
		});
	} catch (e) {
		next(e);
	}
};

const remove = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = request.params.contactId;
		const addressId = request.params.addressId;

		const result = addressService.remove(user, contactId, addressId);

		res.status(200).json({
			data: "OK",
		});
	} catch (e) {
		next(e);
	}
};

const list = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = request.params.contactId;

		const result = addressService.remove(user, contactId);

		res.status(200).json({
			data: result,
		});
	} catch (e) {
		next(e);
	}
};

export default {
	create,
	get,
	update,
	remove,
	list,
};
