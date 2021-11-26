import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import DisplayCountries from './components/DisplayCountries';
import DisplayOneCountry from './components/DisplayOneCountry';

function App() {
	const [search, setSearch] = useState('');
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);

	useEffect(() => {
		axios
			.get('https://restcountries.com/v2/all')
			.then((result) => {
				console.log(result.data);
				setCountries(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		setFilteredCountries(countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase())));
	}, [search, countries]);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleClick = (country) => {
		setFilteredCountries([country]);
	};
	return (
		<div>
			<SearchInput handleChange={handleChange} search={search} />

			{filteredCountries.length !== 1 ? (
				<DisplayCountries search={search} filteredCountries={filteredCountries} handleClick={handleClick} />
			) : (
				<DisplayOneCountry country={filteredCountries[0]} />
			)}
		</div>
	);
}

export default App;
