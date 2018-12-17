import React, {Component} from "react";
import PropTypes from "prop-types";
import base from "../../db/config";
import QuestionForm from "./common/Question/QuestionForm";
import QuestionList from "./common/Question/QuestionList";


export default class QuestionAdminComponent extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);

        this.state = {
            questions: {},
            currentQuestion: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    componentWillMount() {
        this.questionsRef = base.syncState('questions', {
            context: this,
            state: 'questions'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.questionsRef);
    }

    handleSubmit(question) {
        const questions = {...this.state.questions};
        const id = question.id ? question.id : Date.now();
        questions[id] = {
            id: id,
            question: question.question,
            answers: question.answers,
            active: question.active,
        };

        this.setState({
            questions: questions,
            currentQuestion: {},
        });
    }

    handleEditClick(key) {
        this.setState({
            currentQuestion: this.state.questions[key]
        });
    }

    render() {
        const questionsArray = this.state.questions;
        const currentQuestion = this.state.currentQuestion;
        return (
            <div className="QuestionAdminComponent">
                <QuestionList
                    questions={questionsArray}
                    handleEditClick={this.handleEditClick}
                />

                <QuestionForm
                    editQuestion={currentQuestion}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}
