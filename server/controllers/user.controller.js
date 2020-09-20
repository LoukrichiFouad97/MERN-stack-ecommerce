import { User } from "../models/user.model";
import { getErrorMessage } from "../helpers/dbErrorHandler";
import { extend } from "lodash";

export const signUp = async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = user.getToken();
		res.cookie("user", token, { expire: 1000 * 60 * 60 * 24 * 3 });
		res.status(200).json({ msg: "Successfully signed up!", user, token });
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

export const updateUser = async (req, res) => {
	try {
		let user = req.profile;
		user = extend(user, req.body);
		await user.save();
		res.json({ msg: "User update succefully", user });
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

export const deleteUser = async (req, res) => {
	try {
		let user = req.profile;
		let deletedUser = await user.remove();
		res.json({ msg: "user deleted succefully", user: deletedUser });
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

export const listUsers = async (req, res) => {
	try {
		const users = await User.find().select("name email createdAt updatedAt");
		res.json(users);
	} catch (err) {
		res.status(400).json({ error: getErrorMessage(err) });
	}
};

export const readUser = async (req, res) => {
	res.send(req.profile);
};

export const userById = async (req, res, next, id) => {
	try {
		const user = await User.findById(id);
		if (!user) return res.status(400).json({ error: "User not found" });
		req.profile = user;
		next();
	} catch (err) {
		res.status(400).json({ error: "Couldn't retrieve user  " });
	}
};
