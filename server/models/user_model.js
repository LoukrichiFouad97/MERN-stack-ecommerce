const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

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

const User = mongoose.model("User", userSchema);

exports.User = User;
