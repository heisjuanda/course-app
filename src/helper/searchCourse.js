import { mockedCoursesList } from '../constants';

function findCourse(titleID) {
	titleID = titleID.toLowerCase();
	let course = [];
	if (titleID.length > 0) {
		course = mockedCoursesList.map((el) => {
			if (el.title.toLowerCase().includes(titleID) || el.id.includes(titleID)) {
				return el;
			}
		});
		//console.log(course);
		return course;
	} else {
		//console.log(mockedCoursesList);
		return mockedCoursesList;
	}
}

export default findCourse;
