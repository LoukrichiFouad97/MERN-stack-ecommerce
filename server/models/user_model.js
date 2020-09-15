const mongoose = require("mongoose");

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

const User = mongoose.model("User", userSchema);

exports.User = User;
