import express from "express";

import {
	create,
	list,
	categoryById,
	read,
	update,
	remove,
} from "../controllers/category.controller";
import { userById } from "../controllers/user.controller";
import {
	requireSignin,
	hasAuthorization,
	isAdmin,
} from "../controllers/auth.controller";

const router = express.Router();

// @desc    Lists all categories and create a new one
// @route   /api/category/:userId
// @access  Private
router
	.route("/:userId")
	.get(requireSignin, hasAuthorization, list)
	.post(requireSignin, hasAuthorization, isAdmin, create);

// @desc    Read, update and delete category
// @route   /api/category/:userId/:categoryId
// @access  Private
router
	.route("/:userId/:categoryId")
	.get(requireSignin, hasAuthorization, read)
	.put(requireSignin, hasAuthorization, update)
	.delete(requireSignin, hasAuthorization, isAdmin, remove);

// @desc 		gets the user by id and stores it in req.profile property.
// @route 	any route that has param of :userId in it.
router.param("userId", userById);
router.param("categoryId", categoryById);

export default router;
