// Dependancies
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Config
const { config } = require("./config");

// Utils
require("./utils/db")();
require("./utils/routes")(app);

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	console.log("res");
});

app.listen(config.PORT, () => console.log(`server started on ${config.PORT}`));
