import * as actionTypes from './actionTypes';
export function saveAuthor(authors) {
	return {
		type: actionTypes.SAVE_AUTHOR,
		authors,
	};
}

export function getAuthors(authors) {
	return {
		type: actionTypes.GET_AUTHOR,
		authors,
	};
}

export function deleteAll() {
	return {
		type: actionTypes.DELETE_ALL,
	};
}
