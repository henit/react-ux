import React from 'react';
import DropdownToggle from './DropdownToggle';
import ModalToggle from './ModalToggle';

export default class ComponentToggle extends React.PureComponent {

    render() {
        if (window.innerWidth >= 800) {
            return (
                <DropdownToggle { ...this.props } />
            );
        } else {
            return (
                <ModalToggle { ...this.props } />
            );
        }
    }
}
