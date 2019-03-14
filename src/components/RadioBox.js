import React, {Component} from "react";
import PropTypes from "prop-types";

import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';

import "./../styles/components/RadioBox.css";
import {FaPause, FaPlay} from "react-icons/fa/index";
import _ from "lodash";

const CurrentSongUrl = "https://www.radioking.com/widgets/currenttrack.php?radio=190519&format=json";
const PlayerUrl = "https://www.radioking.com/play/ola-radio";

const sourceFilter = [
    "mixcloud"
];

export default class RadioBox extends Component {
    static propTypes = {
        externalLink: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            currentSong: null,
            marqueeLoop: false,
            externalWidgetLink: "",
            externalLink: this.props.externalLink,
        };

        this.togglePlay = this.togglePlay.bind(this);
        this.onExternalQuit = this.onExternalQuit.bind(this);
        this.onCanPlay = this.onCanPlay.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.audioPlayer = React.createRef();
    }

    componentWillUpdate(nextProps){
        if(nextProps.externalLink !== this.state.externalLink) {
            let passFilter = false;
            _.forEach(sourceFilter, (source) => {
                if(nextProps.externalLink.match(source)) {
                    passFilter = true;
                }
            });
            if(passFilter) {
                console.log("update external link", nextProps.externalLink);
                let widgetLink = "https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fola_radio%2F";
                let array = nextProps.externalLink.split("/");
                let strippedLink = array[array.length - 1] === "" ? array[array.length - 2] : array[array.length - 1];
                widgetLink = widgetLink + strippedLink + "%2F";

                this.setState({
                    externalLink: nextProps.externalLink,
                    externalWidgetLink: widgetLink,
                    isPlaying: false,
                });
            }
        }
    }

    componentDidMount(){
        this.audioPlayer.current.audioEl.addEventListener('error', function(e) {
            console.log('uh oh');
            console.log(e);
            this.setState({isPlaying: false});
        });

        this.fetchData();
    }

    togglePlay() {
        if(this.state.isPlaying) {
            this.audioPlayer.current.audioEl.pause();
        } else {
            try {
                this.audioPlayer.current.audioEl.play();
            } catch (e) {
                console.log(e);
            }
        }
        this.setState({isPlaying: !this.state.isPlaying});
    }

    onExternalQuit() {
        this.setState({
            externalLink: "",
            externalWidgetLink: "",
            isPlaying: false,
        });
        this.props.onEmissionClear();
    }

    onCanPlay() {
        // Todo find a solution
        // this.togglePlay();
    }

    fetchData() {
        fetch(CurrentSongUrl)
            .then(response => response.json())
            .then(json => {
                console.log("Fetching new current song.");
                this.setState({
                    currentSong: json,
                });
                let endAt = moment(json.end_at, "YYYY-MM-DDTHH:mm:ssZ").utc();
                let nowM = moment.utc();

                let timeSpan = endAt.diff(nowM);
                timeSpan = timeSpan >= 10000 ? timeSpan : 10000;

                console.log("Next fetch in: "+timeSpan+" at "+moment.utc().add(timeSpan).format()+" song finish at: "+json.end_at);
                setTimeout(
                    this.fetchData,
                    timeSpan,
                )
            }).catch(error => {
                this.setState({
                    currentSong: null,
                });
                console.error('Error:', error);

                setTimeout(
                    this.fetchData,
                    10000
                )
            });
    }

    render() {
        let currentSong = this.state.currentSong;
        let formattedCurrentSong = currentSong ? currentSong.artist + ' - '+ currentSong.title : '';
        let isExternalLink = this.state.externalLink && this.state.externalWidgetLink;

        if (isExternalLink) {
            return (
                <div className={'RadioBox'}>
                    <h3 className={'RadioBox__head'}>
                        Emission
                        <button
                            className={'RadioBox__head-close'}
                            onClick={this.onExternalQuit}
                        >
                            X
                        </button>
                    </h3>
                    <div className={'RadioBox__external-box'}>
                        <iframe
                            className={'RadioBox__external-player'}
                            src={this.state.externalWidgetLink}
                                frameBorder="0">
                        </iframe>
                    </div>
                </div>
            );
        }

        return (
            <div className={'RadioBox'}>
                <h3 className={'RadioBox__head'}>
                    Direct
                    {this.state.isPlaying && <div className={'RadioBox__redDot blink'}></div>}
                </h3>

                <ReactAudioPlayer
                    src={PlayerUrl}
                    onCanPlay={this.onCanPlay}
                    ref={this.audioPlayer}
                    title={'Ola Radio | ' + formattedCurrentSong}
                    poster={'images/logo_black.svg'}
                />

                {
                    currentSong &&
                    <article className={'RadioBox__emission'}>
                        <header className={'Emission__title marquee'}>
                            <div>
                                <span className={'marquee__text'}>
                                    {formattedCurrentSong}
                                </span>
                                <span className={'marquee__text'}>
                                    {formattedCurrentSong}
                                </span>
                            </div>
                        </header>
                    </article>
                }

                <div className={'RadioBox__player'}>
                    <button
                        className={'RadioBox__control'}
                        onClick={this.togglePlay}
                    >
                        {
                            this.state.isPlaying ?
                                <FaPause /> :
                                <FaPlay />
                        }
                    </button>
                </div>
            </div>
        );
    }
}
