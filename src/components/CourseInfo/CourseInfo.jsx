import { useParams } from 'react-router-dom';

//components
import Boton from '../../common/Button/Button';

//styles
import styles from './CourseInfo.css';

const CourseInfo = () => {
	const course = useParams();

	return (
		<div className='course-info--container'>
			<div className='container__leave'>
				<Boton text={'< Back to course'} linkTo={'/courses'} />
			</div>
			<div>
				<h1>{course.title}</h1>
			</div>
			<div className='course-info--container__content'>
				<div>{course.description}</div>
				<div className='container__content--details'>
					<div>
						<h2>ID: </h2>
						<p>{course.id}</p>
					</div>
					<div>
						<h2>Duration:</h2>
						<p>{course.duration} hours</p>
					</div>
					<div>
						<h2>Created:</h2>
						<p>{course.created}</p>
					</div>
					<div>
						<h2>Authors:</h2>
						<div className='details-authors'>
							<p>{course.authors}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;
