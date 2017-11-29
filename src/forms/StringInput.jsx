import _get from 'lodash/fp/get';
import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
import Input from './Input';
import Textarea from './Textarea';

const block = bemCn('string-input');

export default class TextInput extends React.PureComponent {

    render() {
        const {
            className,
            placeholder,
            multiline,
            path,
            value,
            source,
            counter,
            maxLength,
            autoFocus,
            onChange,
            onFocus,
            onBlur
        } = this.props;

        const inputValue = value !== undefined ? value : _get(path, source);
        const invalid = Boolean(maxLength && inputValue.length > maxLength);

        return (
            <div className={ block({ multiline }).mix(className)() }>
                { counter &&
                    <div className={ block('counter', { invalid })() }>
                        { inputValue.length }{ maxLength && ` / ${maxLength}` }
                    </div>
                }
                { multiline ?
                    <Textarea
                        rows="1"
                        className={ block('input')() }
                        path={ path }
                        value={ inputValue }
                        placeholder={ placeholder }
                        onChange={ onChange }
                        onFocus={ onFocus }
                        onBlur={ onBlur }
                        onKeyDown={ e => this.handleKeyDown(e) }
                        onKeyUp={ e => this.handleKeyUp(e) }
                        ref={ (input) => this._textarea = input }
                        autoFocus={ autoFocus } />
                    :
                    <Input
                        className={ block('input')() }
                        type="text"
                        path={ path }
                        value={ inputValue }
                        placeholder={ placeholder }
                        onChange={ onChange }
                        onFocus={ onFocus }
                        onBlur={ onBlur }
                        onKeyDown={ e => this.handleKeyDown(e) }
                        autoFocus={ autoFocus } />
                }
            </div>
        );
    }
}

TextInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    path: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    source: PropTypes.object,
    counter: PropTypes.bool,
    maxLength: PropTypes.number, // Max value characters
    maxHeight: PropTypes.number, // Pixels
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onPressEnter: PropTypes.func
};

TextInput.defaultProps = {
    type: 'text',
    multiline: false,
    maxHeight: 400,
    autoFocus: false
};
