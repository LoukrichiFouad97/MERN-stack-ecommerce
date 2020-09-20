const express = require("express");
const user = require("../routes/auth");

module.exports = (app) => {
	app.use(express.json());
	app.use("/api/users", user);
};
