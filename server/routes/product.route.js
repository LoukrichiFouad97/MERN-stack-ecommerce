import express from "express";

import {
	create,
	list,
	productById,
	read,
	update,
	remove,
} from "../controllers/product.controller";

import { userById } from "../controllers/user.controller";
import {
	requireSignin,
	hasAuthorization,
	isAdmin,
} from "../controllers/auth.controller";

const router = express.Router();

// @desc    list all products and creates a new one
// @route   /api/product/:userId
// @access  Private
router.route("/:userId").get(list).post(requireSignin, create);

// @desc    list all products and creates a new one
// @route   /api/product/:userId/:productId
// @access  Private
router
	.route("/:userId/:productId")
	.get(requireSignin, hasAuthorization, read)
	.put(requireSignin, hasAuthorization, update)
	.delete(requireSignin, hasAuthorization, isAdmin, remove);

// @desc 		gets the product by id and stores it in req.product property.
// @route 	any route that has param of :productId in it.
router.param("productId", productById);
router.param("userId", userById);

export default router;
