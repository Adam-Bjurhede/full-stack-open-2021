import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	//Fetch inital data
	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((result) => {
			setPersons(result.data);
		});
	}, []);

	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterString, setFilterString] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const personExists = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase());

		if (personExists) {
			return alert(`Person ${newName} already exist in phonebook`);
		}

		const newPerson = {
			name: newName,
			number: newNumber,
		};

		setPersons(persons.concat(newPerson));
		setNewName('');
		setNewNumber('');
	};

	const handleNameChange = (e) => setNewName(e.target.value);

	const handleNumberChange = (e) => setNewNumber(e.target.value);

	const handleFilterChange = (e) => setFilterString(e.target.value);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handleChange={handleFilterChange} filterString={filterString} />

			<h3>Add a New</h3>
			<PersonForm
				handleSubmit={handleSubmit}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newName={newName}
				newNumber={newNumber}
			/>

			<h2>Numbers</h2>
			<Persons persons={persons} filterString={filterString} />
		</div>
	);
};

export default App;
