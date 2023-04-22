import React, { useState } from 'react';

import CourseCards from '../../components/Courses/components/CourseCard/CourseCards';
import SearchBar from '../../components/Courses/components/SearchBar/SearchBar';
import Header from '../../components/Header/Header';

import { updateMoked, addingCourse } from '../../constants';
import searchCourse from '../../helper/searchCourse';

const Courses = () => {
	const [addCour, isAddingCourse] = useState(addingCourse);
	const handleAddingCourse = () => {
		isAddingCourse(!addCour);
	};

	const [courses, setCourses] = useState(updateMoked);
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
};

export default Courses;
