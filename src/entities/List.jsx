import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
// import './List.scss';

const block = bemCn('list');

export default function List({ className, children, condensed }) {
    return (
        <div className={ block.mix(className)({ condensed })() }>
            { children }
        </div>
    );
}

List.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    condensed: PropTypes.bool
};
