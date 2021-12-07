import React, { useEffect, useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebook from './services/persons';

const App = () => {
	//Fetch inital data

	useEffect(() => {
		phonebook.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterString, setFilterString] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const newPerson = {
			name: newName,
			number: newNumber,
		};

		const personExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());

		if (personExists) {
			if (
				window.confirm(`${personExists.name} is already added to phonebook, replace the old number with the new one?`)
			) {
				phonebook.update(personExists.id, newPerson).then((result) => {
					return setPersons(persons.map((person) => (person.id !== personExists.id ? person : result)));
				});
			}
		} else {
			phonebook.create(newPerson).then((result) => {
				setPersons(persons.concat(result));
			});
		}

		setNewName('');
		setNewNumber('');
	};

	const handleNameChange = (e) => setNewName(e.target.value);

	const handleNumberChange = (e) => setNewNumber(e.target.value);

	const handleFilterChange = (e) => setFilterString(e.target.value);

	const handleDelete = (personId) => {
		if (window.confirm('Are you sure you wish to delete this person from phonebook?')) {
			phonebook.remove(personId);
			setPersons(persons.filter((person) => person.id !== personId));
		}
		return;
	};

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
			<Persons persons={persons} filterString={filterString} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
