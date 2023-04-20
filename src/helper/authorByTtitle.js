import { mockedCoursesList, mockedAuthorsList } from '../constants';

function getAuthors(title) {
	let authors = [];
	let au = [];
	for (let course of mockedCoursesList) {
		if (course.title === title) {
			authors = course.authors;
		}
	}
	for (let i of authors) {
		for (let author of mockedAuthorsList) {
			if (author.id === i) {
				au.push(author.name);
			}
		}
	}
	return au;
}

export default getAuthors;
