import React, {Component} from "react";
import PropTypes from "prop-types";

import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';

import "./../styles/components/RadioBox.css";
import {FaPause, FaPlay} from "react-icons/fa/index";
import Marquee from "react-double-marquee";
import _ from "lodash";

const CurrentSongUrl = "https://www.radioking.com/widgets/currenttrack.php?radio=190519&format=json";
const PlayerUrl = "https://www.radioking.com/play/ola-radio";

const sourceFilter = [
    "mixcloud",
    "soundcloud"
];

function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

export default class RadioBox extends Component {
    static propTypes = {
        externalLink: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            currentSong: null,
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
                this.setState({
                    externalLink: nextProps.externalLink,
                    isPlaying: false,
                });

                this.audioPlayer.current.audioEl.pause();
            } else {
                this.onExternalQuit();
            }
        }
    }

    componentDidMount(){
        let that = this;
        this.audioPlayer.current.audioEl.addEventListener('error', function(e) {
            console.log('uh oh');
            console.log(e);
            that.setState({isPlaying: false});
            that.audioPlayer.current.audioEl.pause();
        });

        this.fetchData();
    }

    togglePlay() {
        let isExternalLink = !!this.state.externalLink;
        if(isExternalLink) {
            return;
        }

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
            isPlaying: false,
        });

        this.audioPlayer.current.audioEl.pause();

        if(this.props.onEmissionClear) {
            this.props.onEmissionClear();
        };
    }

    onCanPlay() {
        // Todo find a solution
        // this.togglePlay();
    }

    fetchData() {
        timeout(5000, fetch(CurrentSongUrl))
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

    computeFormattedCurrentSong(currentSong) {
        if (!currentSong) {
            return ''
        }

        // nom de la track + nom de l'artiste + playlist
        // Otherwise unknown
        let f = '';
        f += currentSong.title ? currentSong.title : 'Unknown';
        
        if (currentSong.artist) {
            f += ' - ' + currentSong.artist;
        }
        if (currentSong.album) {
            f += ' - ' + currentSong.album;
        }

        return f;
    }

    render() {
        let currentSong = this.state.currentSong;
        let formattedCurrentSong = this.computeFormattedCurrentSong(currentSong);
        let isExternalLink = !!this.state.externalLink;

        return (
            <div
                className={'RadioBox'}
                id={'RadioBox'}
            >
                <h3 className={'RadioBox__head'}>
                    Direct
                    {this.state.isPlaying && <div className={'RadioBox__blackDot blink'}></div>}
                </h3>

                <ReactAudioPlayer
                    src={PlayerUrl}
                    onCanPlay={this.onCanPlay}
                    ref={this.audioPlayer}
                    title={'Ola Radio | ' + formattedCurrentSong}
                    poster={'images/logo_black.svg'}
                    preload={'none'}
                />

                {
                    currentSong &&
                    <article className={'RadioBox__emission'}>
                        <header className={'Emission__title'}>
                            <Marquee direction={'left'} childMargin={'50'}>
                                {formattedCurrentSong}
                            </Marquee>
                        </header>
                    </article>
                }

                <div className={'RadioBox__player'}>
                    <button
                        className={'RadioBox__control '
                        + (isExternalLink ? 'RadioBox__control--disabled' : '')
                        + (this.state.isPlaying ? 'RadioBox__control--playing' : '')
                        }
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
