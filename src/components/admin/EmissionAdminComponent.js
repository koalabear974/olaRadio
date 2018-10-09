import React, {Component, Fragment} from "react";
import base from "../../db/config";
import {FaPlus} from "react-icons/fa/index";
import _ from "lodash";

export default class EmissionAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: {},
            emissions: {},
            emission: {
                name: "",
                categories: [],
                contenu: "",
                image: "",
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.onEmissionAdd = this.onEmissionAdd.bind(this);
        this.addEmission = this.addEmission.bind(this);
    }

    componentWillMount() {
        this.emissionsRef = base.syncState('emissions', {
            context: this,
            state: 'emissions'
        });
        this.categoriesRef = base.syncState('categories', {
            context: this,
            state: 'categories'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.emissionsRef);
        base.removeBinding(this.categoriesRef);
    }

    addEmission(emission) {
        const emissions = {...this.state.emissions};
        const id = Date.now();
        let curEmission = emission;
        curEmission['id'] = id;
        emissions[id] = curEmission;

        this.setState({
            emissions: emissions,
            emission: {
                name: "",
                categories: [],
                contenu: "",
                image: "",
            },
        });
    }

    onEmissionAdd(event) {
        event.preventDefault();
        console.log(this.state.emission);
        this.addEmission(this.state.emission);
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
        const emissionsArray = this.state.emissions;
        const categoriesArray = this.state.categories;
        const curEmission = this.state.emission;
        console.log(emissionsArray);
        if (_.isEmpty(categoriesArray)) {
            return <div>loading</div>;
        }
        return (
            <div className="EmissionAdminComponent">
                <table className="EmissionAdminComponent__table pure-table-bordered pure-table">
                    <thead>
                    <tr key={'header'}>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Catégories</th>
                        <th>Contenu</th>
                        <th>Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(emissionsArray).map(function(key) {
                        return (
                            <tr key={key}>
                                <td>{emissionsArray[key].id}</td>
                                <td>{emissionsArray[key].name}</td>
                                <td>{emissionsArray[key].categories.map((catId) => {
                                    return categoriesArray[catId].name;
                                }).join()}</td>
                                <td>{emissionsArray[key].contenu}</td>
                                <td>{emissionsArray[key].image}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
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
            </div>
        );
    }
}
