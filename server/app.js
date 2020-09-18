// Dependancies
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Config
const { config } = require("./config");
const { isAuth } = require("./utils/isAuth");

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

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

app.listen(config.PORT, () => console.log(`server started on ${config.PORT}`));
