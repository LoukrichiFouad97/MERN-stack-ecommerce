import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Navbar } from "./components/navbar";

function App() {
	return (
		<div className="App">
			<div className="container">
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
