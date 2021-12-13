const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const { deleteOne } = require('../models/blog');

const api = supertest(app);

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

afterAll((done) => {
	mongoose.connection.close();
	done();
});
