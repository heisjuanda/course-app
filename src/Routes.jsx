import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

//components
import HomeRegistration from './Routes/Home/HomeRegistration';
import HomeLogin from './Routes/Home/HomeLogin';
import Courses from './Routes/Courses/Courses';
import CreateCourses from './Routes/CreateCourses/CreateCourses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import EditCourses from './Routes/EditCourses/EditCourses';
//private
import PrivateRoute from './PrivateRouter/Private';

const RoutesApp = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<HomeLogin />} />
				<Route path='/register' element={<HomeRegistration />} />
				<Route path='/courses' element={<Courses />} />
				<Route
					path='/courses/add'
					element={<PrivateRoute Component={CreateCourses} />}
				/>
				<Route
					path='/courses/edit/:title/:id/:description/:creationDate/:authors/:duration'
					element={<PrivateRoute Component={EditCourses} />}
				/>
				<Route
					path='/courses/info/:title/:id/:description/:created/:authors/:duration'
					element={<CourseInfo />}
				/>
			</Routes>
		</>
	);
};
export default RoutesApp;
