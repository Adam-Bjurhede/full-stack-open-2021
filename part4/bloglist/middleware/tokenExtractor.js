const { getTokenFrom } = require('../utils/api_helpers');

function tokenExtractor(request, response, next) {
	const token = getTokenFrom(request);

	request.token = token;

	next();
}

module.exports = tokenExtractor;
