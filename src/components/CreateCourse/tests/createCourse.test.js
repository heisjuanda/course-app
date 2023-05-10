import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

//store
import { rootReducer } from '../../../store/services';
import { configureStore } from '@reduxjs/toolkit';

//component
import CreateCourse from '../CreateCourse';

//store
import * as courseCreator from '../../../store/courses/actionCreators';
import * as authorCreator from '../../../store/authors/actionCreators';
import * as userCreator from '../../../store/user/actionCreators';

//helpers and constants
import { UpdateMockedAuthorsList } from '../../../constants';

//local storage
import { getToken } from '../../../LocalStorage/localStorage';

jest.mock('../../../LocalStorage/localStorage', () => ({
	addUser: jest.fn(),
	deleteUser: jest.fn(),
	getToken: jest.fn(),
}));

describe('Create Course', () => {
	let store;
	const newUser = {
		name: 'name',
		email: 'email',
		password: 'password',
	};
	const authors = [
		{
			name: 'Juan David Moreno Alfonso',
			id: '1',
		},
		{
			name: 'Andres Felipe Moreno Alfonso',
			id: '2',
		},
	];
	const course = {
		id: '1',
		title: 'React',
		description: 'React',
		creationDate: '10/11/2020',
		duration: 100,
		authors: ['1', '2'],
	};
	const localStorageMock = {
		getItem: jest.fn(),
		setItem: jest.fn(),
		removeItem: jest.fn(),
		clear: jest.fn(),
	};

	Object.defineProperty(window, 'localStorage', { value: localStorageMock });
	beforeEach(() => {
		const fakeToken =
			'Bearer PnIm+dLDPfPdHrz1gNVdpO5JqtcXcGolTqLFlFMKH6FGcEGOYFh/ot4rfFB08xRPnoy4zWTp5Ie5kz7A0odYid1+AxKVbFuX22wX5ce9hQkgiV3Oy8uuEQwfYTi40cbFO1RYjEcDmHRNzOaUg7nBLavFuZtButtsFRxoszdfHak4arU1SxxaWmZ33Zc9ffH9/k+EMWsL8pvyjwhGdrZJ6Su7M3HGGZP5rz4r/6EraNKJuzo9/+cMobgP8L2YK1R4N/N1KFLdOziu1/kAPfSy4HXEqpuOrwb8klwdoNnIR8XPN5zc6l5HudPqz3jUeUBZ+4u5SOqzTe9heeHpIsrIBA==';
		store = configureStore({
			reducer: rootReducer,
		});
		getToken.mockReturnValue(
			`{"tokens":[{"id":1,"token":${fakeToken},"name":${newUser.name}}]}`
		);
		const user = {
			isAuth: true,
			name: newUser.name,
			email: newUser.email,
			token: fakeToken,
			role: 'admin',
		};
		store.dispatch(userCreator.loginSuccess(user));
		store.dispatch(authorCreator.saveAuthor([authors[0]]));
		store.dispatch(authorCreator.saveAuthor([authors[1]]));
		store.dispatch(courseCreator.saveCourse([course]));
		UpdateMockedAuthorsList(authors);
	});

	it('should show authors lists', async () => {
		render(
			<Provider store={store}>
				<Router>
					<CreateCourse />
				</Router>
			</Provider>
		);
		const authorName1 = screen.getByText(/Juan David Moreno Alfonso/i);
		const authorName2 = screen.getByText(/Andres Felipe Moreno Alfonso/i);
		expect(authorName1).toBeInTheDocument();
		expect(authorName2).toBeInTheDocument();
	});

	it('"Create author" click button should call dispatch', async () => {
		render(
			<Provider store={store}>
				<Router>
					<CreateCourse />
				</Router>
			</Provider>
		);
		const createCourseBton = screen.getByText(/Create course/i);
		const titleInput = screen.getByPlaceholderText(/Enter title/i);
		fireEvent.change(titleInput, { target: { value: `${course.title}` } });
		const descriptionInput = screen.getByPlaceholderText(/Enter description/i);
		fireEvent.change(descriptionInput, {
			target: { value: `${course.description}` },
		});
		const addAuthorBton = screen.getAllByText(/Add author/i);
		addAuthorBton.forEach((el) => {
			fireEvent.click(el);
		});
		const durationInput = screen.getByPlaceholderText(/Add duration/i);
		fireEvent.change(durationInput, {
			target: { value: `${course.duration}` },
		});
		fireEvent.click(createCourseBton);
		expect(store.getState().courses.length).toEqual(1);
	});

	it('"Add author" button click should add an author to course authors list', async () => {
		render(
			<Provider store={store}>
				<Router>
					<CreateCourse />
				</Router>
			</Provider>
		);
		const createAuthorInput = screen.getByPlaceholderText(/Enter author name/i);
		fireEvent.change(createAuthorInput, {
			target: { value: `${'He Is JuanDa'}` },
		});
		const createAuthorBton = screen.getByText(/Create author/i);
		fireEvent.click(createAuthorBton);
		setTimeout(() => {
			const newAuthor = screen.getByText(/He Is JuanDa/i);
			expect(newAuthor).toBeInTheDocument();
		}, 500);
	});
});
