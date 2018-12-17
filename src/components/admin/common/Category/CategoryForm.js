import React, {Component} from "react";
import {FaEdit, FaMinus, FaPlus} from "react-icons/fa/index";
import PropTypes from "prop-types";
import _ from "lodash";

export default class CategoryForm extends Component {
    static propTypes = {
        editCategory: PropTypes.object,
        handleSubmit: PropTypes.func,
        handleDelete: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            category: {
                name: "",
                id: '',
            },
            isEdit: false,
        };

        if (!_.isEmpty(this.props.editCategory)) {
            this.state = {
                category: {
                    name: this.props.editCategory.name,
                    id: this.props.editCategory.id,
                },
                isEdit: true,
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.onCategorySubmit = this.onCategorySubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    onCategorySubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.category);
        this.setState({
            category: {
                name: "",
                id: "",
            },
            isEdit: false,
        })
    }

    handleChange(event) {
        const target = event.target;
        let curValue = this.state.category;
        curValue[target.name] = target.value;
        this.setState({category: curValue});
    }

    componentDidUpdate() {
        if (!_.isEmpty(this.props.editCategory) && this.props.editCategory.id !== this.state.category.id) {
            this.setState({
                category: {
                    name: this.props.editCategory.name,
                    id: this.props.editCategory.id,
                },
                isEdit: true,
            });
        }
    }

    handleDelete(event) {
        event.preventDefault();
        let id = this.state.category.id;
        this.props.handleDelete(id);
        this.setState({
            category: {
                name: "",
                id: '',
            },
            isEdit: false,
        });
    }

    render() {
        const curCategory = this.state.category;

        return (
            <form
                className="CategoryAdminComponent__form pure-form"
                onSubmit={this.onCategorySubmit}
            >
                <fieldset className={'pure-group'}>
                    <legend>Ajouter une catégorie</legend>
                    <input
                        type="text"
                        name="name"
                        className={'pure-input-1-2'}
                        placeholder={"Nom"}
                        onChange={this.handleChange}
                        value={curCategory.name}
                    />
                </fieldset>
                    <button
                        className={
                            'pure-button pure-button-primary ' +
                            (this.state.isEdit ? 'pure-input-1-4' : 'pure-input-1-2')
                        }
                        type="submit"
                    >
                        {this.state.isEdit ? <FaEdit/> : <FaPlus/>}
                    </button>
                    {
                        this.state.isEdit ? (
                            <button
                                className={'button-error pure-button pure-input-1-4'}
                                onClick={this.handleDelete}
                            >
                                <FaMinus />
                            </button>
                        ) : ''
                    }
            </form>
        );
    }
}
