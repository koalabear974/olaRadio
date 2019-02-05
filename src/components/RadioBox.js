import React, {Component} from "react";

import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment';

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
                let endAt = moment(json.end_at, "YYYY-MM-DDTHH:mm:ssZ");
                let nowM = moment();

                let timeSpan = endAt.diff(nowM);
                timeSpan = timeSpan >= 10000 ? timeSpan : 10000;

                console.log("Next fetch in: "+timeSpan+" at "+moment().add(timeSpan).format()+" song finish at: "+endAt.format());
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
