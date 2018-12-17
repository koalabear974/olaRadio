import React, {Component} from "react";
import {FaEdit, FaPlus} from "react-icons/fa/index";
import PropTypes from "prop-types";
import _ from "lodash";
import InputTextArray from "../forms/InputTextArray";

export default class QuestionForm extends Component {
    static propTypes = {
        editQuestion: PropTypes.Object,
        handleSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            question: {
                question: "",
                answers: [],
                active: false,
                id: "",
            },
            isEdit: false,
        };

        if (!_.isEmpty(this.props.editQuestion)) {
            this.state = {
                question: {
                    question: this.props.editQuestion.question,
                    answers: this.props.editQuestion.answers,
                    active: this.props.editQuestion.active,
                    id: this.props.editQuestion.id,
                },
                isEdit: true,
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleArrayChange = this.handleArrayChange.bind(this);
        this.onQuestionSubmit = this.onQuestionSubmit.bind(this);
    }

    onQuestionSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.question);
        this.setState({
            question: {
                question: "",
                answers: [],
                active: false,
                id: "",
            },
            isEdit: false,
        })
    }

    componentDidUpdate() {
        if (!_.isEmpty(this.props.editQuestion) && this.props.editQuestion.id !== this.state.question.id) {
            this.setState({
                question: {
                    question: this.props.editQuestion.question,
                    answers: this.props.editQuestion.answers,
                    active: this.props.editQuestion.active,
                    id: this.props.editQuestion.id,
                },
                isEdit: true,
            });
        }
    }

    handleArrayChange(values) {
        let curValue = this.state.question;
        curValue['answers'] = values;

        this.setState({
            question: curValue
        });
    }

    handleChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (target.type === 'select-multiple') {
            let options = target.options;
            value = [];
            for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
        }
        let curValue = this.state.question;
        curValue[name] = value;

        this.setState({
            question: curValue
        });
    }

    render() {
        let question = this.state.question;
        return (
            <form
                className="QuestionAdminComponent__form pure-form"
                onSubmit={this.onQuestionSubmit}
            >
                <legend>{this.state.isEdit ? 'Editer' : 'Ajouter'} une question</legend>


                <fieldset className={'pure-group'}>
                    <label htmlFor="question">Question</label>
                    <input
                        type="text"
                        className={'pure-input-1-2'}
                        name="question"
                        placeholder={"Question"}
                        value={question.question}
                        onChange={this.handleChange}
                    />

                    <InputTextArray
                        label={'Réponses'}
                        name={'answers'}
                        placeholder={'Réponses'}
                        values={question.answers}
                        onChange={this.handleArrayChange}
                    />

                    <label className="pure-checkbox flex">
                        <input
                            type="checkbox"
                            name="active"
                            checked={question.active}
                            onChange={this.handleChange}
                        /> est active?
                    </label>
                </fieldset>
                <button
                    className={'QuestionAdminComponent__button pure-button pure-button-primary pure-input-1-2'}
                    type="submit"
                >
                    {this.state.isEdit ? <FaEdit/> : <FaPlus/>}

                </button>
            </form>
        );
    }
}
