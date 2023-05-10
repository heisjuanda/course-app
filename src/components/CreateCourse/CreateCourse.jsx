import { useState } from 'react';

//components
import Boton from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Paragraph from '../../common/Paragraph/Paragraph';

//constants and helpers
import { mockedAuthorsList, setFrom } from '../../constants';

//thunk
import { saveCourses } from '../../store/courses/thunk';
import { addAuthor } from '../../store/authors/thunk';

//store
import * as courseCreator from '../../store/courses/actionCreators';
import * as authorsCreator from '../../store/authors/actionCreators';
import { useDispatch } from 'react-redux';

//styles
import styles from './CreateCourses.css';

const CreateCourse = () => {
	const dispatch = useDispatch();
	//Course object
	const [newCourse] = useState({});
	const [duration, setDuration] = useState(0);
	const [newTitle, setTitle] = useState('');
	//authors for this course
	const [currentAuthor, setCurrentAuthor] = useState([]);
	const [newDescription, setDescription] = useState('');
	//all authors
	const [courseAuthors, setCourseAuthors] = useState(mockedAuthorsList);

	//set the global author to the new course
	const deleteOldAuthor = (authorId) => {
		currentAuthor.push(courseAuthors.find((author) => author.id === authorId));
		setCourseAuthors(
			courseAuthors.filter((author) => {
				if (author) {
					return author.id !== authorId;
				}
			})
		);
	};

	//set the current author to the global list of authors
	const deleteNewAuthor = (authorId) => {
		courseAuthors.push(currentAuthor.find((author) => author.id === authorId));
		setCurrentAuthor(
			currentAuthor.filter((author) => {
				if (author) {
					return author.id !== authorId;
				}
			})
		);
	};

	//list add new author
	const [addNewAuthors, setAddNewAuthors] = useState([]);

	const isRepeatedName = (name) => {
		for (let author of currentAuthor) {
			if (author.name === name) {
				return true;
			}
		}
		for (let author of courseAuthors) {
			if (author.name === name) {
				return true;
			}
		}
		return false;
	};

	const authorCreator = (authorName) => {
		if (!isRepeatedName(authorName)) {
			const author = {
				name: authorName,
			};
			return author;
		} else {
			alert('Having authors with the same name are not allowed');
		}
	};

	const addNewAutor = async (author) => {
		let newAuthor = await addAuthor(authorCreator(author));
		if (newAuthor.successful) {
			dispatch(authorsCreator.saveAuthor([newAuthor.result]));
			setAddNewAuthors([...addNewAuthors, newAuthor.result]);
			currentAuthor.push(newAuthor.result);
		}
	};

	const handleCreateCourse = () => {
		if (
			newTitle.length > 0 &&
			newDescription.length >= 2 &&
			currentAuthor.length > 0 &&
			duration > 0
		) {
			return true;
		} else {
			return false;
		}
	};

	const setNewAuthorCourse = () => {
		let authorID = [];
		for (let author of currentAuthor) {
			authorID.push(author.id);
		}
		return authorID;
	};

	const finishCreation = async () => {
		newCourse.authors = setNewAuthorCourse();
		newCourse.description = newDescription;
		newCourse.duration = duration;
		newCourse.title = newTitle;
		const response = await saveCourses(newCourse);
		if (response.successful) {
			dispatch(courseCreator.saveCourse([response.result]));
		}
	};

	return (
		<div className='create-container'>
			<header className='create-container__header'>
				<div className='header-title'>
					<div className='header-title__info'>
						<label htmlFor='title'>Title</label>
						<div className='inputs'>
							<Input
								id={'title'}
								type='text'
								placeHold={'Enter title'}
								onChange={(e) => {
									setTitle(e.target.value);
								}}
								required={true}
							/>
						</div>
					</div>
					<div>
						{handleCreateCourse() ? (
							<>
								<Boton
									text={'Create course'}
									onClick={finishCreation}
									linkTo={'/courses'}
								/>
							</>
						) : (
							<>
								<Boton
									text={'Create course'}
									onClick={() => {
										if (newTitle.length <= 0) {
											alert('There must be a title');
										}
										if (newDescription.length < 2) {
											alert('Description has to be longer');
										}
										if (currentAuthor.length === 0) {
											alert('An author is required');
										}
										if (duration === 0) {
											alert('Duration has to be more than zero');
										}
									}}
								/>
							</>
						)}
					</div>
				</div>
				<div className='header-content'>
					<label htmlFor='description'>Description</label>
					<textarea
						placeholder='Enter description'
						name='description'
						id='description'
						required
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					></textarea>
				</div>
			</header>
			<article className='create-container__article'>
				<div className='article-author__information'>
					<div>
						<h2>Add author</h2>
						<label htmlFor='author-name'>Author name</label> <br />
						<div className='inputs'>
							<Input
								id={'author-name'}
								type='text'
								placeHold={'Enter author name'}
								required={true}
							/>
						</div>
						<br />
						<div className='create-authorBton'>
							<Boton
								text={'Create author'}
								onClick={() => {
									addNewAutor(document.getElementById('author-name').value);
								}}
							/>
						</div>
					</div>
					<div>
						<h2>Authors</h2>
						{courseAuthors.map((author, key) => {
							return (
								<div className='author-list' key={key}>
									<h3>{author.name}</h3>
									<div className='boton-author__add'>
										<Boton
											text={'Add author'}
											onClick={() => {
												deleteOldAuthor(author.id);
											}}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className='article-duration__information'>
					<div>
						<h2>Duration</h2>
						<label htmlFor='duration'>Duration</label> <br />
						<div className='inputs'>
							<Input
								id={'duration'}
								type='number'
								placeHold={'Add duration'}
								onChange={(e) => {
									setDuration(parseInt(e.target.value));
								}}
								required={true}
							/>
						</div>
						<Paragraph text={`Duration`} id={duration} textb={'hours'} />
					</div>
					<div>
						<h2>Course authors</h2>
						{currentAuthor.map((author) => {
							if (author) {
								return (
									<div className='author-list' key={author.id}>
										<h3>{author.name}</h3>
										<div className='boton-author__add'>
											<Boton
												text={'Delete author'}
												onClick={() => {
													deleteNewAuthor(author.id);
												}}
											/>
										</div>
									</div>
								);
							}
						})}
					</div>
				</div>
			</article>
			<center>
				<Boton linkTo={'/courses'} text={'Cancel'} />
			</center>
		</div>
	);
};

export default CreateCourse;
