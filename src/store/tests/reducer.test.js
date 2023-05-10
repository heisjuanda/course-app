//store
import { rootReducer } from '../services';
import { configureStore } from '@reduxjs/toolkit';

//course creator
import * as courseCreator from '../courses/actionCreators';

//thunks
import { saveCourse, getCourses } from '../courses/actionCreators';

describe('user reducer', () => {
	let store;
	beforeEach(() => {
		store = configureStore({
			reducer: rootReducer,
		});
	});

	it('should return the initial state', () => {
		const initialState = {
			user: { isAuth: false, name: '', email: '', token: '', role: '' },
			courses: [],
			authors: [],
		};
		const prevState = store.getState();
		expect(initialState).toEqual(prevState);
	});

	it('should handle SAVE_COURSE and returns new state', async () => {
		const course = {
			id: '1',
			title: 'Angular',
			description: 'Angular',
			creationDate: '10/11/2020',
			duration: 210,
			authors: ['11', '22'],
		};
		const response = await saveCourse(course);
		if (response.successful) {
			store.dispatch(courseCreator.saveCourse([response.result]));
			expect(store.getState().courses.length).toEqual(1);
			expect(store.getState().courses[0]).toEqual(course);
		}
	});

	it('should handle GET_COURSES and returns new state', async () => {
		const prevState = store.getState();
		let nextState;
		const response = await getCourses();
		if (response.result) {
			store.dispatch(courseCreator.getCourses([response.result]));
			nextState = store.getState();
			expect(nextState).not.toEqual(prevState);
			expect(nextState.courses).toContain(response.result);
		}
	});
});
