import React, { useState } from 'react';

const FeedbackBtn = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ stats, good, bad, neutral }) => {
	console.log(stats);
	return (
		<>
			<h2>Statistics</h2>

			{stats.all > 0 ? (
				<ul>
					<li>Good: {good}</li>
					<li>Neutral: {neutral}</li>
					<li>Bad: {bad}</li>
					<li>All: {stats.all}</li>
					<li>Avarage: {stats.avarage}</li>
					<li>Positive: {stats.positive}</li>
				</ul>
			) : (
				<p> No feedback given</p>
			)}
		</>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const stats = {
		all: good + bad + neutral,
		avarage: (good + bad + neutral) / 3,
		positive: (good + neutral) / (good + bad + neutral),
	};

	const updateGood = () => {
		setGood(good + 1);
	};
	const updateBad = () => {
		setBad(bad + 1);
	};
	const updateNeutral = () => {
		setNeutral(neutral + 1);
	};

	return (
		<>
			<h1>Give feedback</h1>

			<FeedbackBtn text='Good' handleClick={updateGood} />
			<FeedbackBtn text='Neutral' handleClick={updateNeutral} />
			<FeedbackBtn text='Bad' handleClick={updateBad} />
			<Statistics stats={stats} good={good} bad={bad} neutral={neutral} />
		</>
	);
};

export default App;
