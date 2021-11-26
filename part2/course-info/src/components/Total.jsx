import React from 'react';

const Total = ({ parts }) => {
	const total = parts.reduce((a, b) => {
		return a + b.exercises;
	}, 0);

	return (
		<p>
			<b>Total {total} exercises</b>
		</p>
	);
};

export default Total;
