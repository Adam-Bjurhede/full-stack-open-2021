import React, { useState, useEffect, useRef } from 'react';
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
    const blogFormRef = useRef();
    //user
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //newBlog

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
            blogService.setToken(user.token);

            setUser(user);
        }
    }, []);

    const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

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

    async function addBlog(blogObject) {
        try {
            blogFormRef.current.toggleVisibility();
            const newBlog = await blogService.createBlog(blogObject);
            setBlogs([...blogs, newBlog]);
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

    async function deleteBlog(id) {
        try {
            if (window.confirm('Do you realy want to delete this blog?')) {
                await blogService.deleteBlog(id);

                setBlogs([...blogs.filter((blog) => blog.id !== id)]);
            }
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

    const blogForm = () => {
        return (
            <div>
                <h2>Create new</h2>

                {successMessage && <h4 style={{ color: 'green', border: '2px solid green' }}>{successMessage}</h4>}

                {
                    <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
                        <BlogForm createBlog={addBlog} />
                    </Togglable>
                }
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
            {sortedBlogs.map((blog) => (
                <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
            ))}
            {blogForm()}
        </div>
    );
};

export default App;
