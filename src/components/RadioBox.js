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
            this.audioPlayer.current.audioEl.play();
        }
        this.setState({isPlaying: !this.state.isPlaying});
    }

    onCanPlay() {
        this.togglePlay();
    }

    fetchData() {
        fetch(CurrentSongUrl)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    currentSong: json,
                });

                let endTime = new Date(json.end_at);
                let now = new Date();

                setTimeout(
                    this.fetchData,
                    endTime - now + 1000
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
                                    {currentSong.title + ' - '+ currentSong.artist}
                                </span>
                                <span className={'marquee__text'}>
                                    {currentSong.title + ' - '+ currentSong.artist}
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
