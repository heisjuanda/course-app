const DB_STORE_NAME = 'tokens';

function addUser(token, name) {
	const existingTokens = JSON.parse(localStorage.getItem(DB_STORE_NAME)) || [];

	const newUser = {
		id: 1,
		token: token,
		name: name,
	};

	existingTokens.push(newUser);
	localStorage.setItem(DB_STORE_NAME, JSON.stringify(existingTokens));

	console.log('User added successfully');
}

function deleteUser() {
	localStorage.clear();
	console.log('User deleted successfully');
}

function getToken() {
	const tokenObj = JSON.parse(localStorage.getItem('tokens'));
	const token = tokenObj[0].token;
	return token;
}

export { addUser, deleteUser, getToken };
