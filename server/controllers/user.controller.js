import _, { extend } from "lodash";

import { User } from "../models/user.model";
import { getErrorMessage } from "../helpers/dbErrorHandler";

export const create = async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.json(_.pick(user, ["_id", "name", "email", "role"]));
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

export const read = async (req, res) => {
	res.json({ user: _.pick(req.body, ["_id", "name", "email", "role"]) });
};

export const update = async (req, res) => {
	try {
		let user = req.profile;
		user = extend(user, req.body);
		await user.save();
		res.json({ user: _.pick(req.body, ["_id", "name", "email", "role"]) });
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

export const remove = async (req, res) => {
	try {
		let user = req.profile;
		await user.remove();
		res.json({
			deletedUser: _.pick(req.body, ["_id", "name", "email", "role"]),
		});
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

export const userById = async (req, res, next, id) => {
	try {
		const user = await User.findById(id);
		if (!user) return res.status("400").json({ msg: "User not found" });
		req.profile = user;
		next();
	} catch (error) {
		res.status("400").json({ error: "Could not retrieve user" });
	}
};

export const list = async (req, res) => {
	try {
		const user = await User.find().select("_id name email role ");
		res.json({ user });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};
