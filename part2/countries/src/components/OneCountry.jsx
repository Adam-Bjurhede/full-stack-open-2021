import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OneCountry({ country }) {
	const [weatherData, setweatherData] = useState();
	const [weatherMessage, setWeatherMessage] = useState('');

	const temp = weatherData && weatherData.main.temp;
	const wind = weatherData && weatherData.wind.speed;
	const weatherIcon = weatherData && weatherData.weather[0].icon;

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
			)
			.then((result) => {
				setweatherData(result.data);
			})
			.catch((err) => {
				console.log(err);
				setWeatherMessage('Could not get weather info');
			});
	}, [country.capital]);

	console.log(weatherData);
	return (
		<div key={country.numericCode}>
			<h1>{country.name}</h1>
			<p>{country.capital}</p>
			<p>{country.population}</p>

			<h2>Languages</h2>
			<ul>
				{country.languages.map((language) => (
					<li key={language.name}>{language.name}</li>
				))}
			</ul>

			<img src={country.flag} alt={`${country.name}´s flag`} style={{ width: '50px' }} />

			<h2>Weather in {country.name}</h2>

			{weatherMessage}

			<p>
				<b>Temperature</b>: {temp} Celcius
			</p>
			{weatherData && <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt='' />}
			<p>
				<b>Wind</b>: {wind}
			</p>
		</div>
	);
}

export default OneCountry;
