const DB_STORE_NAME = 'tokens';

// add user to localStorage
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

// delete user by ID from localStorage
function deleteUser() {
	localStorage.clear();
	console.log('User deleted successfully');
}

export { addUser, deleteUser };
