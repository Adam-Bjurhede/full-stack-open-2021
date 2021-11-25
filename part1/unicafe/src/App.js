import React, { useState } from 'react';

const FeedbackBtn = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ stats, good, bad, neutral }) => {
	return (
		<>
			<h2>Statistics</h2>

			{stats.all > 0 ? (
				<table>
					<tbody>
						<StatisticLine text='Good' value={good} />
						<StatisticLine text='Neutral' value={neutral} />
						<StatisticLine text='Bad' value={bad} />
						<StatisticLine text='All' value={stats.all} />
						<StatisticLine text='Avarage' value={stats.avarage} />
						<StatisticLine text='Positive' value={stats.positive} />
					</tbody>
				</table>
			) : (
				<p> No feedback given</p>
			)}
		</>
	);
};

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
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

	const increment = (state, setState) => {
		setState(state + 1);
	};

	return (
		<>
			<h1>Give feedback</h1>

			<FeedbackBtn text='Good' handleClick={() => increment(good, setGood)} />
			<FeedbackBtn text='Neutral' handleClick={() => increment(neutral, setNeutral)} />
			<FeedbackBtn text='Bad' handleClick={() => increment(bad, setBad)} />
			<Statistics stats={stats} good={good} bad={bad} neutral={neutral} />
		</>
	);
};

export default App;
