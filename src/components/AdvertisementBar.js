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
        let speed = curTexts.length >= 1 ? curTexts[0].length/4.5 : 0 ;
        // let el = document.getElementById("AdvertisementBar__marquee");
        let style = {
            "MozAnimationDuration": speed+"s",
            "WebkitAnimationDuration": speed+"s",
            "animationDuration": speed+"s"
        };


        return (
            <div id="AdvertisementBar--present" className={'AdvertisementBar'}>
                <span id="AdvertisementBar__marquee" className="AdvertisementBar__marquee" style={style}>
                    {curTexts.map((i) => {return i;})}
                </span>
            </div>
        );
    }
}
