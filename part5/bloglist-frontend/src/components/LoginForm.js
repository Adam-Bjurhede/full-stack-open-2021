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

export default LoginForm;
