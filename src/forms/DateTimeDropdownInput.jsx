import _get from 'lodash/fp/get';
import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
import Kronos from 'react-kronos';
// import Input from './Input';
// import Textarea from './Textarea';
import ModalToggle from './ModalToggle';

const block = bemCn('date-time-dropdown-input');

export default class DateTimeDropdownInput extends React.PureComponent {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            open: false
        };
    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    handleChange(value) {
        this.toggle();
        this.props.onChange && this.props.onChange(value, this.props.path);
    }

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
            onFocus,
            onBlur,
            onKeyDown,
            onKeyUp
        } = this.props;

        const inputValue = value !== undefined ? value : _get(path, source);
        const empty = Boolean((typeof inputValue) !== 'string' || inputValue.length === 0);
        const invalid = Boolean(maxLength && inputValue.length > maxLength);

        return (
            <ModalToggle value="Hmm" open={ this.state.open } onToggle={ this.toggle }>
                DATE PICKER

                <Kronos
                    date={this.state.datetime}
                    onChange={this.onChange} />
            </ModalToggle>
        );

        return (
            <div className={ block({ multiline, empty }).mix(className)() }>

            </div>
        );
    }
}

DateTimeDropdownInput.propTypes = {
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
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onPressEnter: PropTypes.func
};

DateTimeDropdownInput.defaultProps = {
    type: 'text',
    allowEmpty: false,
    multiline: false,
    maxHeight: 400,
    autoFocus: false
};
