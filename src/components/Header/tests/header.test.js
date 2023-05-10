import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

//components
import Header from '../Header';

//test reducer
import { mockedState, mockedStore } from '../../../setupTests';

describe('Header component', () => {
	it("should show the user's name", () => {
		const expectedName = mockedState.user.name;
		render(
			<Provider store={mockedStore}>
				<Router>
					<Header show={true} />
				</Router>
			</Provider>
		);
		expect(screen.getByText(expectedName)).toBeInTheDocument();
	});

	it('should show the logo', () => {
		const expectedLogo = /EPAM courses Logo/i;
		render(
			<Provider store={mockedStore}>
				<Router>
					<Header show={true} />
				</Router>
			</Provider>
		);
		expect(screen.getByAltText(expectedLogo)).toBeInTheDocument();
	});
});
