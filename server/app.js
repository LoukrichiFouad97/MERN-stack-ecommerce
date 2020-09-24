// Dependancies
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compress from "compression";

import { config } from "./config";
const app = express();
dotenv.config();

// Utils
require("./utils/db")();
require("./utils/routes")(app);

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compress());

app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(401).json({ error: err.name + ": " + err.message });
	} else if (err) {
		res.status(400).json({ error: err.name + ": " + err.message });
		console.log(err);
	}
});

if (config.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

if (!config.JWT_SECRET) {
	console.log("JWT secret is missing");
	process.exit(1);
}

app.get("/", (req, res) => {
	res.send("Hello from protected route");
});

const port = config.PORT;
app.listen(port, (err) => {
	if (err) {
		console.log(err);
	}
	console.log(`server started on ${port}`);
});
