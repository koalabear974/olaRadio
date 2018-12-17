import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {FaMinus} from "react-icons/fa/index";

export default class InputTextArray extends Component {
    static propTypes = {
        label: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        let values = this.props.values.map((value, index) => {
            return {index: index, value: value};
        });

        this.state = {
            inputArray: values,
            lastInput: {index: values.length, value: ''}
        };

        this.handleChange = this.handleChange.bind(this);
        this.registerLast = this.registerLast.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.updateParent = this.updateParent.bind(this);
        this.lastInputRef = React.createRef();
    }

    componentDidUpdate() {
        if (this.props.values.length !== this.state.inputArray.length) {
            let values = this.props.values.map((value, index) => {
                return {index: index, value: value};
            });
            this.setState({
                inputArray: values,
                lastInput: {index: values.length, value: ''}
            });
        }
    }

    handleChange(event) {
        const target = event.target;
        let index = parseInt(target.dataset.index);
        let value = target.value;
        let array = this.state.inputArray;

        if (index === this.state.inputArray.length) {
            this.setState({ lastInput: {index: index, value: value} });
        } else {
            array[index] = {index: index, value: value};
            this.setState({ inputArray: array })
        }

        this.updateParent(array);
    }

    registerLast() {
        let lastInput = this.state.lastInput;
        if(!_.isEmpty(lastInput.value)) {
            let array = this.state.inputArray;
            array[lastInput.index] = lastInput;

            this.setState({
                inputArray: array,
                lastInput: {index: array.length, value: ''},
            });

            this.updateParent(array);
        }
    }

    handleDelete(index) {
        let array = this.state.inputArray;
        array.splice(index, 1);
        array = array.map((object, index) => { return {index: index, value: object.value}});

        this.setState({
            inputArray: array,
            lastInput: {index: array.length, value: ''},
        });

        this.updateParent(array);
    }

    updateParent(array) {
        let values = array.map((object) => {return object.value});
        this.props.onChange(values);
    }

    render() {
        let inputArray = this.state.inputArray;
        let lastInput = this.state.lastInput;
        let {label, name, placeholder} = this.props;

        return (
            <fieldset>
                <label htmlFor={name}>{label}</label>
                {
                    inputArray.map((object) => {
                        return (
                            <div
                                key={name + '[' + object.index + ']div'}
                                className={'flex'}>
                                <input
                                    className={''}
                                    key={name + '[' + object.index + ']'}
                                    type="text"
                                    data-index={object.index}
                                    name={name + '[' + object.index + ']'}
                                    placeholder={placeholder}
                                    value={object.value}
                                    onChange={this.handleChange}
                                />
                                <button
                                    className={'button-error pure-button'}
                                    key={name + '[' + object.index + ']button'}
                                    onClick={(e) => {e.preventDefault(); this.handleDelete(object.index)}}
                                    >
                                    <FaMinus/>
                                </button>
                            </div>
                        );
                    })
                }

                <input
                    className={'pure-input-1-2'}
                    key={name + '[' + lastInput.index + ']'}
                    type="text"
                    data-index={lastInput.index}
                    name={name + '[' + lastInput.index + ']'}
                    placeholder={placeholder}
                    value={lastInput.value}
                    onChange={this.handleChange}
                    onBlur={this.registerLast}
                    ref={this.lastInputRef}
                />
            </fieldset>
        );
    }
}
