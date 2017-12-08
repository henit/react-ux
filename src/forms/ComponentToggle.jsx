import React from 'react';
import PropTypes from 'prop-types';
// import bemCn from 'bem-cn';
// import Modal from '../layout/Modal';
import DropdownToggle from './DropdownToggle';
import ModalToggle from './ModalToggle';

// const block = bemCn('modal-toggle');

export default class ComponentToggle extends React.PureComponent {

    constructor(props) {
        super(props);

        console.log('(COMPONENT TOGGLE) - constructor');
    }

    render() {
        const {
            className,
            open,
            toggle,
            children,
            barebones
        } = this.props;

        console.info('WINDOW WIDTH', window.innerWidth);

        if (window.innerWidth >= 800) {
            return (
                <DropdownToggle { ...this.props } />
            );
        } else {
            return (
                <ModalToggle { ...this.props } />
            );
        }

        // return (
        //     <div className={ block.mix(className)({ open })() }>
        //         <a className={ block.mix('toggle')() } onClick={ this.toggle }>
        //             { toggle || '\u00a0' }
        //         </a>

        //         { children &&
        //             <Modal open={ open } onClose={ this.toggle } barebones={ barebones }>
        //                 { children }
        //             </Modal>
        //         }
        //     </div>
        // );
    }
}

/*ComponentToggle.propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    toggle: PropTypes.node,
    onToggle: PropTypes.func,
    barebones: PropTypes.bool,
    children: PropTypes.node
};

ComponentToggle.defaultProps = {
    open: false,
    barebones: false
};*/
