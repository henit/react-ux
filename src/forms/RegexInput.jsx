import _get from 'lodash/fp/get';
import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
import Input from './Input';

const block = bemCn('regex-input');
const inputBlock = bemCn('input-block');

export default class RegexInput extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value = '') {
        this.props.onChange && this.props.onChange(value, this.props.path);
    }

    render() {
        const {
            className,
            placeholder,
            regex,
            path,
            value,
            source,
            allowEmpty,
            autoFocus,
            onFocus,
            onBlur,
            onKeyDown,
            onKeyUp
        } = this.props;

        const inputValue = value !== undefined ? value : _get(path, source);
        const invalid = regex ? !(inputValue || '').match(new RegExp(regex)) : false;

        return (
            <Input
                className={ block.mix(inputBlock({ inner: true }), className)() }
                path={ path }
                value={ inputValue }
                invalid={ invalid }
                placeholder={ placeholder }
                allowEmpty={ allowEmpty }
                onChange={ this.handleChange }
                onFocus={ onFocus }
                onBlur={ onBlur }
                onKeyDown={ onKeyDown }
                onKeyUp={ onKeyUp }
                autoFocus={ autoFocus } />
        );
    }
}

RegexInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    regex: PropTypes.string,
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
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func
};

RegexInput.defaultProps = {
    allowEmpty: false,
    autoFocus: false
};
