import React, { useState } from 'react';

function BlogForm({ createBlog }) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');

    function addBlog(e) {
        e.preventDefault();
        createBlog({
            title,
            url,
            author,
        });
        setTitle('');
        setAuthor('');
        setUrl('');
    }

    return (
        <form onSubmit={addBlog}>
            <label htmlFor='Title'>Title </label>
            <input
                id='title'
                type='text'
                value={title}
                name='Title'
                onChange={({ target }) => setTitle(target.value)}
            />
            <br />
            <label htmlFor='Author'>Author: </label>
            <input
                id='author'
                type='text'
                value={author}
                name='Author'
                onChange={({ target }) => setAuthor(target.value)}
            />
            <br />
            <label htmlFor='Url'>Url: </label>
            <input id='url' type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} />
            <br />
            <button id='createBlogBtn' type='submit'>
                Create
            </button>
        </form>
    );
}

export default BlogForm;
