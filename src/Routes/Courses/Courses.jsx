import React, { useState, useEffect } from 'react';

//components
import CourseCards from '../../components/Courses/components/CourseCard/CourseCards';
import SearchBar from '../../components/Courses/components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';

//constants and helpers
import {
	addingCourse,
	mockedCoursesList,
	saveMockedCoursesList,
	UpdateMockedAuthorsList,
	CONDITION,
	condition,
	setCondition,
	setFrom,
	isFromCreation,
	isFromEdit,
	updateMockedCoursesList,
	setFromEdit,
} from '../../constants';
import searchCourse from '../../helper/searchCourse';

//store
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as courseCreator from '../../store/courses/actionCreators';
import * as authorCreator from '../../store/authors/actionCreators';

//store apis
import { getAuthors } from '../../store/authors/thunk';
import { getCourses } from '../../store/courses/thunk';

const Courses = () => {
	const _courses = useSelector((state) => state.courses);
	const _authors = useSelector((state) => state.authors);
	const _user = useSelector((state) => state.user.isAuth);

	const dispatch = useDispatch();

	const [addCour, isAddingCourse] = useState(addingCourse);

	const handleAddingCourse = () => {
		isAddingCourse(!addCour);
	};
	const [update, setUpdate] = useState(0);
	const [courses, setCourses] = useState(mockedCoursesList);

	const handleUpdateCreation = () => {
		saveMockedCoursesList(_courses);
		UpdateMockedAuthorsList(_authors);
		setCourses(_courses);
	};

	const handleUpdateEdit = () => {
		updateMockedCoursesList(_courses);
		UpdateMockedAuthorsList(_authors);
		setCourses(_courses);
	};

	//gets courses and authors from apis and updates the store
	useEffect(() => {
		async function updateValues() {
			if (isFromCreation) {
				handleUpdateCreation();
				setFrom(false);
			} else if (isFromEdit) {
				handleUpdateEdit();
				setFromEdit(false);
			}
		}
		async function fetchCourses() {
			const resultCourses = await getCourses();
			const resultAuthors = await getAuthors();
			if (resultCourses.successful) {
				dispatch(courseCreator.getCourses(resultCourses.result));
				dispatch(authorCreator.getAuthors(resultAuthors));
				saveMockedCoursesList(resultCourses.result);
				UpdateMockedAuthorsList(resultAuthors);
				setCourses(mockedCoursesList);
			}
		}
		if (CONDITION === condition) {
			fetchCourses();
			setCondition();
		} else {
			updateValues();
		}
	}, [_courses]);

	const handleSearch = (searchTerm) => {
		const foundCourses = searchCourse(searchTerm);
		setCourses(foundCourses);
	};

	return (
		<>
			{_user ? (
				<>
					<Header show={true} />
					<SearchBar
						key={'one'}
						searcher={handleSearch}
						idBton={'search-bton'}
						createCourse={handleAddingCourse}
					/>
					<CourseCards
						courses={courses}
						update={setUpdate}
						cursos={setCourses}
					/>
				</>
			) : null}
		</>
	);
};

export default Courses;
