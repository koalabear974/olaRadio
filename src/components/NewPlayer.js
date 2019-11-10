import React, {Component} from "react";
import PropTypes from "prop-types";

import "./../styles/components/RadioBox.css";
import _ from "lodash";
import SoundCloudAudio from 'soundcloud-audio';
import * as http from "stream-http";

const sourceFilter = [
    "mixcloud",
    "soundcloud"
];

export default class NewPlayer extends Component {
    static propTypes = {
        emission: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            moduleType: "",
            externalWidgetLink: "",
            emission: this.props.emission,
        };

        this.onExternalQuit = this.onExternalQuit.bind(this);
    }

    componentWillUpdate(nextProps){
        if(nextProps.emission && nextProps.emission.link !== this.state.emission.link) {
            let passFilter = false;
            _.forEach(sourceFilter, (source) => {
                if(nextProps.emission.link.match(source)) {
                    passFilter = source;
                }
            });

            if(passFilter) {
                // console.log("update external "+passFilter+" link", nextProps.externalLink);
                let widgetLink = "";
                switch (passFilter) {
                    case "mixcloud":
                        widgetLink = "https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=1&feed=%2Fola_radio%2F";

                        let array = nextProps.emission.link.split("/");
                        let strippedLink = array[array.length - 1] === "" ? array[array.length - 2] : array[array.length - 1];
                        widgetLink = widgetLink + strippedLink + "%2F";
                        break;
                    case "soundcloud":
                        widgetLink = "https://w.soundcloud.com/player/?url=" +
                            encodeURI(nextProps.emission.link) + "&" +
                            "color=%23ff5500&inverse=false&auto_play=false&show_user=true";
                        break;
                    default:
                        break;
                }
                this.setState({
                    moduleType: passFilter,
                    emission: nextProps.emission,
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

    generatePlayUrl() {
        switch (this.state.moduleType) {
            case "mixcloud":
                return '';
            case "soundcloud":
                return this.soundcloudUrl(this.state.externalLink);
            default:
                return ("");
        }

    }

    soundcloudUrl(externalLink) {
        // create new instance of audio
        // clientId is optional but without it you cannot play tracks directly from SoundCloud API
        const scPlayer = new SoundCloudAudio('32cf5214879b701f8572959b0a0ab630');
        //b5e21578d92314bc753b90ea7c971c1e
        //95f22ed54a5c297b1c41f72d713623ef
        //95f22ed54a5c297b1c41f72d713623ef
        //95f22ed54a5c297b1c41f72d713623ef
        //95f22ed54a5c297b1c41f72d713623ef
        //309011f9713d22ace9b976909ed34a80
        // OR if you need to load a SoundCloud track and resolve it's data
        //streamurl
        // https://api.soundcloud.com/tracks/681545132/stream?client_id=[]
        scPlayer.resolve('https://soundcloud.com/user-941225505/vazko-sommeil-live-cover-stromae', function(track) {
            // do smth with track object
            // e.g. display data in a view etc.
            console.log(track);

            // once track is loaded it can be played
            scPlayer.play();

            // stop playing track and keep silence
            scPlayer.pause();
        });

        scPlayer.on('timeupdate', function() {
            console.log(scPlayer.audio.currentTime);
        });
        scPlayer.on('ended', function() {
            console.log(scPlayer.track.title + ' just ended!');
        });
    }

    async mixcloudUrl(externalLink) {
        const options = {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
            },
            followRedirect: false
        };

        //externalLink = 'https://cas.univ-tln.fr/cas/login?service=https%3A%2F%2Fidp.univ-tln.fr%2Fidp%2FAuthn%2FExtCas%3Fconversation%3De1s1&entityId=https%3A%2F%2Fsp.partage.renater.fr%2Funiv-tln'

        var name = "codemzy";
        //var url = "http://anyorigin.com/go?url=" + encodeURIComponent(externalLink) + name + "&callback=?";
        var url = "http://www.whateverorigin.org/" + encodeURIComponent("https://audio12.mixcloud.com/secure/dash2/6/6/f/0/6bcc-0944-460e-b7bf-dc5e5ed7f3f9.m4a/manifest.mpd")+ '&callback=?';
        //request.get(url, function(response) {  console.log(response);});
        //var url = "https://crossorigin.me/" + ("https://audio12.mixcloud.com/secure/dash2/6/6/f/0/6bcc-0944-460e-b7bf-dc5e5ed7f3f9.m4a/manifest.mpd")
        
        http.get(url, function (res) {
            var div = document.getElementById('result');
            div.innerHTML += 'GET /beep<br>';

            res.on('data', function (buf) {
                div.innerHTML += buf;
            });

            res.on('end', function () {
                div.innerHTML += '<br>__END__';
            });
        })
    }

    render() {
        let isExternalLink = this.state.externalLink && this.state.externalWidgetLink;
        return (
            <div className={'ExternalPlayer'}>
                aa
            </div>
        );
    }
}
