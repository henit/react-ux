import _get from 'lodash/fp/get';
import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
import Input from './Input';

const block = bemCn('number-input');
const inputBlock = bemCn('input-block');

export default class NumberInput extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handlePathChange = this.handlePathChange.bind(this);
    }

    handleChange(value, ...args) {
        this.props.onChange && this.props.onChange(value !== undefined ? parseFloat(value) : undefined, ...args);

    }

    handlePathChange(path, value) {
        this.props.onPathChange && this.props.onPathChange(path, value !== undefined ? parseFloat(value) : undefined);
    }

    render() {
        const {
            className,
            placeholder,
            path,
            value,
            source,
            allowEmpty,
            autoFocus,
            // onChange,
            onFocus,
            onBlur,
            onKeyDown,
            onKeyUp
        } = this.props;

        const inputValue = value !== undefined ? value : _get(path, source);
        const empty = Boolean((typeof inputValue) !== 'string' || inputValue.length === 0);

        return (
            <Input
                className={ block({ empty }).mix(inputBlock({ inner: true, empty }), className)() }
                type="number"
                path={ path }
                value={ inputValue }
                placeholder={ placeholder }
                allowEmpty={ allowEmpty }
                onChange={ this.handleChange }
                onPathChange={ this.handlePathChange }
                onFocus={ onFocus }
                onBlur={ onBlur }
                onKeyDown={ onKeyDown }
                onKeyUp={ onKeyUp }
                autoFocus={ autoFocus } />
        );
    }
}

NumberInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    path: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    source: PropTypes.object,
    allowEmpty: PropTypes.bool,
    counter: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onPathChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onPressEnter: PropTypes.func
};

NumberInput.defaultProps = {
    allowEmpty: false,
    autoFocus: false
};
