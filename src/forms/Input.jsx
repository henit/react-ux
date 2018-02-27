import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

export default class Input extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.props.onPressEnter && this.props.onPressEnter();
        }
        this.props.onKeyDown && this.props.onKeyDown(e);
    }

    handleKeyUp(e) {
        this.props.onKeyUp && this.props.onKeyUp(e);
    }

    handleChange(e) {
        const inputValue = e.target.value;
        const value = (inputValue && inputValue.length > 0) ? inputValue : (this.props.allowEmpty ? '' : undefined);
        this.props.onChange && this.props.onChange(value, this.props.path);
        this.props.onPathChange && this.props.onPathChange(this.props.path, value);
    }

    render() {
        const {
            className,
            type,
            placeholder,
            value,
            invalid,
            autoFocus,
            onChange,
            onPathChange,
            onFocus,
            onBlur
        } = this.props;

        const elementValue = ((onChange || onPathChange) && value !== undefined) ? value.toString() || '' : undefined;
        const elementDefaultValue = (!(onChange || onPathChange) && value !== undefined) ? value.toString() || '' : undefined;
        const stringValue = value && value.toString() ? value.toString() : '';
        const empty = Boolean(stringValue.length === 0);

        return (
            <input
                className={ className }
                type={ type }
                value={ elementValue }
                defaultValue={ elementDefaultValue }
                placeholder={ placeholder }
                onChange={ this.handleChange }
                onFocus={ onFocus }
                onBlur={ onBlur }
                onKeyUp={ this.handleKeyUp }
                onKeyDown={ this.handleKeyDown }
                autoFocus={ autoFocus } />
        );
    }
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number', 'email', 'url']),
    placeholder: PropTypes.string,
    path: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    invalid: PropTypes.bool,
    allowEmpty: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onPathChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onPressEnter: PropTypes.func
};

Input.defaultProps = {
    path: '',
    value: '',
    type: 'text',
    invalid: false,
    allowEmpty: false,
    maxHeight: 400,
    autoFocus: false
};
