import React from 'react';

function Persons({ persons, filterString, handleDelete }) {
	const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filterString.toLowerCase()));

	return (
		<div>
			{filteredPersons.map((person) => (
				<p key={person.name}>
					{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button>
				</p>
			))}
		</div>
	);
}

export default Persons;
