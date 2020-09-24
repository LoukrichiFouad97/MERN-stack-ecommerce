import _ from "lodash";

import { Category } from "../models/category.model";
import { getErrorMessage } from "../helpers/dbErrorHandler";

export const create = async (req, res) => {
	const category = new Category(req.body);
	try {
		await category.save();
		res.json({ categories: { category } });
	} catch (err) {
		res.status(400).json({
			msg: "Couldn't create a new category",
			error: getErrorMessage(err),
		});
	}
};

export const read = (req, res) => {
	res.json(req.category);
};

export const update = async (req, res) => {
	let category = req.category;

	try {
		category = _.extend(category, req.body);
		await category.save();
		res.json(category);
	} catch (error) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

export const remove = async (req, res) => {
	try {
		const category = req.category;
		await category.remove();
		res.json({ deletedCategory: category });
	} catch (error) {
		return res.status(400).json({ error: getErrorMessage(err) });
	}
};

export const categoryById = async (req, res, next, id) => {
	try {
		const category = await Category.findById(id);
		if (!category) return res.status("400").json({ msg: "category not found" });
		req.category = category;
		next();
	} catch (error) {
		res.status("400").json({ error: "Could not retrieve category" });
	}
};

export const list = async (req, res) => {
	try {
		const category = await Category.find();
		res.json({ categories: category });
	} catch (error) {
		res.status(400).json({ error: "category not found" });
	}
};
