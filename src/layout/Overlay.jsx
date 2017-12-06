import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';

const block = bemCn('overlay');

export default class Overlay extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleBackdropClick = this.handleBackdropClick.bind(this);
        this.handleContentsClick = this.handleContentsClick.bind(this);
    }

    handleBackdropClick() {
        this.props.onClick && this.props.onClick();
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
            visible,
            children,
            light
        } = this.props;

        return (
            <div className={ block.mix(className)() }>
                <div
                    className={ block('backdrop')({ hidden: !visible, light })() }
                    onClick={ this.handleBackdropClick } />

                <div
                    className={ block('content')() }
                    onClick={ this.handleContentsClick }>

                    { children }
                </div>
            </div>
        );
    }
}

Overlay.propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
    light: PropTypes.bool
};

Overlay.defaultProps = {
    visible: false,
    light: false
};
