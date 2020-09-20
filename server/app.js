// Dependancies
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compress from "compression";

const app = express();
dotenv.config();

// Config
import { config } from "./config";
import { isAuth } from "./utils/isAuth";

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compress());

// Utils
require("./utils/db")();
require("./utils/routes")(app);

if (config.NODE_ENV === "development") {
	app.use(morgan("dev"));
	console.log("debug started in dev env");
}

if (!config.JWT_SECRET) {
	console.log("JWT secret is missing");
	process.exit(1);
}

app.get("/", isAuth, (req, res) => {
	res.send("Hello in my app");
	console.log("cookies", res.cookies);
});

app.listen(config.PORT, (err) => {
	if (err) {
		console.log(err);
	}
	console.log(`server started on ${config.PORT}`);
});
