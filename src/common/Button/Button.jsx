import { useNavigate } from 'react-router-dom';

//Styles
import styles from '../Button/Button.css';

const Boton = ({ text, onClick, id, linkTo }) => {
	const history = useNavigate();

	//takes the user to a new route
	function handleLink() {
		history(linkTo);
	}

	//check if onClick exist, if linkto exist it'll execute both functions or only one
	function handleClick() {
		if (onClick) {
			onClick();
			handleLink();
		} else {
			handleLink();
		}
	}

	return linkTo ? (
		<button id={id} className='boton' onClick={handleClick}>
			{text}
		</button>
	) : (
		<button id={id} className='boton' onClick={onClick}>
			{text}
		</button>
	);
};

export default Boton;
