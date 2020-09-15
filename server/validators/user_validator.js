const { check } = require("express-validator");

exports.userSignUpValidator = [
	check("name").isString().notEmpty().trim(),
	check("email").isEmail().notEmpty().normalizeEmail(),
	check("password").isString().notEmpty().isLength({ min: 4 }),
];
