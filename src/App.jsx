import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Header from './components/Header/Header';
import CourseCards from './components/Courses/components/CourseCard/CourseCards';
import searchCourse from './helper/searchCourse';
import SearchBar from './components/Courses/components/SearchBar/SearchBar';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Boton from './common/Button/Button';

import HomeRegistration from './Routes/Home/HomeRegistration';
import HomeLogin from './Routes/Home/HomeLogin';
import Courses from './Routes/Courses/Courses';
import CreateCourses from './Routes/CreateCourses/CreateCourses';
import CourseInfo from './components/CourseInfo/CourseInfo';

import { openDB } from './LocalStorage/localStorage';

//import { updateMoked, addingCourse } from './constants';

function App() {
	/*const [courses, setCourses] = useState(updateMoked);
	const [addCour, isAddingCourse] = useState(addingCourse);

	const handleSearch = (searchTerm) => {
		const foundCourses = searchCourse(searchTerm);
		setCourses(foundCourses);
	};

	const handleAddingCourse = () => {
		isAddingCourse(!addCour);
	};*/
	openDB();
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' Component={HomeLogin} />
					<Route path='/register' Component={HomeRegistration} />
					<Route path='/courses' Component={Courses} />
					<Route path='/Courses/Add' Component={CreateCourses} />
					<Route
						path='/courses/info/:title/:id/:description/:created/:authors/:duration'
						Component={CourseInfo}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
/*
	const [addCour, isAddingCourse] = useState(addingCourse);
	const handleAddingCourse = () => {
		isAddingCourse(!addCour);
	};

	const [courses, setCourses] = useState(updateMoked);
	const handleSearch = (searchTerm) => {
		const foundCourses = searchCourse(searchTerm);
		setCourses(foundCourses);
	};
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
*/
