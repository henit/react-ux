import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

const block = bemCn('modal');

export default class Modal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleBackdropClick = this.handleBackdropClick.bind(this);
        this.handleContentsClick = this.handleContentsClick.bind(this);
    }

    handleBackdropClick() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    handleContentsClick(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else if (!e && window.event) {
            window.event.cancelBubble = true;
        }
    }

    render() {
        const {
            className,
            open,
            padding,
            background,
            children
        } = this.props;

        return (
            <div
                className={ block({ open }).mix(className)({ padding, background })() }
                onClick={ this.handleBackdropClick }
            >
                <div className={ block('contents')() } onClick={ this.handleContentsClick }>
                    { children }
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    padding: PropTypes.bool,
    background: PropTypes.bool,
    children: PropTypes.node,
    onClose: PropTypes.func
};

Modal.defaultProps = {
    open: false,
    padding: true,
    background: true
};
