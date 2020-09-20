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
		throw new Error(`unable to connect to database ${config.MONGODB_URL}`);
	}
};
