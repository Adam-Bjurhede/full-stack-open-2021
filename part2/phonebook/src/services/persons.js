import axios from 'axios';
const baseUrl = '/api/persons/';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((result) => {
		return result.data;
	});
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.log('failed', error);
		});
};

const remove = (id) => {
	const request = axios.delete(baseUrl + id);
	request
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log('failed', error);
		});
};

const update = (id, newObject) => {
	const request = axios.put(baseUrl + id, newObject);
	return request.then((result) => {
		return result.data;
	});
};

const phonebook = {
	getAll,
	create,
	remove,
	update,
};

export default phonebook;
