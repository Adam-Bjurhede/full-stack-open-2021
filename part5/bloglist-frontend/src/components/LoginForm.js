import React from 'react';

import PropTypes from 'prop-types';

function LoginForm({ username, setUsername, password, setPassword, handleLogin }) {
    return (
        <form onSubmit={handleLogin}>
            <label htmlFor='Username'>Username: </label>
            <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
            <br />
            <label htmlFor='Password'>Password: </label>
            <input
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
            />
            <button type='submit'>Login</button>
        </form>
    );
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};

export default LoginForm;
