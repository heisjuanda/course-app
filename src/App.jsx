import { BrowserRouter } from 'react-router-dom';
import React from 'react';

//components
import RoutesApp from './Routes';

function App() {
	return (
		<>
			<BrowserRouter>
				<RoutesApp />
			</BrowserRouter>
		</>
	);
}
export default App;
