import { User } from "../models/user.model";

export const signIn = async (req, res) => {
	try {
		const user = await User.signIn(req.body.email, req.body.password);
		const { _id, name, email } = user;
		const token = user.getToken();
		res.cookie("user", token, { expire: 1000 * 60 * 60 * 24 * 3 });
		res.json({ _id, name, email, token });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

export const signOut = (req, res) => {
	res.clearCookie("user");
	res.send("user signed out successfully");
};
