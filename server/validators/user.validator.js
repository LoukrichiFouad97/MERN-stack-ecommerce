import { body } from "express-validator";

export const signUpValidator = [
	body("name", "name is required").notEmpty(),
	body("email", "email must be between 3 and 32")
		.notEmpty()
		.matches(/.+\@.+\..+/)
		.withMessage("email must contain @")
		.isLength({ min: 3, max: 32 }),
	body("password")
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 digits")
		.matches(/\d/)
		.withMessage("password must contain a number"),
];
