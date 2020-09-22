import { Category } from "../models/category.model";
import { getErrorMessage } from "../helpers/dbErrorHandler";

export const create = async (req, res) => {
	const category = new Category(req.body);
	try {
		await category.save();
		res.json({ categories: { category } });
	} catch (err) {
		res
			.status(400)
			.json({
				msg: "Couldn't create a new category",
				error: getErrorMessage(err),
			});
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
