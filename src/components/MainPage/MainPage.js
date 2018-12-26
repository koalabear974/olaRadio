import React, {Component} from "react";
import PropTypes from "prop-types";

import "../../styles/components/MainPage.css"
import TopBarQuestion from "../../common/TopBarQuestion";
import _ from "lodash";
import EmissionCalendar from "../Emission/EmissionCalendar";

export default class MainPage extends Component {
    static propTypes = {
        categories: PropTypes.object,
        emissions: PropTypes.object,
        questions: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            questions: {},
            activeQuestion: {},
        };

        if (!_.isEmpty(this.props.questions)) {
            let questions = _.filter(this.props.questions, (o) => {
                return o.active
            });
            let curQuestion = _.isEmpty(questions) ? {} : questions[0];
            this.state = {
                questions: questions,
                activeQuestion: curQuestion,
            };
        }
    }

    componentDidUpdate() {
        if (!_.isEmpty(this.props.questions) && (_.size(this.props.questions) !== _.size(this.state.questions))) {
            let questions = _.filter(this.props.questions, (o) => {
                return o.active
            });
            let curQuestion = _.isEmpty(questions) ? {} : questions[0];
            this.setState({
                questions: questions,
                activeQuestion: curQuestion,
            })
        }
    }

    render() {

        return (
            <div className={'MainPage'}>
                <TopBarQuestion
                    className={'MainPage__topQuestion'}
                    question={this.state.activeQuestion}
                />
                <article className={'MainPage__main-article'}>
                    <EmissionCalendar
                        emissions={this.props.emissions}
                    />
                    <aside className={'MainPage__aside'}>

                    </aside>
                </article>
            </div>
        );
    }
}
