import React from 'react';

function DisplayOneCountry({ country }) {
	return (
		<div key={country.numericCode}>
			<h1>{country.name}</h1>
			<p>{country.capital}</p>
			<p>{country.population}</p>

			<h2>Languages</h2>
			<ul>
				{country.languages.map((language) => (
					<li key={language['iso639_1']}>{language.name}</li>
				))}
			</ul>

			<img src={country.flag} alt={`${country.name}´s flag`} style={{ width: '50px' }} />
		</div>
	);
}

export default DisplayOneCountry;
