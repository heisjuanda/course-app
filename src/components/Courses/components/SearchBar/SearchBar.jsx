import Boton from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

import isEmpty from '../../../../helper/isEmpty';
import { addingCourse, setAddingCourse } from '../../../../constants';

//styles
import styles from './SearchBar.css';

const SearchBar = ({ searcher, idBton, foundedElements, createCourse }) => {
	return (
		<div className='search-container'>
			<label htmlFor='search'></label>
			<Input
				i={'search'}
				typ='text'
				placeHold={'Enter course name...'}
				onChange={(e) => {
					if (e.target.value.length === 0) {
						searcher(document.getElementById('search').value);
					}
				}}
			/>
			<Boton
				text={'Search'}
				id={idBton}
				onClick={() => {
					searcher(document.getElementById('search').value);
				}}
			/>
			{isEmpty(foundedElements) ? (
				<Boton
					text={'Add course'}
					key={'addCourse'}
					onClick={() => {
						createCourse();
						setAddingCourse(!addingCourse);
					}}
					linkTo={'/courses/add'}
				/>
			) : null}
		</div>
	);
};

export default SearchBar;
