import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

export default class Textarea extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            this.props.onPressEnter && this.props.onPressEnter();
        }
    }

    handleKeyUp(e) {
        this.ajustHeight();
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
        this.props.onChange && this.props.onChange(e.target.value, this.props.path);
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
                className={ className ? bemCn(className)() : undefined }
                value={ elementValue }
                defaultValue={ elementDefaultValue }
                placeholder={ placeholder }
                onChange={ this.handleChange }
                onFocus={ onFocus }
                onBlur={ onBlur }
                onKeyDown={ e => this.handleKeyDown(e) }
                onKeyUp={ e => this.handleKeyUp(e) }
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
    maxHeight: PropTypes.number, // Pixels
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onPressEnter: PropTypes.func
};

Textarea.defaultProps = {
    path: '',
    value: '',
    type: 'text',
    maxHeight: 400,
    autoFocus: false
};
