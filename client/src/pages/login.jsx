import React, { useState } from "react";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
	};

	return (
		<div
			className="container d-flex justify-content-center"
			style={{ marginTop: "150px" }}
		>
			<form className="w-50 " onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						name="email"
						value={email}
						className="form-control"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						className="form-control"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}
