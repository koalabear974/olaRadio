import React, {Component} from "react";
import {Link} from "react-router-dom";

import "./../styles/components/Logo.css";

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

    render() {
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
                    >
                        <source src={'images/animatedLogo2.mp4'} type="video/mp4" />
                    </video>
                </Link>
            </div>
        );
    }
}
