import React from 'react';
import OneCountry from './OneCountry';

function Countries({ filteredCountries, handleClick }) {
	return filteredCountries.length !== 1 ? (
		filteredCountries.map((country) => {
			return (
				<div>
					<h2>{country.name}</h2>
					<button onClick={() => handleClick(country)}>Show</button>
				</div>
			);
		})
	) : (
		<OneCountry country={filteredCountries[0]} />
	);
}

export default Countries;
