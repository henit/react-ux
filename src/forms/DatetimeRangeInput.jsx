import _get from 'lodash/fp/get';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
import Datetime from 'react-datetime';
import RegexInput from './RegexInput';
import Modal from '../layout/Modal';

const block = bemCn('datetime-range-input');
const inputBlock = bemCn('input-block');

// const inputRegex = '^\\d{4}-\\d{2}-\\d{2}( \\d{2}:\\d{2})?( - \\d{4}-\\d{2}-\\d{2}( \\d{2}:\\d{2})?)?$';
const regexDateTime = '[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])(?: (?:2[0-3]|[0-1][0-9]):[0-5][0-9])?';
const inputRegex = `^(${regexDateTime})(?: - (${regexDateTime}))?$`;

export default class DatetimeRangeInput extends React.PureComponent {

    constructor(props) {
        super(props);

        this.toggleStart = this.toggleStart.bind(this);
        this.toggleEnd = this.toggleEnd.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleModalStartChange = this.handleModalStartChange.bind(this);
        this.handleModalEndChange = this.handleModalEndChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.toggleTime = this.toggleTime.bind(this);

        this.state = {
            startOpen: false,
            endOpen: false
        };
    }

    get valueStart() {
        return this.props.valueStart || _get(this.props.pathStart, this.props.source);
    }

    get valueEnd() {
        return this.props.valueEnd || _get(this.props.pathEnd, this.props.source);
    }

    get includeTime() {
        return Boolean((this.valueStart && this.valueStart.length > 10)
            || (this.valueEnd && this.valueEnd.length > 10));
    }

    hasTime(value) {
        return Boolean(value && value.length > 10);
    }

    toggleStart() {
        this.setState({
            startOpen: !this.state.startOpen
        });
    }

    toggleEnd() {
        this.setState({
            endOpen: !this.state.endOpen
        });
    }

    toggleTime() {
        const { pathStart, pathEnd, onChange, onChangeStart, onChangeEnd } = this.props;

        if (this.includeTime) {
            if (this.valueStart) {
                const dateStart = this.valueStart.slice(0, 10);
                if (dateStart !== this.valueStart) {
                    onChange && onChange(dateStart, pathStart);
                }
            }
            if (this.valueEnd) {
                const dateEnd = this.valueEnd.slice(0, 10);
                if (dateEnd !== this.valueEnd) {
                    onChange && onChange(dateEnd, pathEnd);
                }
            }
        } else {
            if (this.valueStart) {
                const dtStart = moment(this.valueStart).format();
                onChange && onChange(dtStart, pathStart);
                onChangeStart && onChangeStart(dtStart, pathStart);
            }
            if (this.valueEnd) {
                const dtEnd = moment(this.valueEnd).format();
                onChange && onChange(dtEnd, pathEnd);
                onChangeEnd && onChangeEnd(dtEnd, pathEnd);
            }
        }
    }

    handleInputChange(value) {
        const match = value.match(new RegExp(inputRegex));

        if (!match) {
            // Invalid format
            this.setState({
                inputValue: value
            });
            return;
        }

        this.setState({
            inputValue: undefined
        });

        const [, changedStart, changedEnd] = match;

        if (changedStart !== this.valueStart) {
            const mnt = moment(changedStart);
            const dt = this.hasTime(changedStart) ? mnt.format() : mnt.format('YYYY-MM-DD');
            this.handleChangeStart(changedStart ? dt : undefined);
        }
        if (changedEnd !== this.valueEnd) {
            const mnt = moment(changedEnd);
            const dt = this.hasTime(changedEnd) ? mnt.format() : mnt.format('YYYY-MM-DD');
            this.handleChangeEnd(changedEnd ? dt : undefined);
        }
    }



    handleModalStartChange(mnt) {
        const dt = this.hasTime(this.valueStart) ? mnt.format() : mnt.format('YYYY-MM-DD');

        const dateChanged = moment(this.valueStart).format('YYYY-MM-DD') !== mnt.format('YYYY-MM-DD');
        if (dateChanged) {
            // Since time picker should stay open when clicking add/subtract buttons
            this.setState({
                startOpen: false,
                inputValue: undefined
            });
        } else {
            this.setState({
                inputValue: undefined
            });
        }

        this.handleChangeStart(dt);
    }

