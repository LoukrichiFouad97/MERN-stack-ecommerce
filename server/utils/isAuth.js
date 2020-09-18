const jwt = require("jsonwebtoken");
const { config } = require("../config/index");

exports.isAuth = async (req, res, next) => {
	const token = req.cookies.user;
	if (!token)
		return res
			.status(400)
			.json({ msg: "it's a private route you must have a token" });

	try {
		const decodedToken = await jwt.verify(token, config.JWT_SECRET);
		console.log(decodedToken);
		next();
	} catch (error) {
		res.status(400).json({ error });
	}
};
