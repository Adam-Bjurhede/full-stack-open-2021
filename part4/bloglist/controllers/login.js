const loginRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body;

		const user = await User.findOne({ username: body.username });

		const validPassword = user === null ? false : await bcrypt.compare(body.password, user.passwordHash);

		if (!(user && validPassword)) {
			const customError = new Error('invalid username or password');
			customError.name = 'customError';
			throw customError;
		}

		const tokenUserCredentials = {
			username: user.username,
			id: user._id,
		};

		const token = jwt.sign(tokenUserCredentials, process.env.SECRET);

		response.status(200).json({ token, username: user.username, name: user.name });
	} catch (error) {
		next(error);
	}
});

module.exports = loginRouter;