    handleModalEndChange(mnt) {
        const dt = this.hasTime(this.valueEnd) ? mnt.format() : mnt.format('YYYY-MM-DD');

        const dateChanged = moment(this.valueEnd).format('YYYY-MM-DD') !== mnt.format('YYYY-MM-DD');
        if (dateChanged) {
            // Since time picker should stay open when clicking add/subtract buttons
            this.setState({
                endOpen: false,
                inputValue: undefined
            });
        } else {
            this.setState({
                inputValue: undefined
            });
        }

        this.handleChangeEnd(dt);
    }

    handleChangeStart(dt) {
        const { pathStart, onChange, onChangeStart } = this.props;

        onChange && onChange(dt, pathStart);
        onChangeStart && onChangeStart(dt, pathStart);
    }

    handleChangeEnd(dt) {
        const { pathEnd, onChange, onChangeEnd } = this.props;

        onChange && onChange(dt, pathEnd);
        onChangeEnd && onChangeEnd(dt, pathEnd);
    }

    render() {
        const {
            className,
            placeholder,
            // allowEmpty,
            toggleStart,
            toggleEnd,
            autoFocus,
            onFocus,
            onBlur,
            onKeyDown,
            onKeyUp
        } = this.props;

        const { valueStart, valueEnd } = this;

        const momentStart = valueStart ? moment(valueStart) : undefined;
        const momentEnd = valueEnd ? moment(valueEnd) : undefined;

        const includeTime = Boolean((valueStart && valueStart.length > 10) || (valueEnd && valueEnd.length > 10));
        const format = includeTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';

        const inputValue = (valueStart ? momentStart.format(format) : '')
            + (valueEnd ? ' - ' : '')
            + (valueEnd ? momentEnd.format(format) : '');


        return (
            <div className={ block.mix(inputBlock({ outer: true }), className)() }>
                <Modal open={ this.state.startOpen } onClose={ this.toggleStart }>
                    <Datetime
                        dateFormat="YYYY-MM-DD"
                        timeFormat={ includeTime ? 'HH:mm' : false }
                        value={ momentStart }
                        onChange={ this.handleModalStartChange }
                        input={ false } />
                </Modal>
                <Modal open={ this.state.endOpen } onClose={ this.toggleEnd }>
                    <Datetime
                        dateFormat="YYYY-MM-DD"
                        timeFormat={ includeTime ? 'HH:mm' : false }
                        value={ momentEnd }
                        onChange={ this.handleModalEndChange }
                        input={ false } />
                </Modal>

                <div className={ block('row')() }>
                    <RegexInput
                        regex={ inputRegex }
                        value={ this.state.inputValue || inputValue }
                        placeholder={ placeholder }
                        onChange={ this.handleInputChange }
                        autoFocus={ autoFocus }
                        onFocus={ onFocus }
                        onBlur={ onBlur }
                        onKeyDown={ onKeyDown }
                        onKeyUp={ onKeyUp } />

                    <div className={ block('right')() }>
                        { (this.valueStart || this.valueEnd) &&
                            <a onClick={ this.toggleTime }>{ includeTime ? '-' : '+' }Time</a>
                        }
                        { (this.valueStart || this.valueEnd) && ' | ' }
                        <a onClick={ this.toggleStart }>{ toggleStart }</a>
                        { ' | ' } <a onClick={ this.toggleEnd }>{ toggleEnd }</a>
                    </div>
                </div>
            </div>
        );
    }
}

DatetimeRangeInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    pathStart: PropTypes.string,
    pathEnd: PropTypes.string,
    valueStart: PropTypes.string,
    valueEnd: PropTypes.string,
    source: PropTypes.object,
    timeOptional: PropTypes.bool,
    allowEmpty: PropTypes.bool,
    counter: PropTypes.bool,
    toggleStart: PropTypes.node,
    toggleEnd: PropTypes.node,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onChangeStart: PropTypes.func,
    onChangeEnd: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onPressEnter: PropTypes.func
};

DatetimeRangeInput.defaultProps = {
    timeOptional: false,
    allowEmpty: false,
    toggleStart: 'Start',
    toggleEnd: 'End',
    autoFocus: false
};
