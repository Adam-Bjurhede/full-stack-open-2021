import React from 'react';

function Message({ numberOfCountries }) {
	if (numberOfCountries > 10) {
		return <p>To many matches, specify another filter</p>;
	} else if (numberOfCountries === 0) {
		return <p>No country with that name was found</p>;
	} else return '';
}

export default Message;
