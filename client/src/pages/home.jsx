import React from "react";
import Axios from "axios";

export const Home = async () => {
	try {
		const server = await Axios.get("http://localhost:5000");
		console.log(server);
	} catch (error) {
		console.log(error);
	}
	return (
		<div>
			<h1>home</h1>
		</div>
	);
};
