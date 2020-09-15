const mongoose = require("mongoose");
const { config } = require("../config");

module.exports = () => {
	try {
		mongoose.connect(config.MONGODB_URL, {
			useCreateIndex: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log("db connected");
	} catch (error) {
		console.log(error);
	}
};
