import React from 'react';

function Persons({ persons, filterString }) {
	const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filterString.toLowerCase()));

	return (
		<div>
			{filteredPersons.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
}

export default Persons;
