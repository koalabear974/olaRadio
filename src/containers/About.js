import React, { Component} from "react";
import _ from 'lodash';

import "../styles/containers/About.css"

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staticPages: {},
            curPage: {},
            loading: true,
        };
    }

    componentWillUpdate(nextProps) {
        console.log("apropo update", nextProps.staticPages);
        if (!_.isEmpty(nextProps.staticPages) && _.isEmpty(this.state.staticPages)) {
            let curPage = _.find(nextProps.staticPages, (v) => {
                return v.slug === 'about';
            });
            this.setState({
                staticPages: nextProps.staticPages,
                curPage: curPage,
                loading: false,
            })
        }
    }

    render() {
        let curPage = this.state.curPage;
        console.log("abotu render ", curPage);
        if (this.state.loading || _.isEmpty(curPage) || _.size(curPage.texts)<3) {
            return <div>loading</div>
        }
        return (
            <div className={'About'}>
                <header className={'About__header'}>
                    {curPage.title}
                </header>
                <div className={'About__container'}>
                    <section className={'About__left'}>
                        <article
                            className={'About__text About__text--0'}
                            key={'About__text--0'}
                        >
                            {curPage.texts[0]}
                        </article>
                        <article
                            className={'About__text About__text--1'}
                            key={'About__text--1'}
                        >
                            {curPage.texts[1]}
                        </article>
                        <article
                            className={'About__text About__text--2'}
                            key={'About__text--2'}
                        >
                            {curPage.texts[2]}
                        </article>
                    </section>
                    <aside className={'About__right'}>
                        <article
                            className={'About__text About__text--3'}
                            key={'About__text--3'}
                        >
                            {curPage.texts[3]}
                        </article>
                    </aside>
                </div>
            </div>
        );
    }
}
