const jwt = require("jsonwebtoken");
const { config } = require("../config");

const getToken = (_id) => {
	const tokenAge = 3 * 24 * 60 * 60;
	return jwt.sign({ _id }, config.JWT_SECRET, {
		expiresIn: tokenAge,
	});
};

module.exports = getToken;
