const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
	const body = request.body;

	if (!body.title || !body.url) {
		return response.status(400).end();
	}

	const blog = new Blog({
		title: body.title,
		likes: body.likes,
		author: body.author,
		url: body.url,
	});

	try {
		const blogToSave = await blog.save();
		response.status(201).json(blogToSave);
	} catch (error) {
		next(error);
	}
});

blogsRouter.delete('/:id', async (request, response) => {
	const id = request.params.id;
	console.log(id);

	await Blog.findByIdAndRemove(id);

	response.status(204).end();
});

blogsRouter.put('/:id', async (request, response, next) => {
	const id = request.params.id;
	const body = request.body;

	const note = {
		likes: body.likes,
	};

	try {
		const updatedBlog = await Blog.findByIdAndUpdate(id, note, { new: true });
		response.json(updatedBlog);
	} catch (error) {
		next(error);
	}
});

module.exports = blogsRouter;
