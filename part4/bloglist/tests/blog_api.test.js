const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

it('blogs are returned as json', async (done) => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
	done();
});

afterAll(() => {
	mongoose.connection.close();
});
