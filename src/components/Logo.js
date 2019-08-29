import React, {Component} from "react";
import {Link} from "react-router-dom";

import "./../styles/components/Logo.css";

function detectMob() {
    return !!(navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i));
}

export default class Logo extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);

        this.state = {
        };

        this.logoPlayer = React.createRef();
    }

    componentDidMount() {
        let that = this;

        if(this.logoPlayer && this.logoPlayer.current) {
            this.logoPlayer.current.addEventListener("canplay", function() {
                setTimeout(function() {
                    that.logoPlayer.current.play();
                }, 1000);
            });

            this.logoPlayer.current.addEventListener("ended", function() {
                setTimeout(function() {
                    that.logoPlayer.current.play();
                }, 1000);
            });
        }
    }

    render() {
        if(detectMob()) {
            return (
                <div className={'LogoContainer'}>
                    <Link
                        className={'LogoContainer__link'}
                        to={'/'}
                    >
                        <img className={'LogoContainer__logo'} src={"images/logoAnimated.png"} alt="Logo Ola Radio"/>
                    </Link>
                </div>
            );
        }

        return (
            <div className={'LogoContainer'}>
                <Link
                    className={'LogoContainer__link'}
                    to={'/'}
                >
                    <video
                        className={'LogoContainer__logo'}
                        muted
                        ref={this.logoPlayer}
                        playsinline
                        preload="yes"
                    >
                        <source src={'images/animatedLogo2.mp4'} type="video/mp4" />
                    </video>
                </Link>
            </div>
        );
    }
}
