import React, {Component} from "react";

import "../../styles/components/MainPage.css"
import TopBarQuestion from "../../common/TopBarQuestion";

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const emissionsArray = this.props.emissions;
        return (
            <div className={'MainPage'}>
                <TopBarQuestion
                    className={'MainPage__topQuestion'}
                />
                <article className={'MainPage__main-article'}>
                    <section className={'MainPage__emissionList'}>

                    </section>
                    <aside className={'MainPage__aside'}>

                    </aside>
                </article>
            </div>
        );
    }
}
