import React from 'react';

function BlogForm({ title, author, url, setTitle, setAuthor, setUrl, handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='Title'>Title </label>
			<input type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)} />
			<br />
			<label htmlFor='Author'>Author: </label>
			<input type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} />
			<br />
			<label htmlFor='Url'>Url: </label>
			<input type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} />
			<br />
			<button type='submit'>Create</button>
		</form>
	);
}

export default BlogForm;
