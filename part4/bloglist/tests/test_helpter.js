const Blog = require('../models/blog');
const initialBlogs = [
	{
		title: 'Name of the wind',
		author: 'JRR Tolkien',
		url: 'www.http.google.se',
		likes: 13,
	},

	{
		title: 'Gone with the wind',
		author: 'JK Rowlings',
		url: 'www.http.rowling.se',
		likes: 27,
	},
];

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
