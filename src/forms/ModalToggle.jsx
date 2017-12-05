import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
import Modal from '../layout/Modal';

const block = bemCn('modal-toggle');

export default class ModalToggle extends React.PureComponent {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleInsideClick = this.handleInsideClick.bind(this);
    }

    /*handleAddOutsideListener() {
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
    }*/

    toggle() {
        /*this.props.open ?
            this.handleRemoveOutsideListener()
            :
            this.handleAddOutsideListener();*/

        this.props.onToggle && this.props.onToggle();
    }

    /*componentWillUpdate(newProps) {
        if (this.props.open && !newProps.open) {
            this.handleRemoveOutsideListener();
        }
    }*/

    handleInsideClick(e) {
        console.log('INSIDE CLICK');
        if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
            e.nativeEvent.stopImmediatePropagation();
        }
    }

    render() {
        const {
            className,
            open,
            value,
            placeholder,
            children,
            barebones
        } = this.props;

        return (
            <div className={ block.mix(className)({ open })() }>
                <a className={ block.mix('input-block')('toggle')() } onClick={ this.toggle }>
                    { value ?
                        <span className={ block('value')() }>{ value }</span>
                        :
                        <span className={ block('placeholder')() }>{ placeholder || '\u00a0' }</span>
                    }
                </a>

                { children &&
                    <Modal open={ open } onClose={ this.toggle } padding={ !barebones } background={ !barebones }>
                        { children }
                    </Modal>
                }
            </div>
        );
    }
}

ModalToggle.propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    value: PropTypes.node,
    placeholder: PropTypes.string,
    children: PropTypes.node,
    onToggle: PropTypes.func,
    barebones: PropTypes.bool
};

ModalToggle.defaultProps = {
    open: false,
    barebones: false
};
