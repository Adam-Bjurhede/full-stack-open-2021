function logOut(setUser) {
	window.localStorage.removeItem('user');
	setUser(null);
}

export default logOut;
