import React, { Component} from "react";
import _ from 'lodash';
import base from "../db/config";

import "../styles/containers/InformationPanel.css"

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
            return (
                <div className="InformationPanel">
                    <div className={'Loading'}>
                        <img
                            className={'Loading__logo'}
                            src={'images/logo_black.svg'}
                            alt={'Olaradio logo'}
                        />
                    </div>
                </div>
            );
        }
        return (
            <div className={'InformationPanel'}>

            </div>
        );
    }
}
