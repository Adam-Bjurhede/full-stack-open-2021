import React from 'react';

function SearchInput({ handleChange, search }) {
	return (
		<>
			find countries: <input type='text' value={search} onChange={handleChange} />
		</>
	);
}

export default SearchInput;
