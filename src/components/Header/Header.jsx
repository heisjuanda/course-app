import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Logo from './components/Logo/Logo';
import Boton from '../../common/Button/Button';

import { deleteTokenById, getUserByID } from '../../LocalStorage/localStorage';

import { setCondition } from '../../constants';

import store from '../../store/services';
//courses
import * as courseCreator from '../../store/courses/actionCreators';
//authors
import * as authorCreator from '../../store/authors/actionCreators';
//users
import * as userCreator from '../../store/user/actionCreators';

//styles
import styles from './Header.css';

const Header = ({ show }) => {
	const Dispatch = useDispatch();
	const removeStoreItems = () => {
		store.dispatch(courseCreator.deleteAll());
		store.dispatch(authorCreator.deleteAll());
		store.dispatch(userCreator.logoutSuccess());
		/*Dispatch(courseCreator.deleteAll());
		Dispatch(authorCreator.deleteAll());
		Dispatch(userCreator.logoutSuccess());*/
		console.log('deleting store');
		console.log(store.getState());
	};
	const history = useNavigate();
	const [text, addText] = useState('');
	useEffect(() => {
		addText(store.getState().user.name);
	}, []);
	/*
		{getUserByID(1, (result) => {
		addText(result.name);
		})}
	*/
	return (
		<header className='header-section'>
			<div className='header-section__logo'>
				<Logo></Logo>
			</div>
			{show ? (
				<>
					<div className='header-section__name'>
						<p>{text}</p>
					</div>
					<div className='header-section__logUser'>
						<Boton
							text={'Logout'}
							onClick={(e) => {
								e.preventDefault();
								removeStoreItems();
								deleteTokenById(1);
								setCondition(false);
								history('/');
							}}
						/>
					</div>
				</>
			) : (
				<>
					<div className='header-section__name'>
						<p></p>
					</div>
					<div className='header-section__logUser'></div>
				</>
			)}
		</header>
	);
};

export default Header;
