import React, {Component} from "react";
import {FaEdit, FaMinus, FaPlus} from "react-icons/fa/index";
import PropTypes from "prop-types";
import _ from "lodash";
import InputTextArray from "../forms/InputTextArray";

export default class StaticPageForm extends Component {
    static propTypes = {
        editStatic: PropTypes.object,
        handleSubmit: PropTypes.func,
        handleDelete: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            staticPage: {
                title: "",
                slug: "",
                id: '',
                texts: [],
            },
            isEdit: false,
        };

        if (!_.isEmpty(this.props.editStatic)) {
            this.state = {
                staticPage: {
                    title: this.props.editStatic.title,
                    id: this.props.editStatic.id,
                    slug: this.props.editStatic.slug,
                    texts: this.props.editStatic.texts,
                },
                isEdit: true,
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleArrayChange = this.handleArrayChange.bind(this);
        this.onStaticSubmit = this.onStaticSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    onStaticSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.staticPage);
        this.setState({
            staticPage: {
                title: "",
                id: "",
                slug: "",
                texts: [],
            },
            isEdit: false,
        })
    }

    handleArrayChange(values) {
        let curValue = this.state.staticPage;
        curValue['texts'] = values;

        this.setState({
            staticPage: curValue
        });
    }

    handleChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let curValue = this.state.staticPage;
        curValue[name] = value;

        this.setState({
            staticPage: curValue
        });
    }

    componentDidUpdate() {
        if (!_.isEmpty(this.props.editStatic) && this.props.editStatic.id !== this.state.staticPage.id) {
            this.setState({
                staticPage: {
                    title: this.props.editStatic.title,
                    id: this.props.editStatic.id,
                    slug: this.props.editStatic.slug,
                    texts: this.props.editStatic.texts || [],
                },
                isEdit: true,
            });
        }
    }

    handleDelete(event) {
        event.preventDefault();
        let id = this.state.staticPage.id;
        this.props.handleDelete(id);
        this.setState({
            staticPage: {
                title: "",
                id: '',
                slug: '',
                texts: [],
            },
            isEdit: false,
        });
    }

    render() {
        const curStatic = this.state.staticPage;

        return (
            <form
                className="CategoryAdminComponent__form form"
                onSubmit={this.onStaticSubmit}
            >
                <legend>Ajouter/Modifier une page static</legend>
                <label htmlFor="title" className={'label'}>Slug</label>
                <input
                    type="text"
                    name="slug"
                    className={'input'}
                    placeholder={"Slug"}
                    onChange={this.handleChange}
                    value={curStatic.slug}
                />
                <label htmlFor="title" className={'label'}>Nom</label>
                <input
                    type="text"
                    name="title"
                    className={'input'}
                    placeholder={"Titre"}
                    onChange={this.handleChange}
                    value={curStatic.title}
                />
                <InputTextArray
                    label={'Textes'}
                    name={'texts'}
                    placeholder={'Textes'}
                    values={curStatic.texts}
                    onChange={this.handleArrayChange}
                />
                <button
                    className={'button is-info '}
                    type="submit"
                >
                    {this.state.isEdit ? <FaEdit/> : <FaPlus/>}
                </button>
            </form>
        );
    }
}
