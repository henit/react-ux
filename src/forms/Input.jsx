import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

export default class Input extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.props.onPressEnter && this.props.onPressEnter();
        }
    }

    handleChange(e) {
        this.props.onChange && this.props.onChange(e.target.value, this.props.path);
    }

    render() {
        const {
            className,
            type,
            placeholder,
            value,
            autoFocus,
            onChange,
            onFocus,
            onBlur
        } = this.props;

        const elementValue = (onChange && value !== undefined) ? value.toString() || '' : undefined;
        const elementDefaultValue = (!onChange && value !== undefined) ? value.toString() || '' : undefined;

        return (
            <input
                className={ className ? bemCn(className)() : undefined }
                type={ type }
                value={ elementValue }
                defaultValue={ elementDefaultValue }
                placeholder={ placeholder }
                onChange={ this.handleChange }
                onFocus={ onFocus }
                onBlur={ onBlur }
                onKeyDown={ e => this.handleKeyDown(e) }
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
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onPressEnter: PropTypes.func
};

Input.defaultProps = {
    path: '',
    value: '',
    type: 'text',
    maxHeight: 400,
    autoFocus: false
};
