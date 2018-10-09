import React, {Component} from "react";
import {FaPlus} from "react-icons/fa/index";

export default class EmissionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emission: {
                name: "",
                categories: [],
                contenu: "",
                image: "",
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.onEmissionAdd = this.onEmissionAdd.bind(this);
    }

    onEmissionAdd(event) {
        event.preventDefault();
        this.props.addEmission(this.state.emission);
    }

    handleChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(target.type === 'select-multiple') {
            let options = target.options;
            value = [];
            for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
        }

        let curValue = this.state.emission;
        curValue[name] = value;
        this.setState({
            emission: curValue
        });
    }

    render() {
        let categoriesArray = this.props.categories;
        return (
            <form
                className="EmissionAdminComponent__form pure-form"
                onSubmit={this.onEmissionAdd}
            >
                <legend>Ajouter une émission</legend>

                <select
                    multiple
                    name="categories"
                    className={'pure-input-1-2'}
                    value={this.state.emission.categories}
                    onChange={this.handleChange}
                >
                    {Object.keys(categoriesArray).map(function(key) {
                        return (
                            <option
                                key={key}
                                value={categoriesArray[key].id}
                            >
                                {categoriesArray[key].name}
                            </option>
                        );
                    })}
                </select>

                <fieldset className={'pure-group'}>
                    <input
                        type="text"
                        className={'pure-input-1-2'}
                        name="name"
                        placeholder={"Nom"}
                        value={this.state.emission.name}
                        onChange={this.handleChange}
                    />
                    <textarea
                        type="text"
                        className={'pure-input-1-2'}
                        name="contenu"
                        placeholder={"Contenu"}
                        value={this.state.emission.contenu}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        className={'pure-input-1-2'}
                        name="image"
                        placeholder={"Image"}
                        value={this.state.emission.image}
                        onChange={this.handleChange}
                    />
                </fieldset>
                <button
                    className={'EmissionAdminComponent__button pure-button pure-button-primary pure-input-1-2'}
                    type="submit"
                >
                    <FaPlus className="EmissionAdminComponent__add"/>
                </button>
            </form>
        );
    }
}
