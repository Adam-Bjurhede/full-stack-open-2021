import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

function setToken(newToken) {
	token = `bearer ${newToken}`;
}

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

async function createBlog(newBlog) {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newBlog, config);
	return response.data;
}

const blogService = {
	getAll,
	createBlog,
	setToken,
};

export default blogService;