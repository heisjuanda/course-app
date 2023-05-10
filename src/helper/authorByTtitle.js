import { mockedCoursesList, mockedAuthorsList } from '../constants';

function getAuthors(
	title,
	courses = mockedCoursesList,
	allAuthors = mockedAuthorsList
) {
	let authors = [];
	let au = [];
	for (let course of courses) {
		if (course.title === title) {
			authors = course.authors;
		}
	}
	for (let i of authors) {
		for (let author of allAuthors) {
			if (author.id === i) {
				au.push(author.name);
			}
		}
	}
	return au;
}

export default getAuthors;
