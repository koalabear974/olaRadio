import React, {Component, Fragment} from "react";
import base from "../../db/config";
import {FaPlus} from "react-icons/fa/index";

export default class CategoryAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: {},
            category: {
                name: "",
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.onCategoryAdd = this.onCategoryAdd.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }

    componentWillMount() {
        this.categoriesRef = base.syncState('categories', {
            context: this,
            state: 'categories'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.categoriesRef);
    }

    addCategory(category) {
        const categories = {...this.state.categories};
        const id = Date.now();
        categories[id] = {
            id: id,
            name: category.name,
        };

        this.setState({categories});
    }

    onCategoryAdd(event) {
        event.preventDefault();
        this.addCategory(this.state.category);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({category: {name: event.target.value}});
    }

    render() {
        const categoriesArray = this.state.categories;
        const curCategory = this.state.category;

        return (
            <div className="CategoryAdminComponent">
                <table className="CategoryAdminComponent__table pure-table">
                    <thead>
                        <tr key={'header'}>
                            <th>Id</th>
                            <th>Categorie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(categoriesArray).map(function(key) {
                            return (
                                <tr key={key}>
                                    <td>{categoriesArray[key].id}</td>
                                    <td>{categoriesArray[key].name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <form
                    className="CategoryAdminComponent__form pure-form"
                    onSubmit={this.onCategoryAdd}
                >
                    <fieldset>
                        <legend>Ajouter une catégorie</legend>
                        <input
                            type="text"
                            name="name"
                            placeholder={"Nom"}
                            onChange={this.handleChange}
                            value={curCategory.name}
                        />
                        <button
                            className={'CategoryAdminComponent__button pure-button pure-button-primary'}
                            type="submit"
                        >
                            <FaPlus className="CategoryAdminComponent__add"/>
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }
}
