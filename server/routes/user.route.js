import express from "express";
import {
	requireSignin,
	hasAuthorization,
} from "../controllers/auth.controller";

import {
	create,
	update,
	read,
	remove,
	list,
	userById,
} from "../controllers/user.controller";

const router = express.Router();

// @desc 		list all users and creates a new user
// @route 	/api/users
// @access	Public
router.route("/").get(list).post(create);

// @desc 		access, update and delete users
// @route 	/api/users/:userId
// @access	Private
router
	.route("/:userId")
	.get(requireSignin, read)
	.put(requireSignin, hasAuthorization, update)
	.delete(requireSignin, hasAuthorization, remove);

// @desc 		gets the user by id and stores it in req.profile property.
// @route 	any route that has param of :userId in it.
router.param("userId", userById);

export default router;
