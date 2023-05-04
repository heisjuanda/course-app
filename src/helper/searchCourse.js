import { mockedCoursesList } from '../constants';

function findCourse(titleID) {
	titleID = titleID.toLowerCase();
	let course = [];
	if (titleID.length > 0) {
		course = mockedCoursesList.map((course) => {
			if (
				course.title.toLowerCase().includes(titleID) ||
				course.id.includes(titleID)
			) {
				return course;
			}
		});
		return course;
	} else {
		return mockedCoursesList;
	}
}

export default findCourse;
