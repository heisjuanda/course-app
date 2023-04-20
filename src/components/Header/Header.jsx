import Logo from './components/Logo/Logo';

import Boton from '../../common/Button/Button';
//styles
import styles from './Header.css';

const Header = () => {
	return (
		<header className='header-section'>
			<div className='header-section__logo'>
				<Logo></Logo>
			</div>
			<div className='header-section__name'>
				<p>Juan David</p>
			</div>
			<div className='header-section__logUser'>
				<Boton text={'Logout'} />
			</div>
		</header>
	);
};

export default Header;
