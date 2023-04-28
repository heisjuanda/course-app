import {
	configureStore,
	combineReducers,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';

import AuthorReducer from './authors/reducer';
import CourseReducer from './courses/reducer';
import UserReducer from './user/reducer';

const middleware = [thunk, createLogger(), immutableStateInvariantMiddleware()];

const rootReducer = combineReducers({
	user: UserReducer,
	courses: CourseReducer,
	authors: AuthorReducer,
});

const loggerMiddleware = createLogger();

const store = configureStore({
	reducer: rootReducer,
	middleware: [
		...getDefaultMiddleware(),
		immutableStateInvariantMiddleware(),
		loggerMiddleware,
	],
});

export default store;

export async function getCourses() {
	const response = await fetch('http://localhost:4000/courses/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	return result.result;
}

export async function getAuthors() {
	const response = await fetch('http://localhost:4000/authors/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	return result.result;
}
