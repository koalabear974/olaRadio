import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from 'lodash';
import Cookies from 'universal-cookie';


import "./../styles/common/TopBarQuestion.css";

export default class TopBarQuestion extends Component {
    static propTypes = {
        categories: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.cookies = new Cookies();

        this.state = {
            curAnswer: this.cookies.get('currentAnswer') ? this.cookies.get('currentAnswer') : '',
        };

        this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleAnswer(event) {
        let value = event.target.dataset.value;
        this.cookies.set('currentAnswer', value, { path: '/' })
        this.setState({curAnswer: value})
    }

    render() {
        let question = this.props.question;

        if (_.isEmpty(question)) {
            return null;
        }

        return (
            <section className={'TopBarQuestion'}>
                <span className={'TopBarQuestion__question'}>
                    {question.question}
                </span>
                <ul className={'TopBarQuestion__answers'}>
                    <li className={'TopBarQuestion__answer TopBarQuestion__answer--separator'}>	&#8226;&#8226;</li>
                    <li className={'TopBarQuestion__answer TopBarQuestion__answer--separator'}>	&#8226;&#8226;</li>
                    {question.answers.map((answer, index) => {
                        return (
                            <li
                                key={answer}
                                data-value={answer}
                                className={
                                    'TopBarQuestion__answer '+
                                    (this.state.curAnswer === answer ? ' TopBarQuestion__answer--active' : '')+
                                    ' order'+index}
                                onClick={this.handleAnswer}
                            >
                                {answer}
                            </li>
                        );
                    })}
                </ul>
            </section>
        );
    }
}
