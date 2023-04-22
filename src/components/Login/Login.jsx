import { useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Boton from '../../common/Button/Button';
import Paragraph from '../../common/Paragraph/Paragraph';

import { addToken } from '../../LocalStorage/localStorage';

//styles
import styles from './Login.css';

const Login = () => {
	const history = useNavigate();
	async function handleLogin() {
		const name = '';
		const password = document.getElementById('password').value;
		const email = document.getElementById('email').value;
		const newUser = {
			name: name,
			email: email,
			password: password,
		};
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		if (!result.successful) {
			alert(result.result);
			return false;
		} else {
			alert(`Welcome ${result.user.name}!!`);
			addToken(result.result, result.user.name);
			return true;
		}
	}
	return (
		<div className='logIn-container'>
			<form className='logIn-container__form'>
				<div>
					<h1>Login</h1>
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
					text={'Login'}
					onClick={(e) => {
						e.preventDefault();
						handleLogin().then((resolve) => {
							if (resolve) {
								history('/courses');
							}
						});
					}}
				/>
				<Paragraph
					text={'If you not have an account you can'}
					textb={'Registration'}
					url={'/register'}
					route={true}
				/>
			</form>
		</div>
	);
};

export default Login;
