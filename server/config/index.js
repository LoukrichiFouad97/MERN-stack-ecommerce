require("dotenv").config();

exports.config = {
	PORT: process.env.PORT || 5000,
	MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/ecommerce",
	JWT_SECRET: process.env.JWT_SECRET || "myJwtSecret",
};
