import styles from '../Button/Button.css';

const Boton = ({ text, onClick, id }) => {
	return (
		<button id={id} className='boton' onClick={onClick}>
			{text}
		</button>
	);
};

export default Boton;
