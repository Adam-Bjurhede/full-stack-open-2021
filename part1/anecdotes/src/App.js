import React, { useState } from 'react';

const Votes = ({ votes, type }) => {
	return <p>Has {votes[type]} votes</p>;
};

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Anecdote = ({ anecdotes, type }) => {
	return <p>{anecdotes[type]}</p>;
};

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
	];

	const [selected, setSelected] = useState(0);
	const [votes, setvotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

	const nextAnecdote = () => {
		const randomNumber = Math.floor(Math.random() * anecdotes.length);

		setSelected(randomNumber);
	};

	const vote = () => {
		const votesCopy = { ...votes };
		votesCopy[selected] += 1;
		setvotes(votesCopy);
	};

	const mostVotes = Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b));

	return (
		<>
			<h2>Anecdote of the day</h2>
			<Anecdote anecdotes={anecdotes} type={selected} />
			<Votes votes={votes} type={selected} />

			<Button text='Next anecdote' handleClick={() => nextAnecdote()} />
			<Button text='Vote' handleClick={() => vote()} />

			<h2>Anecdote with most votes</h2>
			<Anecdote anecdotes={anecdotes} type={mostVotes} />
			<Votes votes={votes} type={mostVotes} />
		</>
	);
};

export default App;
