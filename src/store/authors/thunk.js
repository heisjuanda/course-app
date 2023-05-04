//store
import * as actionCreator from './actionCreators';
import store from '../services';

export const addAuthor = async (author) => {
	const response = await fetch('http://localhost:4000/authors/add', {
		method: 'POST',
		body: JSON.stringify(author),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${store.getState().user.token}`,
		},
	});
	const result = await response.json();
	if (result.successful) {
		store.dispatch(actionCreator.saveAuthor([result.result]));
		return result.result;
	}
};

export async function getAuthors() {
	const response = await fetch('http://localhost:4000/authors/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const result = await response.json();
	store.dispatch(actionCreator.getAuthors(result.result));
	return result.result;
}
