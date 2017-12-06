import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

const block = bemCn('field');

export default function Field({ className, label, rightActions, children }) {
    return (
        <div className={ block({ }).mix(className)() }>
            { label &&
                <label className={ block('label')() }>{ label }</label>
            }
            { rightActions &&
                <div className={ block('right-actions')() }>
                    { rightActions }
                </div>
            }
            { children }
        </div>
    );
}

Field.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    rightActions: PropTypes.node,
    children: PropTypes.node
};
