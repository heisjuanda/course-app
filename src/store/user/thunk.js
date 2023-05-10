//store
import * as actionCreator from './actionCreators';
import store from '../services';
import * as authorCreator from '../authors/actionCreators';
import * as courseCreator from '../courses/actionCreators';

import { getToken } from '../../LocalStorage/localStorage';

export const logOut = async () => {
	const response = await fetch('http://localhost:4000/logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${getToken()}`,
		},
	});
	store.dispatch(actionCreator.logoutSuccess());
	store.dispatch(authorCreator.deleteAll());
	store.dispatch(courseCreator.deleteAll());
	return response;
};

export const getUser = async (Authorization) => {
	const response = await fetch('http://localhost:4000/users/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${Authorization}`,
		},
	});
	const result = await response.json();
	if (result.successful) {
		return result;
	}
};

export const logIn = async (user) => {
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	return result;
};

export const register = async (newUser) => {
	const response = await fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	return result;
};
