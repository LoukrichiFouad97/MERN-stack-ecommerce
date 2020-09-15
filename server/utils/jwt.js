const jwt = require("jsonwebtoken");
const { config } = require("../config");

const getToken = ({ email, isAdmin }) => {
	return jwt.sign({ email, isAdmin }, config.JWT_SECRET, { expiresIn: "48h" });
};

module.exports = getToken;
