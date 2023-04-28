import * as actionTypes from './actionTypes';

let coursesInitialState = [];

const reducer = (state = coursesInitialState, action) => {
	//console.log('StatecourseR', state);
	//console.log('ActioncourseR', action);
	switch (action.type) {
		case actionTypes.SAVE_COURSES_SUCCESS:
			return [...state, ...action.course];
		case actionTypes.DELETE_COURSES_SUCCESS:
			return state.filter((course) => course.id !== action.id);
		case actionTypes.UPDATE_COURSES_SUCCESS:
			return state.map((course) =>
				course.id === action.course.id ? action.courses : course
			);
		case actionTypes.GET_COURSES_SUCCESS:
			return action.courses;
		case 'DELETE_ALL':
			return [];
		default:
			return state;
	}
};

export default reducer;
