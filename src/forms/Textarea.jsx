import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

export default class Textarea extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            this.props.onPressEnter && this.props.onPressEnter();
        }
        this.props.onKeyDown && this.props.onKeyDown(e);
    }

    handleKeyUp(e) {
        this.ajustHeight();
        this.props.onKeyUp && this.props.onKeyUp(e);
    }

    ajustHeight() {
        if (!this._textarea) {
            return;
        }

        const clientHeight = this._textarea.clientHeight;
        const scrollHeight = this._textarea.scrollHeight;

        if (scrollHeight > clientHeight) {
            this._textarea.style.height = `${Math.min(scrollHeight, this.props.maxHeight)}px`;
        }
    }

    componentDidMount() {
        this.ajustHeight();
    }

    componentDidUpdate() {
        this.ajustHeight();
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
            <textarea
                rows="1"
                className={ className }
                value={ elementValue }
                defaultValue={ elementDefaultValue }
                placeholder={ placeholder }
                onChange={ this.handleChange }
                onFocus={ onFocus }
                onBlur={ onBlur }
                onKeyDown={ this.handleKeyDown }
                onKeyUp={ this.handleKeyUp }
                ref={ (input) => this._textarea = input }
                autoFocus={ autoFocus } />
        );
    }
}

Textarea.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    path: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    allowEmpty: PropTypes.bool,
    maxHeight: PropTypes.number, // Pixels
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onPathChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onPressEnter: PropTypes.func
};

Textarea.defaultProps = {
    path: '',
    value: '',
    allowEmpty: false,
    maxHeight: 400,
    autoFocus: false
};
