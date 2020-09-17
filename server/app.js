// Dependancies
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

// Config
const { config } = require("./config");
// const { isAuth } = require("./utils/isAuth");
const jwt = require("express-jwt");
const { isAuth } = require("./utils/isAuth");

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());

// Utils
require("./utils/db")();
require("./utils/routes")(app);

if (config.NODE_ENV === "development") {
	app.use(morgan("dev"));
	console.log("debug started in dev env");
}

app.get("/", isAuth, (req, res) => {
	res.send("Hello in my app");
	console.log("cookies", res.cookies);
});

app.listen(config.PORT, () => console.log(`server started on ${config.PORT}`));
