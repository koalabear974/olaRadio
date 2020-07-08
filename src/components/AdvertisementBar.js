import React, {Component} from "react";
import PropTypes from "prop-types";

import "./../styles/components/AdvertisementBar.css";
import base from "../db/config";
import _ from "lodash";
import Marquee from "react-double-marquee";

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

                let curTexts = curPage.texts ? curPage.texts.filter(function (el) {
                    return !(el == null || el.trim() === "");
                }) : [];

                // BAD
                // BAD
                // BAD
                // BAD
                // BAD
                if(curTexts.length >= 1){
                    this.moveStyling();
                }

                this.setState({
                    curPage: curPage,
                    curTexts: curTexts,
                });
            }
        });
    }

    moveStyling() {
        let el = document.getElementById("InformationPanel__title-container");
        if(el !== null) {
            // el.style.borderTop = "0px solid black";
        }
        el = document.getElementById("InformationPanel__panel");
        if(el !== null) {
            // el.style.borderTop = "0px solid black";
        }
        el = document.getElementById("RadioBox");
        if(el !== null) {
            el.style.top = "30px";
        }
        el = document.getElementById("CookieWarning");
        if(el !== null) {
            el.style.bottom = "30px";
        }
    }

    render() {
        if(this.state.curTexts.length === 0) {
            return "";
        }

        let curTexts = this.state.curTexts;

        return (
            <div id="AdvertisementBar--present" className={'AdvertisementBar'}>
                <Marquee direction={'left'} childMargin={'200'} >
                    {curTexts.map((i) => {return i;})}
                </Marquee>
            </div>
        );
    }
}
