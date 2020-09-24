import express from "express";
import user from "../routes/user.route";
import auth from "../routes/auth.route";
import category from "../routes/category.route";
import product from "../routes/product.route";

module.exports = (app) => {
	app.use(express.json());
	app.use("/api/users", user);
	app.use("/api/auth", auth);
	app.use("/api/category", category);
	app.use("/api/product", product);
};
