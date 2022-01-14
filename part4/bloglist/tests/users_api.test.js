const User = require('../models/user');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const bcrypt = require('bcrypt');

describe('Users', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('secretPassword', 10);
		const user = new User({ username: 'testUser', name: 'hallo', passwordHash });
		await user.save();
	});

	it('It returns statuscode 400 if credentials is invalid', async () => {
		const newUser = {
			name: 'Adam',
			password: 'pw',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);
	});

	it('It returns error: "Password must be at least 3 characters" if password is to short', async () => {
		const newUser = {
			username: 'Adam123',
			name: 'Adam',
			password: 'pw',
		};

		const response = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(response.body.error).toBe('Password must be at least 3 characters');
	});

	it('Number of users has not changed in DB when fails', async () => {
		const usersInDbBefore = await helper.usersInDb();

		const newUser = {
			username: 'Adam123',
			name: 'Adam',
			password: 'pw',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const usersInDbAfter = await helper.usersInDb();
		expect(usersInDbBefore.length).toBe(usersInDbAfter.length);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
