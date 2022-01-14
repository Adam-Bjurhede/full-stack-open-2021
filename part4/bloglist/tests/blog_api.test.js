const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

beforeAll(async () => {
	await User.deleteMany({});

	const user = {
		username: 'Adam',
		name: 'Adam B',
		password: 'pwd123',
	};

	await api.post('/api/users').send(user);
});

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
});

describe('When fetching blogs', () => {
	it('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	it('Returns correct amount of blog posts', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	it('Unique identifier === "id" ', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body[0].id).toBeDefined();
	});
});

describe('When creating blogs', () => {
	beforeEach(async () => {
		token = '';
		const userCredentials = {
			username: 'Adam',
			password: 'pwd123',
		};

		const logIn = await api
			.post('/api/login')
			.send(userCredentials)
			.expect('Content-Type', /application\/json/);

		token = logIn.body.token;
	});

	it('Creates a new blog post', async () => {
		const newBlog = {
			title: 'Test Blog',
			author: 'Testarn',
			url: 'www.testy.com',
			likes: 1337,
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set({ Authorization: `bearer ${token}` })
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		const titles = blogsAtEnd.map((blog) => blog.title);

		expect(titles).toContain(helper.initialBlogs[0].title);
	});

	it('Likes defaults to 0 if not specified', async () => {
		const newBlog = {
			title: 'Test Blog',
			author: 'Testarn',
			url: 'www.testy.com',
		};

		await api
			.post('/api/blogs')
			.set({ Authorization: `bearer ${token}` })
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd.at(-1).likes).toBe(0);
	});

	it('Responds with 400 bad reaquest if title or url is missng', async () => {
		const newBlog = {
			author: 'Testarn',
			likes: 125,
		};

		await api
			.post('/api/blogs')
			.set({ Authorization: `bearer ${token}` })
			.send(newBlog)
			.expect(400);
	});
	it('Responds with 401 Unauthorized if token is not provided', async () => {
		const newBlog = {
			author: 'Testarn',
			likes: 125,
		};

		await api.post('/api/blogs').send(newBlog).expect(401);
	});
});

describe('When deleting blogs', () => {
	beforeEach(async () => {
		token = '';
		deleteId = '';
		const userCredentials = {
			username: 'Adam',
			password: 'pwd123',
		};

		const logIn = await api
			.post('/api/login')
			.send(userCredentials)
			.expect('Content-Type', /application\/json/);

		token = logIn.body.token;

		const deleteThisBlog = {
			title: 'Lord of the codes',
			author: 'Mark',
			url: 'www.mark.se',
			likes: 42,
		};

		const newBlog = await api
			.post('/api/blogs')
			.send(deleteThisBlog)
			.set({ Authorization: `bearer ${token}` })
			.expect(201);

		deleteId = newBlog.body.id;
	});
	it('One blog is deleted', async () => {
		const blogsAtStart = await helper.blogsInDb();

		await api
			.delete(`/api/blogs/${deleteId}`)
			.set({ Authorization: `bearer ${token}` })
			.expect(204);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

		const titles = blogsAtEnd.map((blog) => blog.title);

		expect(titles).not.toContain(blogsAtStart[0]);
	});
});

describe('Update blog', () => {
	it('updated single blogpost', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToUpdate = blogsAtStart[0];
		const testUpdate = {
			likes: 999,
		};
		await api.put(`/api/blogs/${blogToUpdate.id}`).send(testUpdate);
		const blogsAtEnd = await helper.blogsInDb();
		const updatedBlog = blogsAtEnd[0];
		expect(updatedBlog.likes).toBe(999);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
