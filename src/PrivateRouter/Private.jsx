import { Navigate } from 'react-router-dom';
import React from 'react';

//store
import store from '../store/services';

const PrivateRoute = ({ Component }) => {
	const authorized = store.getState().user.role === 'admin';
	return authorized ? <Component /> : <Navigate to='/courses' />;
};

export default PrivateRoute;
