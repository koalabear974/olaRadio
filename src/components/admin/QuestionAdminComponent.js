import React, {Component} from "react";
import base from "../../db/config";
import QuestionForm from "./common/Question/QuestionForm";
import QuestionList from "./common/Question/QuestionList";
import _ from "lodash";


export default class QuestionAdminComponent extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);

        this.state = {
            questions: {},
            editQuestion: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
            editQuestion: {},
        });
    }

    handleDelete(id) {
        base.remove('questions/'+id);
        let questions = _.omit(this.state.questions, [id]);
        this.setState({
            questions: questions,
            editQuestion: {},
        });
    }

    handleEditClick(key) {
        this.setState({
            editQuestion: this.state.questions[key]
        });
    }

    render() {
        const questionsArray = this.state.questions;
        const editQuestion = this.state.editQuestion;
        return (
            <div className="QuestionAdminComponent">
                <QuestionList
                    questions={questionsArray}
                    handleEditClick={this.handleEditClick}
                />

                <QuestionForm
                    editQuestion={editQuestion}
                    handleSubmit={this.handleSubmit}
                    handleDelete={this.handleDelete}
                />
            </div>
        );
    }
}
