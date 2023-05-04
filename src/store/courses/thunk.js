//constants and helpers
import { setFrom, setFromEdit } from '../../constants';

//store
import store from '../services';
import * as actionCreator from './actionCreators';

export const updateCourseID = async (id, info) => {
	const response = await fetch(`http://localhost:4000/courses/${id}`, {
		method: 'PUT',
		body: JSON.stringify(info),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${store.getState().user.token}`,
		},
	});
	const result = await response.json();
	if (result.successful) {
		store.dispatch(actionCreator.updateCourse(result.result));
		setFromEdit(true);
	}
	return result.result;
};

export async function getCourses() {
	const response = await fetch('http://localhost:4000/courses/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	store.dispatch(actionCreator.getCourses(result.result));
	return result.result;
}

export const saveCourses = async (newCourse) => {
	const response = await fetch('http://localhost:4000/courses/add', {
		method: 'POST',
		body: JSON.stringify(newCourse),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${store.getState().user.token}`,
		},
	});
	const result = await response.json();
	if (result.successful) {
		store.dispatch(actionCreator.saveCourse([result.result]));
		setFrom(true);
	}
};

export const deleteCourses = async (id) => {
	const response = await fetch(`http://localhost:4000/courses/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${store.getState().user.token}`,
		},
	});
	const result = await response.json();
	if (result.successful) {
		store.dispatch(actionCreator.deleteCourse(id));
	}
};
