import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

function Course({ courses }) {
	return courses.map((course) => {
		return (
			<section key={course.id}>
				<Header name={course.name} />
				<Content course={course} /> <Total parts={course.parts} />
			</section>
		);
	});
}

export default Course;
