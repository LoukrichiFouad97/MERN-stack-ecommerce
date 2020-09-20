import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, maxlength: 32 },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: Number, default: 0 },
		salt: String,
		about: String,
		history: { type: Array, default: [] },
	},
	{ timestamps: true }
);

// encrypt password before save it into database
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// generate a json web token
userSchema.methods.getToken = function () {
	return jwt.sign({ id: this._id }, config.JWT_SECRET, {
		expiresIn: config.JWT_EXPIRE,
	});
};

// check if user has an account 
userSchema.statics.signIn = async function (email, password) {
	try {
		const user = await this.findOne({ email });
		if (!user) throw Error("User is not registered");

		const validatePassword = await bcrypt.compare(password, user.password);
		if (!validatePassword) throw Error("Wrong password");

		return user;
	} catch (error) {
		throw Error(error);
	}
};

export const User = mongoose.model("User", userSchema);
