import _get from 'lodash/fp/get';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
import Input from './Input';
import InputToggle from './InputToggle';
import ModalToggle from './ModalToggle';

const block = bemCn('datetime-input');

export default class DateTimeInput extends React.PureComponent {

    constructor(props) {
        super(props);

        this.toggleDate = this.toggleDate.bind(this);
        this.toggleTime = this.toggleTime.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            dateOpen: false,
            timeOpen: false
        };
    }

    toggleDate() {
        this.setState({
            dateOpen: !this.state.dateOpen
        });
    }

    toggleTime() {
        this.setState({
            timeOpen: !this.state.timeOpen
        });
    }

    handleChange(value, ...args) {
        const { onChange, onPathChange } = this.props;
        onChange && onChange(value !== undefined ? parseFloat(value) : undefined, ...args);
        onPathChange && onPathChange(value !== undefined ? parseFloat(value) : undefined, ...args);
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

        // const inputValue = value !== undefined ? value : _get(path, source);
        // const empty = Boolean((typeof inputValue) !== 'string' || inputValue.length === 0);

        const dt = moment(value);

        /*ModalToggle.propTypes = {
            className: PropTypes.string,
            open: PropTypes.bool,
            toggle: PropTypes.node,
            children: PropTypes.node,
            onToggle: PropTypes.func,
            barebones: PropTypes.bool
        };*/

        return (
            <div className={ block.mix(className)() }>
                DATETIME INPUT
                <div className={ block.mix('input-block')('block')() }>

                    <InputToggle value={ value ? dt.format('YYYY-MM-DD') : undefined } placeholder={ <span>DATE</span> }>
                        DATE-PICKER
                    </InputToggle>

                    <InputToggle value={ value ? dt.format('HH:mm:ss') : undefined } placeholder={ <span>TIME</span> }>
                        TIME-PICKER
                    </InputToggle>
                </div>

                {/*
                <input
                    className={ bemCn('input-block').mix(className)() }
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
                */}

                {/*
                <Input
                    className={ block('input')() }
                    type="number"
                    path={ path }
                    value={ inputValue }
                    placeholder={ placeholder }
                    allowEmpty={ allowEmpty }
                    onChange={ this.handleChange }
                    onFocus={ onFocus }
                    onBlur={ onBlur }
                    onKeyDown={ onKeyDown }
                    onKeyUp={ onKeyUp }
                    autoFocus={ autoFocus } />
                */}
            </div>
        );
    }
}

DateTimeInput.propTypes = {
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

DateTimeInput.defaultProps = {
    allowEmpty: false,
    autoFocus: false
};
