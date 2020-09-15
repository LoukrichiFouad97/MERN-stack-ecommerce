const { User } = require("../models/user_model");
const getToken = require("../utils/jwt");
const _ = require("lodash");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(401).json({ msg: "User is already registered" });

	const { name, email, password } = req.body;
	try {
		user = new User({ name, email, password });

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);

		await user.save();
		res.json({ user });
	} catch (error) {
		res.status(401).json({ err: error.message });
	}
};

exports.signIn = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(401).json({ msg: "User is not registered" });

		const { _id, name, email } = user;
		res.send({ _id, name, email, token: getToken(user) });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true }
		);
		if (!user) return res.status(404).json({ msg: "user not found" });
		res.json({ msg: "User update succefully", user });
	} catch (error) {
		res.status(401).json({ msg: "Couldn't update user" });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete({ _id: req.params.id });
		if (!user) return res.status(404).json({ msg: "user is not registered" });
		res.json({ msg: "user deleted succefully", user });
	} catch (error) {
		res.status(401).json({ msg: error.message });
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

exports.getSingalUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(404).json({ msg: "user is not found" });
		res.json({ user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
