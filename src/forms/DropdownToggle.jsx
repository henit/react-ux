import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

const block = bemCn('dropdown-toggle');

export default class DropdownToggle extends React.PureComponent {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleInsideClick = this.handleInsideClick.bind(this);

        props.open && this.handleAddOutsideListener();
    }

    handleAddOutsideListener() {
        if (document.addEventListener) {
            document.addEventListener('click', this.toggle);
        } else if (document.attachEvent) {
            document.attachEvent('onclick', this.toggle);
        }
    }

    handleRemoveOutsideListener() {
        if (document.removeEventListener) {
            document.removeEventListener('click', this.toggle);
        } else if (document.detachEvent) {
            document.detachEvent('onclick', this.toggle);
        }
    }

    toggle() {
        this.props.open ?
            this.handleRemoveOutsideListener()
            :
            this.handleAddOutsideListener();

        this.props.onToggle && this.props.onToggle();
    }

    componentWillUpdate(newProps) {
        if (this.props.open && !newProps.open) {
            this.handleRemoveOutsideListener();
        }
    }

    componentWillUnmount() {
        this.handleRemoveOutsideListener();
    }

    handleInsideClick(e) {
        if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
            e.nativeEvent.stopImmediatePropagation();
        }
    }

    render() {
        const {
            className,
            open,
            toggle,
            children,
            barebones
        } = this.props;

        return (
            <div className={ block.mix(className)({ open, styled: !barebones })() }>
                <a className={ block('toggle')() } onClick={ this.toggle }>
                    { toggle || '\u00a0' }
                </a>

                { children &&
                    <div className={ block('options')() } onClickCapture={ this.handleInsideClick }>
                        { children }
                    </div>
                }
            </div>
        );
    }
}

DropdownToggle.propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    toggle: PropTypes.node,
    children: PropTypes.node,
    onToggle: PropTypes.func,
    barebones: PropTypes.bool
};

DropdownToggle.defaultProps = {
    open: false,
    barebones: false
};
