import { Link } from 'react-router-dom';

import setHours from '../../helper/pipeDuration';

const Paragraph = ({ text, id, textb, route, url }) => {
	return route ? (
		<p>
			{text}{' '}
			<span>
				<Link to={url}>{textb}</Link>
			</span>
		</p>
	) : (
		<p>
			{text} {setHours(id)} {textb}
		</p>
	);
};

export default Paragraph;
