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
import { Form, Field, DropdownToggle, StringInput, NumberInput, SelectInput, Option,
    Modal, ModalToggle, RegexInput, DateTimeInput, DatetimeRangeInput, DateTimeDropdownInput } from 'src';
import './demo.scss';
import 'src/index.scss';

class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            dateTimeRange2start: '2018-01-01',
            dateTimeRange3start: '2018-01-01 10:00',
            dateTimeRange4start: '2018-01-01 10:00',
            dateTimeRange4end: '2018-01-03 16:30',
            dateTimeRange5end: '2018-01-03',
            dateTimeRange6end: '2018-01-03 16:30'
        };
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

        if (path === 'modal1') {
            this.setState({
                modal1open: false
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


                <h2>NumberInput</h2>

                <NumberInput
                    path="numberInput1"
                    value={ state.numberInput1 }
                    onChange={ handleChange } />


                <h2>DropdownToggle</h2>
                <DropdownToggle
                    open={ state.dropdown1open }
                    onToggle={ () => this.setState({ dropdown1open: !state.dropdown1open }) }
                    value={ state.dropdown1 || "Nada..." }
                >
                    <strong>Select one of theese:</strong><br />
                    <a onClick={ () => this.handleChange('This', 'dropdown1') }>This...</a><br />
                    <a onClick={ () => this.handleChange('That', 'dropdown1') }>That...</a>
                </DropdownToggle>


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


                <h2>Modal</h2>
                <button onClick={ () => this.setState({ modal1: true }) }>Open</button>

                <Modal open={ this.state.modal1 } onClose={ () => this.setState({ modal1: false }) }>
                    This is a modal dialog<br />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Modal>


                <h2>ModalToggle</h2>
                <ModalToggle
                    open={ state.modal1open }
                    onToggle={ () => this.setState({ modal1open: !state.modal1open }) }
                    toggle={ state.modal1 }
                    placeholder="Nada..."
                >
                    <strong>Select one of theese:</strong><br />
                    <a onClick={ () => this.handleChange('This', 'modal1') }>This...</a><br />
                    <a onClick={ () => this.handleChange('That', 'modal1') }>That...</a>
                </ModalToggle>


                <h2>RegexInput</h2>
                <p><em>{ this.state.regexInput1 }</em></p>
                <RegexInput
                    regex="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    path="regexInput1"
                    source={ this.state }
                    onChange={ handleChange } />


                <h2>DateTimeInput</h2>
                <p><em>{ this.state.dateTimeInput1 }</em></p>
                <DateTimeInput
                    path="dateTimeInput1"
                    source={ this.state }
                    onChange={ handleChange } />


                {/*
                dateTimeRange2start: '2018-01-01',
                dateTimeRange3start: '2018-01-01 10:00',
                dateTimeRange4start: '2018-01-01 10:00',
                dateTimeRange4end: '2018-01-03 16:30',
                dateTimeRange5end: '2018-01-03',
                dateTimeRange6end: '2018-01-03 16:30'
                */}

                <h2>DatetimeRangeInput</h2>
                <p><em>{ this.state.dateTimeRange1start } - { this.state.dateTimeRange1end }</em></p>
                <DatetimeRangeInput
                    pathStart="dateTimeRange1start"
                    pathEnd="dateTimeRange1end"
                    source={ this.state }
                    onChange={ handleChange } />

                <p><em>{ this.state.dateTimeRange2start } - { this.state.dateTimeRange2end }</em></p>
                <DatetimeRangeInput
                    pathStart="dateTimeRange2start"
                    pathEnd="dateTimeRange2end"
                    source={ this.state }
                    onChange={ handleChange } />

                <p><em>{ this.state.dateTimeRange3start } - { this.state.dateTimeRange3end }</em></p>
                <DatetimeRangeInput
                    pathStart="dateTimeRange3start"
                    pathEnd="dateTimeRange3end"
                    source={ this.state }
                    onChange={ handleChange } />

                <p><em>{ this.state.dateTimeRange4start } - { this.state.dateTimeRange4end }</em></p>
                <DatetimeRangeInput
                    pathStart="dateTimeRange4start"
                    pathEnd="dateTimeRange4end"
                    source={ this.state }
                    onChange={ handleChange } />

                <p><em>{ this.state.dateTimeRange5start } - { this.state.dateTimeRange5end }</em></p>
                <DatetimeRangeInput
                    pathStart="dateTimeRange5start"
                    pathEnd="dateTimeRange5end"
                    source={ this.state }
                    onChange={ handleChange } />

                <p><em>{ this.state.dateTimeRange6start } - { this.state.dateTimeRange6end }</em></p>
                <DatetimeRangeInput
                    pathStart="dateTimeRange6start"
                    pathEnd="dateTimeRange6end"
                    source={ this.state }
                    onChange={ handleChange } />

                <br /><br /><br /><br /><br />
            </div>
        );
    }
}

const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);


ReactDOM.render(<Demo />, document.querySelector('#container'));
