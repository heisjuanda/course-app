//import information from '../../../../constants';
import Boton from '../../../../common/Button/Button';

//styles
import styles from './CourseCard.css';

const CourseCard = ({
	id,
	name,
	description,
	authors,
	duration,
	created,
	text,
}) => {
	return (
		<div className='course-card--container'>
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
					<p>{duration} horas</p>
				</div>
				<div>
					<h2>Created:</h2>
					<p>{created}</p>
				</div>
				<div>
					<Boton
						text={text}
						linkTo={`/courses/info/${name}/${id}/${description}/${created}/${authors}/${duration}`}
					/>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
