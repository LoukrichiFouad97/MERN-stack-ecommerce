import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import _ from "lodash";

import { User } from "../models/user.model";
import { config } from "../config";

export const signin = async (req, res) => {
	try {
		// find user
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(401).json({ error: "User not found" });

		// check password
		if (!user.authenticate(req.body.password))
			return res.status(401).json({ error: "password wrong" });

		// generate a token
		const token = await jwt.sign({ _id: user._id }, config.JWT_SECRET);
		// set token in cookie
		res.cookie("t", token, { expire: new Date() + 9999 });
		// send user and token to user
		res.json({ token, user: _.pick(user, ["name", "_id", "email", "role"]) });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};

export const signout = (req, res) => {
	res.clearCookie("t");
	res.json({ msg: "Signed out successfully!" });
};

// export const requireSignin = expressJwt({
// 	secret: config.JWT_SECRET,
// 	userProperty: "auth",
// 	algorithms: ["HS256"],
// });

// export const hasAuthorization = (req, res, next) => {
// 	const authorized =
// 		req.profile && req.auth && req.profile._id === req.auth._id;
// 	if (!authorized) {
// 		return res.status(403).json({ error: "User is not authorized" });
// 	}
// 	next();
// };

export const requireSignin = async (req, res, next) => {
	try {
		const token = req.header("Authorization");
		if (!token)
			return res.status(403).json({ error: "Authorization token is missing" });
		const decoded = jwt.verify(token.split(" ")[1], config.JWT_SECRET);
		const user = await User.findOne({ _id: decoded._id });
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};

export const hasAuthorization = (req, res, next) => {
	const authorized =
		req.profile && req.user && String(req.profile._id) === String(req.user._id);
	if (!authorized) {
		return res.status(403).json({ error: "User is not authorized" });
	}
	next();
};

export const isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		res.status(403).json({ error: "Access denied! Admin resource" });
	}
	next();
};
