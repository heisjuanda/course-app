import Header from './components/Header/Header';
import CourseCards from './components/Courses/components/CourseCard/CourseCards';
import React, { useState } from 'react';
import searchCourse from './helper/searchCourse';
import SearchBar from './components/Courses/components/SearchBar/SearchBar';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Boton from './common/Button/Button';

import { updateMoked, addingCourse } from './constants.js';

function App() {
	const [courses, setCourses] = useState(updateMoked);
	const [addCour, isAddingCourse] = useState(addingCourse);

	const handleSearch = (searchTerm) => {
		const foundCourses = searchCourse(searchTerm);
		setCourses(foundCourses);
	};

	const handleAddingCourse = () => {
		isAddingCourse(!addCour);
	};

	return (
		<div>
			<Header />
			{addCour ? (
				<>
					<CreateCourse isAddingCourse={isAddingCourse} />
					<center>
						<Boton onClick={handleAddingCourse} text={'Cancel'} />
					</center>
				</>
			) : (
				<>
					<SearchBar
						key={'one'}
						searcher={handleSearch}
						idBton={'search-bton'}
						foundedElements={courses}
						createCourse={handleAddingCourse}
					/>
					<CourseCards courses={courses} />
				</>
			)}
		</div>
	);
}
export default App;
