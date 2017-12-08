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

    toggle() {
        this.props.onToggle && this.props.onToggle();
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
            <div className={ block.mix(className)({ open })() }>
                <a className={ block.mix('toggle')() } onClick={ this.toggle }>
                    { toggle || '\u00a0' }
                </a>

                { children &&
                    <Modal open={ open } onClose={ this.toggle } barebones={ barebones }>
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
    toggle: PropTypes.node,
    children: PropTypes.node,
    onToggle: PropTypes.func,
    barebones: PropTypes.bool
};

ModalToggle.defaultProps = {
    open: false,
    barebones: false
};
