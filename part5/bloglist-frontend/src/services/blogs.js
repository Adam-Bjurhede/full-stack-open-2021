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
async function updateBlog(newBlog, id) {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.put(`${baseUrl}/${id}`, newBlog, config);
    return response.data;
}
async function deleteBlog(id) {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(`${baseUrl}/${id}`, config);
    console.log(response);
}

const blogService = {
    getAll,
    createBlog,
    setToken,
    deleteBlog,
    updateBlog,
};

export default blogService;
