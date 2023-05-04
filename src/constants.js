//where courses are stored
let mockedCoursesList = [];

const saveMockedCoursesList = (newValue) => {
	let exist = false;
	for (let newCourse of newValue) {
		exist = false;
		for (let oldCourse of mockedCoursesList) {
			if (newCourse.id === oldCourse.id) {
				exist = true;
				break;
			}
		}
		if (!exist) {
			mockedCoursesList = mockedCoursesList.concat(newCourse);
		}
	}
};

const updateMockedCoursesList = (newValue) => {
	mockedCoursesList = newValue;
};

const deleteMockedCourseList = (id) => {
	mockedCoursesList = mockedCoursesList.filter((course) => course.id !== id);
};

//where authors are stored
let mockedAuthorsList = [];

const UpdateMockedAuthorsList = (newValue) => {
	let exist = false;
	for (let com of newValue) {
		exist = false;
		for (let el of mockedAuthorsList) {
			if (com.id === el.id) {
				exist = true;
				break;
			}
		}
		if (!exist) {
			mockedAuthorsList = mockedAuthorsList.concat(com);
		}
	}
};

let updateMoked = mockedCoursesList;

const setUpdateMoked = (newValue) => {
	updateMoked = newValue;
};

let addingCourse = false;
const setAddingCourse = (newValue) => {
	addingCourse = newValue;
};

//checks if it's the first time the user enters to courses to get courses and authors from api
export const CONDITION = 1;
export let condition = 1;
const setCondition = (reset = true) => {
	reset ? (condition += condition) : (condition = 1);
};

export let isFromCreation = false;
export const setFrom = (from) => {
	isFromCreation = from;
};

export let isFromEdit = false;
export const setFromEdit = (from) => {
	isFromEdit = from;
};

export let coursesMocked = true;
export const changeCoursesMocked = () => {
	coursesMocked = false;
};

export {
	mockedAuthorsList,
	mockedCoursesList,
	setUpdateMoked,
	updateMoked,
	addingCourse,
	setAddingCourse,
	saveMockedCoursesList,
	UpdateMockedAuthorsList,
	setCondition,
	deleteMockedCourseList,
	updateMockedCoursesList,
};
