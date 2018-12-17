import React, {Component} from "react";
import _ from "lodash";
import {FaEdit} from "react-icons/fa/index";
import PropTypes from "prop-types";

export default class QuestionList extends Component {
    static propTypes = {
        questions: PropTypes.arrayOf(Object),
        handleEditClick: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
        };

        this.onEditClick = this.onEditClick.bind(this);
    }

    onEditClick(key){
        this.props.handleEditClick(key);
    }

    render() {
        const questionsArray = this.props.questions;
        const that = this;
        return (
            <table className="QuestionAdminComponent__table pure-table-bordered pure-table">
                <thead>
                <tr key={'header'}>
                    <th>Id</th>
                    <th>Question</th>
                    <th>Réponse possible</th>
                    <th>est active?</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(questionsArray).map(function(key) {
                    return (
                        <tr key={key}>
                            <td>{questionsArray[key].id}</td>
                            <td>{questionsArray[key].question}</td>
                            <td>
                                <ul>
                                {questionsArray[key].answers.map((answer, index) => {
                                   return <li key={questionsArray[key].id+index+answer}>{answer}</li>
                                })}
                                </ul>
                            </td>
                            <td>{questionsArray[key].active ? 'Oui' : 'Non'}</td>
                            <td>
                                <button
                                    className={'pure-button pure-button-primary pure-input-1-2'}
                                    onClick={() => that.onEditClick(key)}
                                >
                                    <FaEdit />
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }
}
