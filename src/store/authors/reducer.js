import * as actionTypes from './actionTypes';

let authorsInitialState = [];

const reducer = (state = authorsInitialState, action) => {
	//console.log('authorR', state, action);
	switch (action.type) {
		case actionTypes.SAVE_AUTHOR:
			return [...state, ...action.authors];
		case actionTypes.GET_AUTHOR:
			return action.authors;
		case 'DELETE_ALL':
			return [];
		default:
			return state;
	}
};

export default reducer;
