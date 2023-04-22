const DB_NAME = 'tokenDB';
const DB_VERSION = 1;
const DB_STORE_NAME = 'tokens';

let db;

// open database
function openDB() {
	const request = window.indexedDB.open(DB_NAME, DB_VERSION);

	request.onerror = (event) => {
		console.error('Error opening database:', event.target.errorCode);
	};

	request.onsuccess = (event) => {
		db = event.target.result;
		console.log('Database opened successfully');
	};

	request.onupgradeneeded = (event) => {
		const db = event.target.result;

		// create object store
		const objectStore = db.createObjectStore(DB_STORE_NAME, {
			keyPath: 'id',
			autoIncrement: false,
		});

		objectStore.createIndex('index', 'id', { unique: true });

		console.log('Database upgrade completed');
	};
}

// add user to database
function addToken(token, name) {
	const transaction = db.transaction([DB_STORE_NAME], 'readwrite');
	const objectStore = transaction.objectStore(DB_STORE_NAME);

	const newToken = {
		id: 1,
		token: token,
		name: name,
	};
	const request = objectStore.add(newToken);

	request.onerror = (event) => {
		console.error('Error adding user:', event.target.errorCode);
	};

	request.onsuccess = (event) => {
		console.log('User added successfully');
	};
}

function getUserByID(id, callback) {
	const transaction = db.transaction([DB_STORE_NAME], 'readonly');
	const objectStore = transaction.objectStore(DB_STORE_NAME);
	const index = objectStore.index('index');

	const request = index.get(id);

	request.onerror = (event) => {
		console.error('Error getting user:', event.target.errorCode);
	};

	request.onsuccess = (event) => {
		const token = event.target.result;
		if (token) {
			callback(token);
		} else {
			callback(null);
		}
	};
}

// delete user by email
function deleteTokenById(id) {
	const transaction = db.transaction([DB_STORE_NAME], 'readwrite');
	const objectStore = transaction.objectStore(DB_STORE_NAME);

	const request = objectStore.delete(id);

	request.onerror = (event) => {
		console.error('Error deleting user:', event.target.errorCode);
	};

	request.onsuccess = (event) => {
		console.log('User deleted successfully');
	};
}

export { openDB, addToken, getUserByID, deleteTokenById };
