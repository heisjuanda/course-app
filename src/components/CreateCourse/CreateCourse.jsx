import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Boton from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Paragraph from '../../common/Paragraph/Paragraph';

import getDate from '../../helper/getDate';
import { mockedAuthorsList, mockedCoursesList, setFrom } from '../../constants';

import { v4 as uuidv4 } from 'uuid';

import store from '../../store/services';
//courses
import * as coursesCreator from '../../store/courses/actionCreators';
//authors
import * as authorsCreator from '../../store/authors/actionCreators';

//styles
import styles from './CreateCourses.css';

const CreateCourse = () => {
	const Dispatch = useDispatch();
	//Course object
	const [newCourse, setNewCourse] = useState({});
	const [duration, setDuration] = useState(0);
	const [newTitle, setTitle] = useState('');
	//List authors
	const [currentAuthor, setCurrentAuthor] = useState([]);
	const [newDescription, setDescription] = useState('');
	//add existin author
	const [courseAuthors, setCourseAuthors] = useState(mockedAuthorsList);
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
	//list author
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
	const authorCreator = (authorName) => {
		let identifier = uuidv4();
		//identifier = setIds(mockedAuthorsList, identifier);
		const author = {
			id: identifier,
			name: authorName,
		};
		setAddNewAuthors([...addNewAuthors, author]);
		return author;
	};
	const addNewAutor = (author) => {
		currentAuthor.push(authorCreator(author));
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

	const setIds = (arr, id) => {
		if (arr.length > 0) {
			arr.forEach((el) => {
				while (el.id === id) {
					id = uuidv4();
				}
			});
		}
		return id;
	};

	const terminar = () => {
		newCourse.authors = setNewAuthorCourse();
		newCourse.creationDate = getDate();
		newCourse.description = newDescription;
		newCourse.duration = duration;
		let id = uuidv4();
		newCourse.id = `${setIds(mockedCoursesList, id)}`;
		newCourse.title = newTitle;
		/*
		mockedCoursesList.push(newCourse);
		setNewAuthorArray();
		//console.log('addnewAuthors', addNewAuthors);
		//console.log('newCourse', newCourse);
		//Dispatch(coursesCreator.saveCourse([newCourse]));
		*/
		store.dispatch(coursesCreator.saveCourse([newCourse]));
		if (addNewAuthors.length > 0) {
			store.dispatch(authorsCreator.saveAuthor(addNewAuthors));
		}
		setFrom(true);
		console.log('create course');
		console.log(store.getState());
	};

	return (
		<div className='create-container'>
			<header className='create-container__header'>
				<div className='header-title'>
					<div className='header-title__info'>
						<label htmlFor='title'>Title</label>
						<div className='inputs'>
							<Input
								i={'title'}
								typ='text'
								placeHold={'Enter title'}
								onChange={(e) => {
									setTitle(e.target.value);
								}}
							/>
						</div>
					</div>
					<div>
						{handleCreateCourse() ? (
							<>
								<Boton
									text={'Create course'}
									onClick={terminar}
									linkTo={'/courses'}
								/>
							</>
						) : (
							<>
								<Boton
									text={'Create course'}
									onClick={() => {
										alert('You must fill out the form to create a course');
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
								i={'author-name'}
								typ='text'
								placeHold={'Enter author name'}
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
						{courseAuthors.map((el) => {
							return (
								<div className='author-list'>
									<h3>{el.name}</h3>
									<div className='boton-author__add'>
										<Boton
											text={'Add author'}
											onClick={() => {
												deleteOldAuthor(el.id);
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
								i={'duration'}
								typ='number'
								placeHold={'Add duration'}
								onChange={(e) => {
									setDuration(parseInt(e.target.value));
								}}
							/>
						</div>
						<Paragraph text={`Duration`} id={duration} textb={'hours'} />
					</div>
					<div>
						<h2>Course authors</h2>
						{currentAuthor.map((el) => {
							if (el) {
								return (
									<div className='author-list'>
										<h3>{el.name}</h3>
										<div className='boton-author__add'>
											<Boton
												text={'Delete author'}
												onClick={() => {
													deleteNewAuthor(el.id);
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
	/*return finishCreation ? (
		<div className='create-container'>
			<header className='create-container__header'>
				<div className='header-title'>
					<div className='header-title__info'>
						<label htmlFor='title'>Title</label>
						<div className='inputs'>
							<Input
								i={'title'}
								typ='text'
								placeHold={'Enter title'}
								onChange={(e) => {
									setTitle(e.target.value);
								}}
							/>
						</div>
					</div>
					<div>
						{handleCreateCourse() ? (
							<>
								<Boton
									text={'Create course'}
									onClick={() => {
										setFinishCreation(false);
										console.log(finishCreation);
									}}
								/>
							</>
						) : (
							<>
								<Boton text={'Fill out the form'} />
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
								i={'author-name'}
								typ='text'
								placeHold={'Enter author name'}
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
						{courseAuthors.map((el) => {
							return (
								<div className='author-list'>
									<h3>{el.name}</h3>
									<div className='boton-author__add'>
										<Boton
											text={'Add author'}
											onClick={() => {
												deleteOldAuthor(el.id);
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
								i={'duration'}
								typ='number'
								placeHold={'Add duration'}
								onChange={(e) => {
									setDuration(parseInt(e.target.value));
								}}
							/>
						</div>
						<Paragraph text={`Duration`} id={duration} textb={'hours'} />
					</div>
					<div>
						<h2>Course authors</h2>
						{currentAuthor.map((el) => {
							if (el) {
								return (
									<div className='author-list'>
										<h3>{el.name}</h3>
										<div className='boton-author__add'>
											<Boton
												text={'Delete author'}
												onClick={() => {
													deleteNewAuthor(el.id);
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
		</div>
	) : null;*/
};

export default CreateCourse;
