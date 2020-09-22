import dotenv from "dotenv";
dotenv.config();

export const config = {
	PORT: process.env.PORT || 5000,
	MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/ecommerce",
	NODE_ENV: process.env.NODE_ENV || "development",
	JWT_SECRET: process.env.JWT_SECRET || "myJwtSecret",
	JWT_EXPIRE: process.env.JWT_EXPIRE || "30d",
};
