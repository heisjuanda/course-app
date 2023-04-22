import { useNavigate } from 'react-router-dom';

//Styles
import styles from '../Button/Button.css';

const Boton = ({ text, onClick, id, linkTo }) => {
	const history = useNavigate();
	function handleLink() {
		history(linkTo);
	}
	return linkTo ? (
		<button
			id={id}
			className='boton'
			onClick={() => {
				if (onClick) {
					onClick();
					handleLink();
				} else {
					handleLink();
				}
			}}
		>
			{text}
		</button>
	) : (
		<button id={id} className='boton' onClick={onClick}>
			{text}
		</button>
	);
};

export default Boton;
