import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
    Togglable.displayName = 'Togglable';
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        };
    });

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
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
