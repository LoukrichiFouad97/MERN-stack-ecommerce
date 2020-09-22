import express from "express";

import { create, list } from "../controllers/category.controller";
import { userById } from "../controllers/user.controller";
import {
	requireSignin,
	hasAuthorization,
	isAdmin,
} from "../controllers/auth.controller";

const router = express.Router();

// @desc    Lists all categories and create a new one
// @route   /api/category
// @access  protected
router
	.route("/:userId")
	.get(requireSignin, hasAuthorization, list)
	.post(requireSignin, hasAuthorization, isAdmin, create);

// @desc 		gets the user by id and stores it in req.profile property.
// @route 	any route that has param of :userId in it.
router.param("userId", userById);

export default router;
