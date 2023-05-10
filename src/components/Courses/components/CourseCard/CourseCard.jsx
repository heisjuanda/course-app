//components
import Boton from '../../../../common/Button/Button';

//store
import { useSelector } from 'react-redux';
//thunks
import { deleteCourses } from '../../../../store/courses/thunk';

//constants and helper files
import {
	deleteMockedCourseList,
	mockedCoursesList,
} from '../../../../constants';

//styles
import styles from './CourseCard.css';

const CourseCard = ({
	id,
	name,
	description,
	authors,
	authorsID,
	duration,
	created,
	text,
	update,
	cursos,
}) => {
	const role = useSelector((state) => state.user.role);
	const handleDeleteCourse = () => {
		deleteCourses(id);
		deleteMockedCourseList(id);
		//updates the course list when it changes
		cursos(mockedCoursesList);
		update((v) => v - 1);
	};
	return (
		<div className='course-card--container' data-testid='course-cards'>
			<div className='course-card--container__about-course'>
				<h1>{name}</h1>
				<p>{description}</p>
			</div>
			<div className='course-card--container__info-course'>
				<div>
					<h2>Authors:</h2>
					<p>{authors}</p>
				</div>
				<div>
					<h2>Duration:</h2>
					<p>{duration} hours</p>
				</div>
				<div>
					<h2>Created:</h2>
					<p>{created}</p>
				</div>
				<div className='buttons'>
					<div>
						<Boton
							text={text}
							linkTo={`/courses/info/${name}/${id}/${description}/${created}/${authors}/${duration}`}
						/>
					</div>
					{role === 'admin' ? (
						<div>
							<Boton
								text={'🖊'}
								linkTo={`/courses/edit/${name}/${id}/${description}/${created}/${authorsID}/${duration}`}
							/>
							<Boton text={'🗑'} onClick={handleDeleteCourse} />
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
