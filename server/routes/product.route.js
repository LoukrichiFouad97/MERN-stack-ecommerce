import express from "express";

import {
	create,
	list,
	listRelated,
	listProductCategories,
	listBySearch,
	productById,
	read,
	update,
	remove,
	image,
} from "../controllers/product.controller";

import { userById } from "../controllers/user.controller";
import {
	requireSignin,
	hasAuthorization,
	isAdmin,
} from "../controllers/auth.controller";

const router = express.Router();

// @desc    Lists all available products
// @route   /api/product/:userId
// @access  Public
router.get("/", list);

// @desc    Creates a new product
// @route   /api/product/:userId
// @access  Private
router.post("/:userId", requireSignin, create);

// @desc    Lists all available products
// @route   /api/product/:userId
// @access  Public
router.get("/:productId/image", image);

// @desc    Get all related products based on category
// @route   /api/product/related/productId
// @access  Public
router.get("/related/:productId", listRelated);

// @desc    Get all categories of products
// @route   /api/product/categories
// @access  Public
router.get("/categories", listProductCategories);

// @desc    Get all categories of products
// @route   /api/product/categories
// @access  Public
router.post("/by/search", listBySearch);

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
