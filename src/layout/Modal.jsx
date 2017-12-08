import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

const block = bemCn('modal');

export default class Modal extends React.PureComponent {

    constructor(props) {
        console.log('(MODAL) - constructor');
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
            // padding,
            // background,
            barebones,
            children
        } = this.props;

        return (
            <div
                className={ block({ open }).mix(className)({ styled: !barebones })() }
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
    // padding: PropTypes.bool,
    // background: PropTypes.bool,
    barebones: PropTypes.bool,
    children: PropTypes.node,
    onClose: PropTypes.func
};

Modal.defaultProps = {
    open: false,
    // padding: true,
    // background: true
    barebones: false
};
