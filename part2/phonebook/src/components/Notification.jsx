import React from 'react';

function Notification({ message, error = false }) {
	if (message === null) return null;
	return <div className={error ? 'error-message' : 'success-message'}>{message}</div>;
}

export default Notification;
