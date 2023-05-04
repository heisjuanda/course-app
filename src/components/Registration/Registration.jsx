import { useNavigate } from 'react-router-dom';

//components
import Input from '../../common/Input/Input';
import Boton from '../../common/Button/Button';
import Paragraph from '../../common/Paragraph/Paragraph';

//store thunks
import { register } from '../../store/user/thunk';

//styles
import styles from './Registration.css';

const Registration = () => {
	const history = useNavigate();

	const handleErrors = (result) => {
		if (result.errors) {
			if (result.errors[0].includes('password')) {
				alert('The password length must be longer than 6 digits');
			} else if (result.errors[0].includes('name')) {
				alert('The name field is required');
			} else {
				alert('The email is invalid or already exist');
			}
		} else {
			alert('Wrong password or email');
		}
	};

	async function handleRegistratiion() {
		const name = document.getElementById('name').value;
		const password = document.getElementById('password').value;
		const email = document.getElementById('email').value;
		const newUser = {
			name: name,
			email: email,
			password: password,
		};
		const result = await register(newUser);
		if (!result.successful) {
			handleErrors(result);
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
					<Input
						type={'text'}
						id={'name'}
						placeHold={'Enter name'}
						required={true}
					/>
				</div>
				<div>
					<label htmlFor='email'>Email</label> <br />
					<Input
						type={'email'}
						id={'email'}
						placeHold={'Enter email'}
						required={true}
					/>
				</div>
				<div>
					<label htmlFor='passwork'>Password</label> <br />
					<Input
						type={'password'}
						id={'password'}
						placeHold={'Enter name'}
						required={true}
					/>
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
