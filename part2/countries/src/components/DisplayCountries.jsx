import React from 'react';

function DisplayCountries({ filteredCountries, handleClick }) {
	return filteredCountries.length <= 10 ? (
		filteredCountries.map((country) => {
			return (
				<div>
					<h2>{country.name}</h2>
					<button onClick={() => handleClick(country)}>Show</button>
				</div>
			);
		})
	) : (
		<p>To many, specify another filter</p>
	);
}

export default DisplayCountries;
