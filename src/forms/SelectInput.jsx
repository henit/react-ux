import _get from 'lodash/fp/get';
import React from 'react';
import PropTypes from 'prop-types';
import bemCn from 'bem-cn';
import DropdownToggle from './DropdownToggle';
import Option from './Option';

const block = bemCn('select-input');

export default class SelectInput extends React.PureComponent {

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
            path,
            value,
            source,
            children
            // onFocus,
            // onBlur
        } = this.props;

        const inputValue = value !== undefined ? value : _get(path, source);
        const childrenArr = Array.isArray(children) ? children : children ? [children] : [];
        const dropdownValue = childrenArr.find(child => child.props.value === inputValue)
            || inputValue || <Option />;

        return (
            <DropdownToggle className={ block.mix(className)() } open={ this.state.open } value={ dropdownValue } onToggle={ this.toggle }>
                { childrenArr.map((child, i) =>
                    React.isValidElement(child) ?
                        React.cloneElement(child, {
                            onClick: () => this.handleChange(child.props.value),
                            key: `option-${child.props.value || i}`
                        })
                        :
                        child
                ) }
            </DropdownToggle>
        );
    }
}

SelectInput.propTypes = {
    className: PropTypes.string,
    path: PropTypes.string,
    value: PropTypes.string,
    source: PropTypes.object,
    children: PropTypes.node,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

SelectInput.defaultProps = {
    path: ''
};
