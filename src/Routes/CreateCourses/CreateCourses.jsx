//components
import Header from '../../components/Header/Header';
import CreateCourse from '../../components/CreateCourse/CreateCourse';

//store
import store from '../../store/services';

const CreateCourses = () => {
	const authorized = store.getState().user.role === 'admin';
	return (
		<>
			{authorized ? (
				<>
					<Header show={true} />
					<CreateCourse />
				</>
			) : null}
		</>
	);
};

export default CreateCourses;
