import { useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Boton from '../../common/Button/Button';
import Paragraph from '../../common/Paragraph/Paragraph';

//styles
import styles from './Registration.css';

const Registration = () => {
	const history = useNavigate();
	async function handleRegistratiion() {
		const name = document.getElementById('name').value;
		const password = document.getElementById('password').value;
		const email = document.getElementById('email').value;
		const newUser = {
			name: name,
			email: email,
			password: password,
		};
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		if (!result.successful) {
			alert(result.errors[0]);
			return false;
		} else {
			alert(result.result);
			return true;
		}
	}
	return (
		<div className='registration-container'>
			<form className='registration-container__form'>
				<div>
					<h1>Registration</h1>
				</div>
				<div>
					<label htmlFor='name'>Name</label> <br />
					<Input typ={'text'} i={'name'} placeHold={'Enter name'} />
				</div>
				<div>
					<label htmlFor='email'>Email</label> <br />
					<Input typ={'email'} i={'email'} placeHold={'Enter email'} />
				</div>
				<div>
					<label htmlFor='passwork'>Password</label> <br />
					<Input typ={'password'} i={'password'} placeHold={'Enter name'} />
				</div>
				<Boton
					text={'Registration'}
					onClick={(e) => {
						e.preventDefault();
						handleRegistratiion().then((resolve) => {
							if (resolve) {
								history('/');
							}
						});
					}}
				/>
				<Paragraph
					text={'If you have an account you can'}
					textb={'logIn'}
					url={'/'}
					route={true}
				/>
			</form>
		</div>
	);
};

export default Registration;
