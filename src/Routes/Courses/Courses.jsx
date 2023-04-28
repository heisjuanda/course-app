import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CourseCards from '../../components/Courses/components/CourseCard/CourseCards';
import SearchBar from '../../components/Courses/components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';

import {
	addingCourse,
	mockedCoursesList,
	UpdateMockedCoursesList,
	mockedAuthorsList,
	UpdateMockedAuthorsList,
	CONDITION,
	condition,
	setCondition,
	setFrom,
	isFromCreation,
} from '../../constants';
import searchCourse from '../../helper/searchCourse';

import { getCourses, getAuthors } from '../../store/services';
import store from '../../store/services';
//courses
import * as courseCreator from '../../store/courses/actionCreators';
//authors
import * as authorCreator from '../../store/authors/actionCreators';

const Courses = () => {
	/*const unsubscribe = store.subscribe(() => {
		console.log('state', store.getState());
		unsubscribe();
	});*/
	//let cursos = await getCourses();
	const Dispatch = useDispatch();
	const [addCour, isAddingCourse] = useState(addingCourse);
	const handleAddingCourse = () => {
		isAddingCourse(!addCour);
	};
	const [update, setUpdate] = useState(0);
	//updateMoked
	const [courses, setCourses] = useState(mockedCoursesList);
	const handleUpdate = () => {
		UpdateMockedCoursesList(store.getState().courses);
		UpdateMockedAuthorsList(store.getState().authors);
		setCourses(store.getState().courses);
	};
	useEffect(() => {
		if (CONDITION === condition) {
			async function fetchCourses() {
				const resultCourses = await getCourses();
				const resultAuthors = await getAuthors();
				UpdateMockedCoursesList(resultCourses);
				UpdateMockedAuthorsList(resultAuthors);
				/*setCourses(mockedCoursesList);
				console.log('courses', courses);
				console.log('mok', mockedCoursesList);*/
				setCourses(mockedCoursesList);
				//courses
				store.dispatch(courseCreator.getCourses(mockedCoursesList));
				//authors
				store.dispatch(authorCreator.getAuthors(mockedAuthorsList));
				//get store state
				console.log('Getting store', store.getState());
			}
			fetchCourses();
			setCondition();
		} else if (isFromCreation) {
			/*courses
			//store.dispatch(courseCreator.getCourses(mockedCoursesList));
			//authors
			//store.dispatch(authorCreator.getAuthors(mockedAuthorsList));
			//console.log(store.getState());
			//console.log('isF');
			//console.log('courses', courses);
			//console.log('mok', mockedCoursesList);*/
			handleUpdate();
			setFrom(false);
		}
	}, []);
	/*useEffect(() => {
		if (coursesMocked || isFromCreation) {
			setCourses(mockedCoursesList);
			console.log('coursesU', courses);
			console.log('mokU', mockedCoursesList);
			changeCoursesMocked();
		}
	}, [courses]);*/
	const handleSearch = (searchTerm) => {
		const foundCourses = searchCourse(searchTerm);
		setCourses(foundCourses);
	};
	return (
		<>
			<Header show={true} />
			<SearchBar
				key={'one'}
				searcher={handleSearch}
				idBton={'search-bton'}
				foundedElements={courses}
				createCourse={handleAddingCourse}
			/>
			<CourseCards courses={courses} update={setUpdate} cursos={setCourses} />
		</>
	);
};

export default Courses;

/*

import React, { useState, useEffect } from 'react';

import CourseCards from '../../components/Courses/components/CourseCard/CourseCards';
import SearchBar from '../../components/Courses/components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';

import {
	updateMoked,
	addingCourse,
	mockedCoursesList,
	UpdateMockedCoursesList,
} from '../../constants';
import searchCourse from '../../helper/searchCourse';

import { getCourses, getAuthors } from '../../store/services';
	/*async function getCourses() {
		const response = await fetch('http://localhost:4000/courses/all', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result.result;
	}/
	//let cursos = await getCourses();
	const [addCour, isAddingCourse] = useState(addingCourse);
	const handleAddingCourse = () => {
		isAddingCourse(!addCour);
	};
	//updateMoked
	const [courses, setCourses] = useState(updateMoked);
	/*useEffect(() => {
		async function fetchCourses() {
			const result = Array.from(await getCourses());
			UpdateMockedCoursesList(result);
			setCourses(result);
			//updateMoked = result;
			console.log('resultado; ', result);
		}
		fetchCourses();
	}, []);/
	console.log(courses);
	const handleSearch = (searchTerm) => {
		const foundCourses = searchCourse(searchTerm);
		setCourses(foundCourses);
	};
	return (
		<>
			<Header show={true} />
			<SearchBar
				key={'one'}
				searcher={handleSearch}
				idBton={'search-bton'}
				foundedElements={courses}
				createCourse={handleAddingCourse}
			/>
			<CourseCards courses={courses} />
		</>
	);


*/
