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
        curPage: PropTypes.object,
        onEmissionClick: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let curPage = this.props.curPage;
        return (
            <div className={'MainPage'}>
                <TopBarQuestion
                    className={'MainPage__topQuestion'}
                    question={this.props.curQuestion}
                />
                <article className={'MainPage__main-article'}>
                    <EmissionCalendar
                        emissions={this.props.emissions}
                        onEmissionClick={this.props.onEmissionClick}
                    />
                    <aside className={'MainPage__aside'}>
                        <header className={'MainPageAside__header'}>
                            {curPage.title}
                        </header>
                        <article className={'MainPageAside__text'}>
                            {curPage.texts[0]}
                        </article>
                    </aside>
                </article>
            </div>
        );
    }
}
