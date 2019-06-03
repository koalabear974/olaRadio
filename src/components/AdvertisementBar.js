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

                // BAD
                // BAD
                // BAD
                // BAD
                // BAD
                if(curTexts.length >= 1){
                    let el = document.getElementById("InformationPanel__title-container");
                    if(el !== null) {
                        el.style.borderTop = "0px solid black";
                    }
                    el = document.getElementById("InformationPanel__panel");
                    if(el !== null) {
                        el.style.borderTop = "0px solid black";
                    }
                    el = document.getElementById("RadioBox");
                    if(el !== null) {
                        el.style.top = "30px";
                    }
                }

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
                <span className="AdvertisementBar__marquee">
                    {this.state.curTexts.map((i) => {return i;})}
                </span>
            </div>
        );
    }
}
