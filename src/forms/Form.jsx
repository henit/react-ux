import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

const block = bemCn('form');

export default function Form({ className, horizontal, inline, children }) {
    return (
        <div className={ block({ horizontal, inline }).mix(className)() }>
            { children }
        </div>
    );
}

Form.propTypes = {
    className: PropTypes.string,
    horizontal: PropTypes.bool,
    inline: PropTypes.bool,
    children: PropTypes.node
};
