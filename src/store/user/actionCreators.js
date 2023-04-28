import * as actionTypes from './actionTypes';

export const loginSuccess = (user) => {
	return { type: actionTypes.LOGIN_SUCCESS, user };
};

export const logoutSuccess = () => {
	return { type: actionTypes.LOGOUT_SUCCESS };
};
