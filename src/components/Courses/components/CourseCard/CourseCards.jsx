import CourseCard from './CourseCard';

import getAuthors from '../../../../helper/authorByTtitle';
import getHours from '../../../../helper/getHours';

const CourseCards = ({ courses, update, cursos }) => {
	return (
		<>
			{courses.map((course) => {
				if (course) {
					let autor = getAuthors(course.title).join(', ');
					let authorID = course.authors;
					let creationDate = course.creationDate.includes('.')
						? course.creationDate
						: course.creationDate.split('/').join('.');
					return (
						<CourseCard
							key={course.id}
							id={course.id}
							name={course.title}
							description={course.description}
							authors={autor}
							authorsID={authorID}
							duration={getHours(course)}
							created={creationDate}
							text={'View Course'}
							update={update}
							cursos={cursos}
						/>
					);
				}
			})}
		</>
	);
};

export default CourseCards;
