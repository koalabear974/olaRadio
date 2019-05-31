import React, {Component} from "react";
import PropTypes from "prop-types";

import "./../styles/components/AdvertisementBar.css";
import base from "../db/config";
import _ from "lodash";

export default class AdvertisementBar extends Component {
    static propTypes = {
        curPage: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            curPage: {},
            curTexts: [],
        };
    }

    componentDidMount() {
        base.fetch('statics', {
            context: this,
            then(data) {
                let curPage = _.find(data, (v) => {
                    return v.slug === 'pub';
                });

                let curTexts = curPage.texts.filter(function (el) {
                    return !(el == null || el.trim() === "");
                });

                this.setState({
                    curPage: curPage,
                    curTexts: curTexts,
                });
            }
        });
    }

    render() {
        if(this.state.curTexts.length === 0) {
            return "";
        }

        return (
            <div className={'AdvertisementBar'}>
                <marquee className="AdvertisementBar__marquee" behavior="scroll" direction="left">
                    {this.state.curTexts.map((i) => {return i;})}
                </marquee>
            </div>
        );
    }
}
