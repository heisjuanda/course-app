import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Logo from './components/Logo/Logo';
import Boton from '../../common/Button/Button';

import { deleteTokenById, getUserByID } from '../../LocalStorage/localStorage';

//styles
import styles from './Header.css';

const Header = ({ show }) => {
	const history = useNavigate();
	const [text, addText] = useState('');
	return (
		<header className='header-section'>
			<div className='header-section__logo'>
				<Logo></Logo>
			</div>
			{show ? (
				<>
					<div className='header-section__name'>
						<p>
							{text}
							{getUserByID(1, (result) => {
								addText(result.name);
							})}
						</p>
					</div>
					<div className='header-section__logUser'>
						<Boton
							text={'Logout'}
							onClick={(e) => {
								e.preventDefault();
								deleteTokenById(1);
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
