const express = require("express");
const user = require("../routes/user_route");

module.exports = (app) => {
	app.use(express.json());
	app.use("/api/users", user);
};
