import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

//component
import CourseCard from '../CourseCard';

//test reducer
import { mockedState, mockedStore } from '../../../../../setupTests';

//helpers and constants
import { setHours } from '../../../../../helper/pipeDuration';
import getAuthors from '../../../../../helper/authorByTtitle';
import { Provider } from 'react-redux';

describe('Course card', () => {
	it('should display title', () => {
		const nameCourse = 'Angular';
		const expected = mockedState.courses[0].title;
		render(
			<Provider store={mockedStore}>
				<Router>
					<CourseCard name={nameCourse} />
				</Router>
			</Provider>
		);
		expect(screen.getByText(expected)).toBeInTheDocument();
	});

	it('should display description', () => {
		const descriptionCourse = "it's Angular";
		const expectedDescription = mockedState.courses[0].description;
		render(
			<Provider store={mockedStore}>
				<Router>
					<CourseCard description={descriptionCourse} />
				</Router>
			</Provider>
		);
		expect(screen.getByText(expectedDescription)).toBeInTheDocument();
	});

	it('should display duration in the correct format', () => {
		const durationCourse = setHours(mockedState.courses[0].duration);
		const expectedDuration = /3:30/i;
		render(
			<Provider store={mockedStore}>
				<Router>
					<CourseCard duration={durationCourse} />
				</Router>
			</Provider>
		);
		expect(screen.getByText(expectedDuration)).toBeInTheDocument();
	});

	it('should display authors list', () => {
		const authors = getAuthors(
			mockedState.courses[0].title,
			mockedState.courses,
			mockedState.authors
		).join(', ');
		const expectedAuthors = /Anna Sidorenko, Valentina Larina/i;
		render(
			<Provider store={mockedStore}>
				<Router>
					<CourseCard duration={authors} />
				</Router>
			</Provider>
		);
		expect(screen.getByText(expectedAuthors)).toBeInTheDocument();
	});

	it('should display created date in the correct format', () => {
		const date = mockedState.courses[0].creationDate.split('/').join('.');
		const expectedDate = /10.11.2020/i;
		render(
			<Provider store={mockedStore}>
				<Router>
					<CourseCard duration={date} />
				</Router>
			</Provider>
		);
		expect(screen.getByText(expectedDate)).toBeInTheDocument();
	});
});
