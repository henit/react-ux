import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

const block = bemCn('option');

export default class Option extends React.PureComponent {

    render() {
        const {
            className,
            value,
            title,
            text,
            children,
            onClick
        } = this.props;

        return (
            <div className={ block.mix(className)() } onClick={ onClick }>
                { title &&
                    <span className={ block('title')() }>{ title }</span>
                }
                { text &&
                    <span className={ block('text')() }>{ text }</span>
                }
                { !title && !text && !children && value &&
                    <span className={ block('value')() }>{ value }</span>
                }
                { !title && !text && !children && !value &&
                    <span>&nbsp;</span>
                }
                { children }
            </div>
        );
    }
}

Option.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    title: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
};
