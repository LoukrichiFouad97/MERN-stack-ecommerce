import axios from "axios";

import { userActionTypes } from "./user-action-types";

export const signUp = (user) => async (dispatch) => {
	const { name, email, password } = user;
	try {
		dispatch({ type: userActionTypes.USER_SIGNUP_REQ });
		const user = await axios.post("/api/users/", {
			name,
			email,
			password,
		});
		dispatch({ type: userActionTypes.USER_SIGNUP_SUCCESS, payload: user });
	} catch (error) {
		dispatch({ type: userActionTypes.USER_SIGNUP_FAIL, payload: error });
	}
};

export const signIn = (user) => async (dispatch) => {
	const { email, password } = user;
	try {
		dispatch({ type: userActionTypes.USER_SIGNIN_REQ });
		const user = await axios.post("/api/users/login", { email, password });
		dispatch({ type: userActionTypes.USER_SIGNIN_SUCCESS, payload: user });
	} catch (error) {
		dispatch({ type: userActionTypes.USER_SIGNIN_FAIL, payload: error });
	}
};
