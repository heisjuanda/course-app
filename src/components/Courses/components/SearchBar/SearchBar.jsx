//components
import Boton from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

//constants and helper files
import { addingCourse, setAddingCourse } from '../../../../constants';

//store
import store from '../../../../store/services';

//styles
import styles from './SearchBar.css';

const SearchBar = ({ searcher, idBton, createCourse }) => {
	return (
		<div className='search-container'>
			<label htmlFor='search'></label>
			<Input
				id={'search'}
				type='text'
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
			{store.getState().user.role === 'admin' ? (
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
