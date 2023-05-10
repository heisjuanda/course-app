import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as router from 'react-router';
import '@testing-library/jest-dom';

//test reducer
import { mockedState, mockedStore } from '../../../setupTests';

//component
import Courses from '../Courses';

//helpers and contants
import { updateMockedCoursesList } from '../../../constants';
import { setHours } from '../../../helper/pipeDuration';

describe('Courses', () => {
	const navigate = jest.fn();
	beforeEach(() => {
		jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
	});

	it('should display amount of CourseCard equal length of courses array', () => {
		updateMockedCoursesList(mockedState.courses);
		render(
			<Provider store={mockedStore}>
				<Router>
					<Courses />
				</Router>
			</Provider>
		);
		const courseCard = screen.getAllByTestId('course-cards');
		expect(courseCard).toHaveLength(1);
	});

	it('should be showed after a click on a button "Add new course"', async () => {
		updateMockedCoursesList(mockedState.courses);
		render(
			<Provider store={mockedStore}>
				<Router>
					<Courses />
				</Router>
			</Provider>
		);
		const addCourseButton = screen.getByText(/Add course/i);
		fireEvent.click(addCourseButton);
		expect(navigate).toHaveBeenCalledWith('/courses/add');
	});

	it('should be showed after a click on a button "Edit course"', async () => {
		updateMockedCoursesList(mockedState.courses);
		const titleCourse = mockedStore.getState().courses[0].title;
		const idCourse = mockedStore.getState().courses[0].id;
		const descriptionCourse = mockedStore.getState().courses[0].description;
		const dateCourse = mockedStore
			.getState()
			.courses[0].creationDate.split('/')
			.join('.');
		const authorsCouse = mockedStore.getState().courses[0].authors.join(',');
		const durationCourse = setHours(mockedStore.getState().courses[0].duration);
		render(
			<Provider store={mockedStore}>
				<Router>
					<Courses />
				</Router>
			</Provider>
		);
		const addCourseButton = screen.getByText(/🖊/i);
		fireEvent.click(addCourseButton);
		expect(navigate).toHaveBeenCalledWith(
			`/courses/edit/${titleCourse}/${idCourse}/${descriptionCourse}/${dateCourse}/${authorsCouse}/${durationCourse}`
		);
	});
});
