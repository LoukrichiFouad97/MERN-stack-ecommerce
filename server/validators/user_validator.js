const { body, validationResult } = require("express-validator");
const { User } = require("../models/user.model");

const userSignUpValidator = () => {
	return [
		body("name", "name is required")
			.isString()
			.trim()
			.notEmpty()
			.withMessage("name is required "),
		body("email")
			.isEmail()
			.custom(async (value) => {
				const user = await User.findOne({ email: value });
				if (user) {
					return Promise.reject("email is already in use");
				}
			})
			.normalizeEmail()
			.notEmpty()
			.withMessage("emai is required"),
		body("password")
			.isLength({ min: 4 })
			.withMessage("password must be at least 4")
			.matches(/\d/)
			.withMessage("password must contain at least 1 digit")
			.notEmpty()
			.withMessage("password is required"),
	];
};

const userSignInValidator = () => {
	return [
		body("email")
			.isEmail()
			.normalizeEmail()
			.notEmpty()
			.withMessage("emai is required"),
		body("password")
			.isLength({ min: 4 })
			.withMessage("password must be at least 4")
			.matches(/\d/)
			.withMessage("password must contain at least 1 digit")
			.notEmpty()
			.withMessage("password is required"),
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) return next();

	const extractedErrors = [];
	errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

	res.status(422).json({ errors: extractedErrors });
};

module.exports = {
	userSignUpValidator,
	userSignInValidator,
	validate,
};
