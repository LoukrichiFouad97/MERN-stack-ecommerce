import React, { useReducer, useState } from "react";

import Axios from "axios";

const INITIAL_STATE = {
	name: "",
	email: "",
	password: "",
	cpassword: "",
};

const reducer = (state, { field, payload }) => {
	return {
		...state,
		[field]: payload,
	};
};

export const Register = () => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	const [userInfo, setUserInfo] = useState("");

	const handleChange = (e) => {
		e.preventDefault();
		dispatch({ field: e.target.name, payload: e.target.value });
		console.log(state);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (state.password !== state.cpassword) {
			console.log("please enter the same password");
			return;
		}

		console.log("form submitted");

		const { name, email, password } = state;
		try {
			const user = await Axios.post("/api/users/register", {
				name,
				email,
				password,
			});
			setUserInfo(user);
			console.log(userInfo);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className="container d-flex justify-content-center"
			style={{ marginTop: "150px" }}
		>
			<form className="w-50" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						name="name"
						value={state.name}
						onChange={handleChange}
						type="text"
						className="form-control"
						id="name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						name="email"
						value={state.email}
						onChange={handleChange}
						type="email"
						className="form-control"
						id="email"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						name="password"
						value={state.password}
						onChange={handleChange}
						type="password"
						className="form-control"
						id="password"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="cpassword">Confirm Password</label>
					<input
						name="cpassword"
						value={state.cpassword}
						onChange={handleChange}
						type="password"
						className="form-control"
						id="cpassword"
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};
