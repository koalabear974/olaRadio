import React, {Component} from "react";
import PropTypes from "prop-types";

import "./../styles/components/RadioBox.css";
import _ from "lodash";

const sourceFilter = [
    "mixcloud",
    "soundcloud"
];

export default class ExternalPlayer extends Component {
    static propTypes = {
        externalLink: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            moduleType: "",
            externalWidgetLink: "",
            externalLink: this.props.externalLink,
        };

        this.onExternalQuit = this.onExternalQuit.bind(this);
        this.generateExternalIframe = this.generateExternalIframe.bind(this);
    }

    componentWillUpdate(nextProps){
        if(nextProps.externalLink !== this.state.externalLink) {
            let passFilter = false;
            _.forEach(sourceFilter, (source) => {
                if(nextProps.externalLink.match(source)) {
                    passFilter = source;
                }
            });

            if(passFilter) {
                // console.log("update external "+passFilter+" link", nextProps.externalLink);
                let widgetLink = "";
                switch (passFilter) {
                    case "mixcloud":
                        widgetLink = "https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=1&feed=%2Fola_radio%2F";

                        let array = nextProps.externalLink.split("/");
                        let strippedLink = array[array.length - 1] === "" ? array[array.length - 2] : array[array.length - 1];
                        widgetLink = widgetLink + strippedLink + "%2F";
                        break;
                    case "soundcloud":
                        widgetLink = "https://w.soundcloud.com/player/?url=" +
                            encodeURI(nextProps.externalLink) + "&" +
                            "color=%23ff5500&inverse=false&auto_play=false&show_user=true";
                        break;
                    default:
                        break;
                }
                this.setState({
                    moduleType: passFilter,
                    externalLink: nextProps.externalLink,
                    externalWidgetLink: widgetLink,
                    isPlaying: false,
                });
            } else {
                this.onExternalQuit();
            }
        }
    }

    componentDidMount(){
    }

    onExternalQuit() {
        this.setState({
            externalLink: "",
            externalWidgetLink: "",
            isPlaying: false,
        });

        if(this.props.onEmissionClear) {
            this.props.onEmissionClear();
        };
    }

    generateExternalIframe() {
        switch (this.state.moduleType) {
            case "mixcloud":
                return (
                    <iframe
                        className={'ExternalPlayer__external-player'}
                        width="100%" height="60"
                        src={this.state.externalWidgetLink}
                        frameBorder="0">
                    </iframe>
                );
            case "soundcloud":
                return (
                    <iframe
                        className={'ExternalPlayer__external-player'}
                        width="100%" height="100"
                        scrolling="no" frameBorder="no"
                        src={this.state.externalWidgetLink}
                        >
                    </iframe>
                );
            default:
                return ("");
        }

    }

    render() {
        let isExternalLink = this.state.externalLink && this.state.externalWidgetLink;

        if (isExternalLink) {
            return (
                <div className={'ExternalPlayer ' + ('ExternalPlayer--' + this.state.moduleType)}>
                    <div className={'ExternalPlayer__external-box'}>
                        { this.generateExternalIframe() }
                    </div>
                    <h3 className={'ExternalPlayer__head'}>
                        <button
                            className={'ExternalPlayer__head-close'}
                            onClick={this.onExternalQuit}
                        >
                            X
                        </button>
                    </h3>
                </div>
            );
        }

        return (
            <div className={'ExternalPlayer hidden'}>
            </div>
        );
    }
}
