const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
	const usersInDatabase = await User.find({}).populate('blogs');
	response.json(usersInDatabase);
});

usersRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body;
		if (!body.password || body.password.length < 3) {
			const customError = new Error('Password must be at least 3 characters');
			customError.name = 'customError';
			throw customError;
		}

		const saltRounds = 10;

		const passwordHash = await bcrypt.hash(body.password, saltRounds);

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
		});

		const savedUser = await user.save();

		response.json(savedUser);
	} catch (error) {
		next(error);
	}
});

module.exports = usersRouter;
