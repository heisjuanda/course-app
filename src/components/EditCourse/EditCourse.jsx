import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//components
import Boton from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Paragraph from '../../common/Paragraph/Paragraph';

//hepers and constants
import { getHours } from '../../helper/pipeDuration';
import { mockedAuthorsList } from '../../constants';

//thunks
import { updateCourseID } from '../../store/courses/thunk';
import { addAuthor } from '../../store/authors/thunk';

const EditCourse = () => {
	//getting the course object
	const course = useParams();
	//List authors from the course
	const [currentAuthor, setCurrentAuthor] = useState(course.authors.split(','));
	//List of all authors
	const [courseAuthors, setCourseAuthors] = useState(mockedAuthorsList);
	//Course object
	const [newCourse] = useState({});
	const [newDuration, setDuration] = useState(getHours(course.duration));
	const [newTitle, setTitle] = useState(course.title);
	const [newDescription, setDescription] = useState(course.description);

	//deletes an author from course to add them into all author list
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

	//from global authors to course authors
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
		if (newAuthor) {
			setAddNewAuthors([...addNewAuthors, newAuthor]);
			currentAuthor.push(newAuthor);
		}
	};

	const handleUpdateCourse = () => {
		if (
			newTitle.length > 0 &&
			newDescription.length >= 2 &&
			currentAuthor.length > 0 &&
			newDuration > 0
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

	function update() {
		let authorsIDs = currentAuthor.map((author) => {
			return author.id;
		});
		course.title = newTitle;
		course.duration = newDuration;
		course.description = newDescription;
		course.authors = authorsIDs;
	}

	const finishEdit = async () => {
		newCourse.authors = setNewAuthorCourse();
		newCourse.description = newDescription;
		newCourse.duration = newDuration;
		newCourse.title = newTitle;
		await updateCourseID(course.id, newCourse);
		update();
	};

	//removes authors associated with the current course from the global list
	useEffect(() => {
		const checkAuthors = () => {
			let currentAuthors = course.authors.split(',');
			let result = courseAuthors;
			currentAuthors.forEach((id) => {
				result = result.filter((el) => {
					return id !== el.id;
				});
			});
			setCourseAuthors(result);
		};
		const checkAuthorCurrent = () => {
			let authors = [];
			currentAuthor.forEach((id) => {
				const author = {};
				mockedAuthorsList.forEach((el) => {
					if (id === el.id) {
						author.id = el.id;
						author.name = el.name;
						return;
					}
				});
				if (author.id) {
					authors.push(author);
				}
			});
			setCurrentAuthor(authors);
		};
		checkAuthors();
		checkAuthorCurrent();
	}, []);

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
								placeHold={course.title}
								value={newTitle}
								onChange={(e) => {
									setTitle(e.target.value);
								}}
								required={true}
							/>
						</div>
					</div>
					<div>
						{handleUpdateCourse() ? (
							<>
								<Boton
									text={'Update Course'}
									onClick={finishEdit}
									linkTo={'/courses'}
								/>
							</>
						) : (
							<>
								<Boton
									text={'Update Course'}
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
										if (newDuration === 0) {
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
						placeholder={course.description}
						name='description'
						id='description'
						required
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					>
						{newDescription}
					</textarea>
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
						{courseAuthors.map((author) => {
							return (
								<div className='author-list'>
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
								type={'number'}
								placeHold={course.duration}
								value={newDuration}
								onChange={(e) => {
									setDuration(parseInt(e.target.value));
								}}
								required={true}
							/>
						</div>
						<Paragraph text={`Duration`} id={newDuration} textb={'hours'} />
					</div>
					<div>
						<h2>Course authors</h2>
						{currentAuthor.map((author) => {
							if (author) {
								return (
									<div className='author-list'>
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

export default EditCourse;
