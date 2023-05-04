import * as actionTypes from './actionTypes';

export const saveCourse = (course) => {
	return {
		type: actionTypes.SAVE_COURSES_SUCCESS,
		course,
	};
};

export const deleteCourse = (id) => ({
	type: actionTypes.DELETE_COURSES_SUCCESS,
	id,
});

export const updateCourse = (course) => ({
	type: actionTypes.UPDATE_COURSES_SUCCESS,
	course,
});

export const getCourses = (courses) => ({
	type: actionTypes.GET_COURSES_SUCCESS,
	courses,
});

export function deleteAll() {
	return { type: actionTypes.DELETE_ALL };
}
