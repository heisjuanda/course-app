import { getToken } from '../../LocalStorage/localStorage';

export const addAuthor = async (author) => {
	const response = await fetch('http://localhost:4000/authors/add', {
		method: 'POST',
		body: JSON.stringify(author),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${getToken()}`,
		},
	});
	const result = await response.json();
	return result;
};

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
