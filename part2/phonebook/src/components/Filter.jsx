import React from 'react';

function Filter({ handleChange, fiterString }) {
	return (
		<div>
			Filter shown with: <input type='text' value={fiterString} onChange={handleChange} />
		</div>
	);
}

export default Filter;
