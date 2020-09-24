import formidable from "formidable";
import fs from "fs";
import _ from "lodash";

import { Product } from "../models/product.model";
import { getErrorMessage } from "../helpers/dbErrorHandler";

export const create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, async (err, fields, files) => {
		if (err) return res.status(400).json({ msg: "couldn't upload image" });
		let product = new Product(fields);

		const { name, description, price, category, shipping, quantity } = fields;
		if (
			!name ||
			!description ||
			!price ||
			!category ||
			!shipping ||
			!quantity
		) {
			res.status(400).json({ error: "all fields are required" });
		}

		if (files.image) {
			if (files.image.size > 1000000)
				return res
					.status(400)
					.json({ error: "couldn't upload images more than 1MB in size" });

			console.log("image", files.image);
			product.image.data = fs.readFileSync(files.image.path);
			product.image.contentType = files.image.type;
		}

		try {
			const result = await product.save();
			res.json(result);
		} catch (error) {
			res.status(400).json({
				error: getErrorMessage(error),
			});
		}
	});
};

export const read = async (req, res) => {
	req.product.image = undefined;
	res.json({ product: req.product });
};

export const update = async (req, res) => {
	try {
		let product = req.product;
		product = _.extend(product, req.body);
		await product.save();
		res.json(
			_.pick(product, ["_id", "name", "description", "category", "price"])
		);
	} catch (error) {
		res.status(400).json({ error: "Failed to update product" });
	}
};

export const remove = async (req, res) => {
	try {
		let product = req.product;
		await product.remove();
		res.json({
			DeletedProduct: _.pick(product, [
				"_id",
				"name",
				"description",
				"category",
			]),
		});
	} catch (error) {}
};

export const list = async (req, res) => {
	const orderBy = req.query.orderby ? req.query.orderby : "asc";
	const sortBy = req.query.sortby ? req.query.sortby : "_id";
	const limit = req.query.limit ? +req.query.limit : 6;

	try {
		const product = await Product.find()
			.select("-image")
			.populate("category")
			.sort([[sortBy, orderBy]])
			.limit(limit);
		res.json({ product });
	} catch (error) {
		res.status(400).json({ errors: error.message });
	}
};

export const productById = async (req, res, next, id) => {
	try {
		const product = await Product.findById(id);
		if (!product) return res.status("400").json({ msg: "product not found" });
		req.product = product;
		next();
	} catch (error) {
		res
			.status(404)
			.json({ msg: "couldn't retrieve Product", error: error.message });
	}
};
