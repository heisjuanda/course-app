import { useNavigate } from 'react-router-dom';

//components
import Input from '../../common/Input/Input';
import Boton from '../../common/Button/Button';
import Paragraph from '../../common/Paragraph/Paragraph';

//local storage
import { addUser } from '../../LocalStorage/localStorage';

//store
import { useDispatch } from 'react-redux';
//user
import * as userCreator from '../../store/user/actionCreators';
//store apis
import { getUser, logIn } from '../../store/user/thunk';

//styles
import styles from './Login.css';

const Login = () => {
	const history = useNavigate();
	const dispatch = useDispatch();

	const handleErrors = (result) => {
		if (result.errors) {
			alert('The email is invalid');
		} else {
			alert('Wrong password or email');
		}
	};

	async function handleLogin() {
		const name = '';
		const password = document.getElementById('password').value;
		const email = document.getElementById('email').value;
		const newUser = {
			name: name,
			email: email,
			password: password,
		};
		const result = await logIn(newUser);
		if (result.successful) {
			alert(`Welcome ${result.user.name}!!`);
			addUser(result.result, result.user.name);
			const currentUser = await getUser(result.result);
			if (currentUser.result.role === 'admin') {
				const user = {
					isAuth: true,
					name: result.user.name,
					email: result.user.email,
					token: result.result,
					role: currentUser.result.role,
				};
				dispatch(userCreator.loginSuccess(user));
			} else {
				const user = {
					isAuth: true,
					name: result.user.name,
					email: result.user.email,
					token: result.result,
					role: '',
				};
				dispatch(userCreator.loginSuccess(user));
			}
			return true;
		} else {
			handleErrors(result);
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
