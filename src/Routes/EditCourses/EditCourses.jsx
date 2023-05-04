//components
import Header from '../../components/Header/Header';
import EditCourse from '../../components/EditCourse/EditCourse';

//store
import store from '../../store/services';

const EditCourses = () => {
	const authorized = store.getState().user.role === 'admin';
	return (
		<>
			{authorized ? (
				<>
					<Header show={true} />
					<EditCourse />
				</>
			) : null}
		</>
	);
};

export default EditCourses;
