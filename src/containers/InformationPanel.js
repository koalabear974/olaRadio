import React, { Component} from "react";
import _ from 'lodash';
import base from "../db/config";

import "../styles/containers/InformationPanel.css"
import Information from "./Information";

const PANEL_WIDTH_ZERO = 0;
const PANEL_WIDTH_OPEN = 40;
function simple_easing(how_much_time_has_passed) {
    return (1 - Math.cos(how_much_time_has_passed * Math.PI)) / 2;
}

export default class InformationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staticPages: {},
            curPage: {},
            curImages: {},
            isOpen: false,
            loading: true,
            panelOpen: 0,
        };
        this.onOpenClick= this.onOpenClick.bind(this);
        this.animatePanel = this.animatePanel.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
    }

    onOpenClick(e) {
        e.preventDefault();
        this.togglePanel();
    }

    togglePanel() {
        this.animatePanel(!this.state.isOpen, Date.now());
        this.setState({isOpen: !this.state.isOpen});
    }

    animatePanel(isOpen, start) {
        let duration = 550;
        let now = Date.now();
        if (now - start >= duration) return;
        if (this.state.panelOpenPx <= 0 && !isOpen) return;
        let p = (now - start) / duration;
        if (isOpen) {
            let panelOpenPx = Math.round(PANEL_WIDTH_OPEN * simple_easing(p));
            this.setState({panelOpenPx: panelOpenPx});
            if (panelOpenPx >= PANEL_WIDTH_OPEN) return;
            requestAnimationFrame(() => {
                this.animatePanel(isOpen, start);
            });
        } else {
            let panelOpenPx = Math.round(PANEL_WIDTH_OPEN - (PANEL_WIDTH_OPEN * simple_easing(p)));
            this.setState({panelOpenPx: panelOpenPx});
            if (panelOpenPx <= 0) return;
            requestAnimationFrame(() => {
                this.animatePanel(isOpen, start);
            });
        }
    }

    componentDidMount() {
        base.fetch('statics', {
            context: this,
            then(data) {
                let curPage = _.find(data, (v) => {
                    return v.slug === 'infos';
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


        return (
            <div className={'InformationPanel'}>
                <div className="InformationPanel__title-container" onClick={this.onOpenClick}>
                    <div className="InformationPanel__title">
                        Informations
                    </div>
                </div>
                <div
                    className={
                        "InformationPanel__panel "
                    }
                    style={{
                        left: -(this.state.panelOpenPx + PANEL_WIDTH_ZERO) + 'vw',
                    }}
                >
                    <Information infoPage={curPage} infoImage={curImages} />
                </div>
            </div>
        );
    }
}
