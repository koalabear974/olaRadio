import React, { Component} from "react";
import _ from 'lodash';
import base from "../db/config";

import "../styles/containers/About.css"

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staticPages: {},
            curPage: {},
            curImages: {},
            loading: true,
        };
    }

    componentDidMount() {
        base.fetch('statics', {
            context: this,
            then(data) {
                let curPage = _.find(data, (v) => {
                    return v.slug === 'about';
                });
                let curImages = _.find(data, (v) => {
                    return v.slug === 'about-images';
                });
                this.setState({
                    staticPages: data,
                    curPage: curPage,
                    curImages: curImages,
                })
            }
        });
    }

    render() {
        let curPage = this.state.curPage;
        let curImages = this.state.curImages;

        if (_.isEmpty(curPage) || _.size(curPage.texts)<3) {
            return <div className={'Loading'}>
                <img
                    className={'Loading__logo'}
                    src={'images/logo_black.svg'}
                    alt={'Olaradio logo'}
                />
            </div>
        }
        return (
            <div className={'About'}>
                <header className={'About__header'}>
                    {curPage.title}
                </header>
                <div className={'About__container'}>
                    <section className={'About__left'}>
                        <article
                            className={'About__article About__article--0'}
                            key={'About__article--0'}
                        >
                            <div className="About__articleBorder"></div>
                            <div className="About__imageContainer">
                                <img className={'About__images'} src={curImages.texts[0]} alt="Créateur n.1"/>
                            </div>
                            <p className={'About__text'}>
                                {curPage.texts[0]}
                            </p>
                        </article>
                        <article
                            className={'About__article About__article--1'}
                            key={'About__article--1'}
                        >
                            <div className="About__articleBorder"></div>
                            <div className="About__imageContainer">
                                <img className={'About__images'} src={curImages.texts[1]} alt="Créateur n.1"/>
                            </div>
                            <p className={'About__text'}>
                                {curPage.texts[1]}
                            </p>
                        </article>
                        <article
                            className={'About__article About__article--2'}
                            key={'About__article--2'}
                        >
                            <div className="About__articleBorder"></div>
                            <div className="About__imageContainer">
                                <img className={'About__images'} src={curImages.texts[2]} alt="Créateur n.1"/>
                            </div>
                            <p className={'About__text'}>
                                {curPage.texts[2]}
                            </p>
                        </article>
                    </section>
                    {/*<aside className={'About__right'}>*/}
                        {/*<article*/}
                            {/*className={'About__article About__article--3'}*/}
                            {/*key={'About__article--3'}*/}
                        {/*>*/}
                            {/*{curPage.texts[3]}*/}
                        {/*</article>*/}
                    {/*</aside>*/}
                </div>
            </div>
        );
    }
}
