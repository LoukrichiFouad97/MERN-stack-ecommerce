import mongoose from "mongoose";
import uuidv1 from "uuidv1";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "name is required"],
			trim: true,
			maxlength: 32,
		},
		email: {
			type: String,
			required: [true, "email is required"],
			trim: true,
			unique: true,
		},
		hashed_password: {
			type: String,
			required: [true, "password is required"],
		},
		salt: String,
		role: {
			type: Number,
			default: 0,
		},
		about: {
			type: String,
			trim: true,
		},
		history: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

// encrypt password
userSchema
	.virtual("password")
	.set(function (password) {
		this._password = password;
		this.salt = uuidv1();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

userSchema.methods = {
	authenticate: function (password) {
		return this.encryptPassword(password) === this.hashed_password;
	},
	encryptPassword: function (password) {
		if (!password) return "";
		try {
			return crypto
				.createHmac("sha1", this.salt)
				.update(password)
				.digest("hex");
		} catch (error) {
			return "";
		}
	},
};

export const User = mongoose.model("User", userSchema);
