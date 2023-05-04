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
import store from '../../store/services';
//store apis
import { getAuthors } from '../../store/authors/thunk';
import { getCourses } from '../../store/courses/thunk';
import { useSelector } from 'react-redux';

const Courses = () => {
	const [addCour, isAddingCourse] = useState(addingCourse);

	const handleAddingCourse = () => {
		isAddingCourse(!addCour);
	};
	const [update, setUpdate] = useState(0);
	const [courses, setCourses] = useState(mockedCoursesList);

	const handleUpdateCreation = () => {
		saveMockedCoursesList(store.getState().courses);
		UpdateMockedAuthorsList(store.getState().authors);
		setCourses(store.getState().courses);
	};

	const handleUpdateEdit = () => {
		updateMockedCoursesList(store.getState().courses);
		UpdateMockedAuthorsList(store.getState().authors);
		setCourses(store.getState().courses);
	};

	const _courses = useSelector((state) => state.courses);

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
			saveMockedCoursesList(resultCourses);
			UpdateMockedAuthorsList(resultAuthors);
			setCourses(mockedCoursesList);
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
			{store.getState().user.isAuth ? (
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
