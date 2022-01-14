const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function userExtractor(request, response, next) {
	const token = request.token;

	if (token) {
		const decodedToken = jwt.verify(token, process.env.SECRET);

		const user = await User.findById(decodedToken.id);
		request.user = user;
	}

	next();
}

module.exports = userExtractor;
