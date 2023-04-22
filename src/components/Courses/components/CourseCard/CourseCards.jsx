import CourseCard from './CourseCard';

import getAuthors from '../../../../helper/authorByTtitle';
import getHours from '../../../../helper/getHours';

const CourseCards = ({ courses }) => {
	return (
		<>
			{courses.map((co) => {
				if (co) {
					let autor = getAuthors(co.title).join(', ');
					return (
						<CourseCard
							key={co.id}
							id={co.id}
							name={co.title}
							description={co.description}
							authors={autor}
							duration={getHours(co)}
							created={co.creationDate.split('/').join('.')}
							text={'View Course'}
						/>
					);
				}
			})}
		</>
	);
};

export default CourseCards;
