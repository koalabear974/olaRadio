import React, {Component} from "react";

import Marquee from 'react-text-marquee';
import ReactAudioPlayer from 'react-audio-player';

import "./../styles/components/RadioBox.css";
import {FaPause, FaPlay} from "react-icons/fa/index";

const CurrentSongUrl = "https://www.radioking.com/widgets/currenttrack.php?radio=190519&format=json";
const PlayerUrl = "https://www.radioking.com/play/ola-radio";

export default class RadioBox extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            currentSong: null,
            marqueeLoop: false,
        };

        this.togglePlay = this.togglePlay.bind(this);
        this.onCanPlay = this.onCanPlay.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.audioPlayer = React.createRef();
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
                let now = new Date();
                let endTime = (new Date(json.end_at.substr(0,19))).addHours(((-now.getTimezoneOffset())/60));
                let timeSpan = (endTime.getTime() - now.getTime()) > 0 ? endTime.getTime() - now.getTime(): 10000;
                console.log("Next fetch in: "+timeSpan);
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
                />

                {
                    currentSong &&
                    <article className={'RadioBox__emission'}>
                        <header className={'Emission__title marquee'}>
                            <div>
                                <span className={'marquee__text'}>
                                    {currentSong.artist + ' - '+ currentSong.title}
                                </span>
                                <span className={'marquee__text'}>
                                    {currentSong.artist + ' - '+ currentSong.title}
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
