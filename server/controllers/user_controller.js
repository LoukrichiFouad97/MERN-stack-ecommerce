const { User } = require("../models/user_model");
const getToken = require("../utils/jwt");

// @desc register new user
// @route POST /api/users/signup
exports.signUp = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = new User({ name, email, password });
		await user.save();
		const token = getToken(user._id);

		res.cookie("user", token, { expire: 1000 * 60 * 60 * 24 * 3 });
		// res.header("x-auth-token", token).json({ user, token });
		res.json({ user, token });
	} catch (error) {
		res.status(401).json({ err: error.message });
	}
};

// @desc Log in already registered users
// @route POST /api/users/signin
exports.signIn = async (req, res) => {
	try {
		const user = await User.signIn(req.body.email, req.body.password);
		const { _id, name, email } = user;
		const token = getToken(user._id);

		res.cookie("user", token, { expire: 1000 * 60 * 60 * 24 * 3 });
		// res.header("x-auth-token", token).json({ _id, name, email, token });
		res.json({ _id, name, email, token });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

// @desc Log out user
// @route GET /api/users/signout
exports.signOut = (req, res) => {
	res.clearCookie("user");
	res.send("user signed out successfully");
};

// @desc Update user profile
// @route PUT /api/users/:id
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

// @desc Delete user profile
// @route DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete({ _id: req.params.id });
		if (!user) return res.status(404).json({ msg: "user is not registered" });
		res.json({ msg: "user deleted succefully", user });
	} catch (error) {
		res.status(401).json({ msg: error.message });
	}
};

// @desc Get all user profiles
// @route GET /api/users/
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

// @desc Get user profile by id
// @route GET /api/users/:id
exports.getUserById = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(404).json({ msg: "user is not found" });
		res.json({ user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
