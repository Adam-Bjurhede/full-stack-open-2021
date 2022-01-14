import React, { useState } from 'react';

function Togglable(props) {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={() => toggleVisibility(true)}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				<button onClick={() => toggleVisibility(false)}>Cancel</button>
			</div>

			<div style={showWhenVisible}>{props.children}</div>
		</div>
	);
}
export default Togglable;
