import React, { useEffect, useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebook from './services/persons';
import Notification from './components/Notification';

const App = () => {
	useEffect(() => {
		phonebook.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterString, setFilterString] = useState('');
	const [statusMessage, setStatusMessage] = useState({ message: null, error: false });

	const handleSubmit = (e) => {
		e.preventDefault();

		const personObject = {
			name: newName,
			number: newNumber,
		};

		const personExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());

		if (personExists) {
			if (
				window.confirm(
					`${personExists.name} is already added to phonebook, replace the old number with the new one?`
				)
			) {
				phonebook
					.update(personExists.id, personObject)
					.then((result) => {
						setPersons(persons.map((person) => (person.id !== personExists.id ? person : result)));
						setStatusMessage({
							message: `${personExists.name}'s number was succesfully updated`,
							error: false,
						});
					})
					.catch((error) => {
						console.log(error);
						if (error.response.status === 404) {
							setPersons(persons.filter((person) => person.id !== personExists.id));
						}
						setStatusMessage({ message: error.response.data.error, error: true });
						setTimeout(() => {
							setStatusMessage({ message: null, error: null });
						}, 5000);
					});

				setTimeout(() => {
					setStatusMessage({ message: null, error: null });
				}, 5000);
			}
		} else {
			phonebook
				.create(personObject)
				.then((result) => {
					setPersons(persons.concat(result));
					setStatusMessage({ message: `${result.name} was succesfully added to phonebook`, error: false });
					setTimeout(() => {
						setStatusMessage({ message: null, error: null });
					}, 5000);
				})
				.catch((error) => {
					console.log(error);
					setStatusMessage({ message: error.response.data.error, error: true });
					setTimeout(() => {
						setStatusMessage({ message: null, error: null });
					}, 5000);
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
			<Notification message={statusMessage.message} error={statusMessage.error} />
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
