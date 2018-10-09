import React, {Component} from "react";
import {FaPlus} from "react-icons/fa/index";

export default class CategoryForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {
                name: "",
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.onCategoryAdd = this.onCategoryAdd.bind(this);
    }

    onCategoryAdd(event) {
        event.preventDefault();
        this.props.addCategory(this.state.category);
    }

    handleChange(event) {
        this.setState({category: {name: event.target.value}});
    }

    render() {
        const curCategory = this.state.category;

        return (
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
        );
    }
}
