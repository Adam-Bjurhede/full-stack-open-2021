import React from 'react';

function PersonForm({ handleSubmit, handleNameChange, handleNumberChange, newName, newNumber }) {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input type='text' value={newName} onChange={handleNameChange} />
			</div>
			<div>
				number: <input type='number' value={newNumber} onChange={handleNumberChange} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
}

export default PersonForm;
