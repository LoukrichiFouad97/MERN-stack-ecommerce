import { userActionTypes } from "./user-action-types";

const INITIA_STATE = {
	user: "",
	isLoading: false,
	error: "",
};

export const userReducer = (state = INITIA_STATE, action) => {
	switch (action.type) {
		case userActionTypes.USER_SIGNUP_REQ:
			return {
				...state,
				isLoading: true,
			};
		case userActionTypes.USER_SIGNUP_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
			};
		case userActionTypes.USER_SIGNUP_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case userActionTypes.USER_SIGNIN_REQ:
			return {
				...state,
				isLoading: true,
			};
		case userActionTypes.USER_SIGNIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
			};
		case userActionTypes.USER_SIGNIN_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload
			};

		default:
			return state;
	}
};
