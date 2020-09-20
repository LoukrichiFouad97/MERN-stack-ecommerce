import express from "express";
import { userSignUpValidator, validate } from "../validators/user_validator";

const {
	signUp,
	listUsers,
	updateUser,
	readUser,
	deleteUser,
	userById,
} = require("../controllers/user.controller");

const router = express.Router();

// @desc list all users and creates a new user
// @route /api/users
// @access public
router.route("/").get(listUsers).post(userSignUpValidator(), validate, signUp);

// @desc access, update and delete users
// @route /api/users/:userId
// @access protected
router.route("/:userId").get(readUser).put(updateUser).delete(deleteUser);

// @desc get user by id 
// @route any route that has param of :userId
router.param("userId", userById);

export default router;
