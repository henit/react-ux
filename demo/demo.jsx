// Polyfills
import 'core-js/es6/promise';
import 'core-js/fn/promise';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/find';
import 'core-js/fn/array/includes';
import 'core-js/fn/array/is-array';
import 'core-js/fn/array/some';
import 'core-js/fn/array/every';
import 'core-js/fn/object/assign';
import 'core-js/fn/object/keys';
import 'core-js/fn/object/values';
import 'core-js/fn/string/includes';
import 'whatwg-fetch';
import 'regenerator-runtime/runtime'; // For ES2017-await & ES2015-generators

import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'src/forms/Form';
import Field from 'src/forms/Field';
import Dropdown from 'src/forms/Dropdown';
import StringInput from 'src/forms/StringInput';
import SelectInput from 'src/forms/SelectInput';
import Option from 'src/forms/Option';
import './demo.scss';
import 'src/index.scss';

class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {};
    }

    handleChange(value, path) {
        this.setState({
            [path]: value
        });

        if (path === 'dropdown1') {
            this.setState({
                dropdown1open: false
            });
        }
    }

    render() {
        const { state, handleChange } = this;

        return (
            <div>
                <h1>React UX Demo</h1>

                <strong>State:</strong>
                <pre>{ JSON.stringify(this.state, null, 4) }</pre>


                <h2>Form</h2>

                <h3>Default</h3>
                <Form>
                    <Field label="Field label">
                        <StringInput />
                    </Field>
                    <Field label="Field label">
                        <StringInput />
                    </Field>
                </Form>

                <h3>Horizontal</h3>
                <Form horizontal>
                    <Field label="Field label">
                        <StringInput />
                    </Field>
                    <Field label="Field label">
                        <StringInput />
                    </Field>
                </Form>

                <h3>Inline</h3>
                <Form inline>
                    <Field label="Field label">
                        <StringInput />
                    </Field>
                    <Field label="Field label">
                        <StringInput />
                    </Field>
                </Form>


                <h2>StringInput</h2>

                <label>Single line</label>
                <StringInput
                    path="stringInput1"
                    value={ state.stringInput1 }
                    onChange={ handleChange } />

                <label>Multiline</label>
                <StringInput
                    path="stringInput2"
                    value={ state.stringInput2 }
                    onChange={ handleChange }
                    multiline />

                <Field label="From source">
                    <StringInput
                        path="stringInput1"
                        source={ this.state }
                        onChange={ handleChange } />
                </Field>

                <h2>Dropdown</h2>
                <Dropdown
                    open={ state.dropdown1open }
                    onToggle={ () => this.setState({ dropdown1open: !state.dropdown1open }) }
                    value={ state.dropdown1 || <em>Nada...</em> }
                >
                    <strong>Select one of theese:</strong><br />
                    <a onClick={ () => this.handleChange('This', 'dropdown1') }>This...</a><br />
                    <a onClick={ () => this.handleChange('That', 'dropdown1') }>That...</a>
                </Dropdown>


                <h2>SelectInput</h2>
                <SelectInput path="selectInput1" value={ state.selectInput1 } onChange={ handleChange }>
                    <Option value="value1" />
                    <Option value="value2">Value 2</Option>
                    <Option value="value3" title="Value 3" />
                    <Option value="value4" title="Value 4" text="Info about value 4" />
                </SelectInput>

                <Field label="From source">
                    <SelectInput path="selectInput1" source={ this.state } onChange={ handleChange }>
                        <Option value="value1" />
                        <Option value="value2">Value 2</Option>
                        <Option value="value3" title="Value 3" />
                        <Option value="value4" title="Value 4" text="Info about value 4" />
                    </SelectInput>
                </Field>


                <br /><br /><br /><br /><br />
            </div>
        );
    }
}

const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);


ReactDOM.render(<Demo />, document.querySelector('#container'));
