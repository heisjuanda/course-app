import setHours from '../../helper/pipeDuration';

const Paragraph = ({ text, id, textb }) => {
	return (
		<p>
			{text} {setHours(id)} {textb}
		</p>
	);
};

export default Paragraph;
