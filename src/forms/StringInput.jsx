import _get from 'lodash/fp/get';
import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
import Input from './Input';
import Textarea from './Textarea';

const block = bemCn('string-input');
const inputBlock = bemCn('input-block');

export default class StringInput extends React.PureComponent {

    render() {
        const {
            className,
            placeholder,
            multiline,
            path,
            value,
            source,
            allowEmpty,
            counter,
            maxLength,
            autoFocus,
            onChange,
            onPathChange,
            onFocus,
            onPressEnter,
            onBlur,
            onKeyDown,
            onKeyUp
        } = this.props;

        const inputValue = (value !== undefined ? value : _get(path, source)) || '';
        const empty = Boolean((typeof inputValue) !== 'string' || inputValue.length === 0);
        const invalid = Boolean(maxLength && inputValue.length > maxLength);

        return (
            <div className={ block({ multiline, empty }).mix(inputBlock({ outer: true }), className)() }>
                { counter &&
                    <div className={ block('counter', { invalid })() }>
                        { inputValue.length }{ maxLength && ` / ${maxLength}` }
                    </div>
                }
                { multiline ?
                    <Textarea
                        rows="1"
                        className={ inputBlock('inner')() }
                        path={ path }
                        value={ inputValue }
                        placeholder={ placeholder }
                        allowEmpty={ allowEmpty }
                        maxLength={ maxLength }
                        onChange={ onChange }
                        onPathChange={ onPathChange }
                        onFocus={ onFocus }
                        onBlur={ onBlur }
                        onPressEnter={ onPressEnter }
                        onKeyDown={ onKeyDown }
                        onKeyUp={ onKeyUp }
                        ref={ (input) => this._textarea = input }
                        autoFocus={ autoFocus } />
                    :
                    <Input
                        className={ inputBlock('inner')() }
                        type="text"
                        path={ path }
                        value={ inputValue }
                        placeholder={ placeholder }
                        allowEmpty={ allowEmpty }
                        maxLength={ maxLength }
                        onChange={ onChange }
                        onPathChange={ onPathChange }
                        onFocus={ onFocus }
                        onBlur={ onBlur }
                        onPressEnter={ onPressEnter }
                        onKeyDown={ onKeyDown }
                        onKeyUp={ onKeyUp }
                        autoFocus={ autoFocus } />
                }
            </div>
        );
    }
}

StringInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    path: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    source: PropTypes.object,
    allowEmpty: PropTypes.bool,
    counter: PropTypes.bool,
    maxLength: PropTypes.number, // Max value characters
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

StringInput.defaultProps = {
    allowEmpty: false,
    multiline: false,
    maxHeight: 400,
    autoFocus: false
};
