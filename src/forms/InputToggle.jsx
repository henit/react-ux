import _get from 'lodash/fp/get';
import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
// import DropdownToggle from './DropdownToggle';
// import Option from './Option';
import Modal from '../layout/Modal';

const block = bemCn('input-toggle');

export default class InputToggle extends React.PureComponent {

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
            // path,
            value,
            selected,
            source,
            children
            // onFocus,
            // onBlur
        } = this.props;
        const { open } = this.state;

        // const inputValue = value !== undefined ? value : _get(path, source);
        // const childrenArr = Array.isArray(children) ? children : children ? [children] : [];
        // const toggleValue = selected || childrenArr.find(child => child.props.value === inputValue)
        //     || inputValue;

        return (
            // open={ this.state.open }
            // toggle={ toggleValue ?
            //     React.isValidElement(toggleValue) ?
            //         React.cloneElement(toggleValue, {
            //             className: block.mix(bemCn('input-block'))('value')()
            //         })
            //         :
            //         <div className={ block.mix(bemCn('input-block'))('value')() }>
            //             { toggleValue }
            //         </div>
            //     :
            //     React.isValidElement(placeholder) ?
            //         React.cloneElement(placeholder, {
            //             className: block.mix(bemCn('input-block')({ placeholder: true }))('placeholder')()
            //         })
            //         :
            //         <div className={ block.mix(bemCn('input-block')({ placeholder: true }))('placeholder')() }>
            //             { placeholder || '\u00a0' }
            //         </div>
            // }
            //onToggle={ this.toggle }

            <div className={ block.mix(className)({ open })() }>
                <a className={ block('toggle')() } onClick={ this.toggle }>
                    {/* toggle || '\u00a0' */}

                    { value ?
                        React.isValidElement(value) ?
                            React.cloneElement(value, {
                                className: block.mix(bemCn('input-block'))('value')()
                            })
                            :
                            <div className={ block.mix(bemCn('input-block'))('value')() }>
                                { value }
                            </div>
                        :
                        React.isValidElement(placeholder) ?
                            React.cloneElement(placeholder, {
                                className: block.mix(bemCn('input-block')({ placeholder: true }))('placeholder')()
                            })
                            :
                            <div className={ block.mix(bemCn('input-block')({ placeholder: true }))('placeholder')() }>
                                { placeholder || '\u00a0' }
                            </div>
                    }
                </a>

                { children &&
                    <Modal open={ open } onClose={ this.toggle }>
                        { children }
                    </Modal>
                }
            </div>

            /* childrenArr.map((child, i) =>
                React.isValidElement(child) ?
                    React.cloneElement(child, {
                        onClick: () => this.handleChange(child.props.value),
                        key: `option-${child.props.value || i}`
                    })
                    :
                    child
            ) */
        );
    }
}

InputToggle.propTypes = {
    className: PropTypes.string,
    path: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.node,
    selected: PropTypes.node,
    source: PropTypes.object,
    children: PropTypes.node,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

InputToggle.defaultProps = {
    path: ''
};
