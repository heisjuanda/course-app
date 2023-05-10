//fake store for tests

const mockedState = {
	user: {
		isAuth: true,
		name: 'Juan David',
		email: '',
		token: '',
		role: 'admin',
	},
	courses: [
		{
			id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
			title: 'Angular',
			description: "it's Angular",
			creationDate: '10/11/2020',
			duration: 210,
			authors: [
				'df32994e-b23d-497c-9e4d-84e4dc02882f',
				'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
			],
		},
	],
	authors: [
		{
			id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
			name: 'Anna Sidorenko',
		},
		{
			id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
			name: 'Valentina Larina',
		},
	],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

export { mockedState, mockedStore };
