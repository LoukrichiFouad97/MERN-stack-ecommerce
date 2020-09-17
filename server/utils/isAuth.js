const jwt = require("jsonwebtoken");
const { config } = require("../config/index");

// exports.isAuth = expressJwt({
// 	secret: config.JWT_SECRET,
// 	userProperty: "auth",
// 	algorithms: ["SH256"],
// });

exports.isAuth = async (req, res, next) => {
	try {
		const token = res.cookies.user;
		const validateToken = await jwt.verify(token, config.JWT_SECRET);
	} catch (error) {
		res.status(400).json({ error });
	}
};
