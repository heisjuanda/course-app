import {
	configureStore,
	combineReducers,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';

import AuthorReducer from './authors/reducer';
import CourseReducer from './courses/reducer';
import UserReducer from './user/reducer';

export const rootReducer = combineReducers({
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
