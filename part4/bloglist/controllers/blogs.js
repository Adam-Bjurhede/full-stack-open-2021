const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user');
        response.json(blogs.map((blog) => blog.toJSON()));
    } catch (error) {
        next(error);
    }
});

blogsRouter.post('/', async (request, response, next) => {
    try {
        const token = request.token;
        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (!decodedToken) {
            const customError = new Error('Token missing or invalid');
            customError.name = 'customError';
            throw customError;
        }

        const body = request.body;

        if (!body.title || !body.url) {
            return response.status(400).end();
        }

        const user = request.user;

        const blog = new Blog({
            title: body.title,
            likes: body.likes,
            author: body.author,
            url: body.url,
            user: user._id,
        });

        const blogToSave = await blog.save();

        user.blogs = user.blogs.concat(blogToSave._id);
        await user.save();
        response.status(201).json(blogToSave);
    } catch (error) {
        next(error);
    }
});

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const token = request.token;
        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (!decodedToken) {
            const customError = new Error('Token missing or invalid');
            customError.name = 'customError';
            throw customError;
        }

        const id = request.params.id;

        const user = request.user;

        const blog = await Blog.findById(id);

        console.log(blog);

        if (!blog) {
            return response.status(400).json({
                error: 'No Blog',
            });
        }

        if (blog.user.toString() === user._id.toString()) {
            await Blog.findByIdAndRemove(id);
            response.status(204).end();
        } else {
            response.status(400).json({
                error: 'Not Allowed',
            });
        }
    } catch (error) {
        next(error);
    }
});

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const body = request.body;

        const note = {
            likes: body.likes,
        };

        const updatedBlog = await Blog.findByIdAndUpdate(id, note, { new: true });
        response.json(updatedBlog);
    } catch (error) {
        next(error);
    }
});

module.exports = blogsRouter;
