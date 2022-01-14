import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import logOut from './services/logOut';
import Togglable from './components/Togglable';

const App = () => {
	//All blogs
	const [blogs, setBlogs] = useState([]);
	//user
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	//newBlog
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [author, setAuthor] = useState('');
	//messages
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	//Get all blogs initially
	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	//Cech if userr is logged in initially
	useEffect(() => {
		const loggedInUser = window.localStorage.getItem('user');
		if (loggedInUser) {
			const user = JSON.parse(loggedInUser);
			setUser(user);
		}
	}, []);

	async function handleLogin(e) {
		e.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Wrong username or password');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
			console.log(exception);
		}
	}

	async function handleSubmit(e) {
		try {
			e.preventDefault();
			const newBlog = await blogService.createBlog({
				title,
				author,
				url,
			});

			setSuccessMessage(`New blog ${newBlog.title} was succesfully created`);
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
		} catch (error) {
			setErrorMessage('Something went wrong');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	}

	const loginForm = () => {
		return (
			<div>
				<h2>Log in to application</h2>
				<Togglable buttonLabel='Show Form'>
					<LoginForm
						username={username}
						setUsername={setUsername}
						password={password}
						setPassword={setPassword}
						handleLogin={handleLogin}
					/>
				</Togglable>
				{errorMessage && <h4 style={{ color: 'tomato', border: '2px solid tomato' }}>{errorMessage}</h4>}
			</div>
		);
	};

	if (!user) {
		return loginForm();
	}

	return (
		<div>
			<h2>Blogs</h2>

			{user && <p>{user.username} is logged in.</p>}
			<button onClick={() => logOut(setUser)}>Logout</button>

			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}

			<h2>Create new</h2>

			{successMessage && <h4 style={{ color: 'green', border: '2px solid green' }}>{successMessage}</h4>}

			{
				<BlogForm
					title={title}
					setTitle={setTitle}
					author={author}
					setAuthor={setAuthor}
					setUrl={setUrl}
					url={url}
					handleSubmit={handleSubmit}
				/>
			}
		</div>
	);
};

export default App;
