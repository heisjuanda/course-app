import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//components
import Logo from './components/Logo/Logo';
import Boton from '../../common/Button/Button';

//local storage
import { deleteUser } from '../../LocalStorage/localStorage';

//constants and helpers
import { setCondition } from '../../constants';

//store
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

//actions
import * as userCreator from '../../store/user/actionCreators';
import * as authorCreator from '../../store/authors/actionCreators';
import * as courseCreator from '../../store/courses/actionCreators';

//thunks
import { logOut } from '../../store/user/thunk';

//styles
import styles from './Header.css';
import store from '../../store/services';

const Header = ({ show }) => {
	const history = useNavigate();
	const [text, addText] = useState('');
	let name = useSelector((state) => state.user.name);
	//add the user's name
	useEffect(() => {
		addText(name);
	}, []);

	const logout = async () => {
		await logOut();
		deleteUser();
		setCondition(false);
		history('/');
	};

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
								logout();
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
