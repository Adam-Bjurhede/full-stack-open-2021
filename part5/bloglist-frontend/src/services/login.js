import axios from 'axios';

const baseUrl = '/api/login';

async function login(credentials) {
    try {
        const response = await axios.post(baseUrl, credentials);

        window.localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } catch (exception) {
        console.log(exception);
    }
}

const loginService = {
    login,
};

export default loginService;
