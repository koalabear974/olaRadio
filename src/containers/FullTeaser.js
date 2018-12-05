import React, {Component} from "react";
import {FaFacebook, FaInstagram} from "react-icons/fa/index";

import "../styles/Home.css"

export default class FullTeaserPage extends Component {
    constructor(props) {
        super(props);

        let seconds = (new Date).getSeconds();
        let rotation = seconds * 6;

        this.state = {
            rotation: rotation,
        };

        this.animateRotation = this.animateRotation.bind(this);
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.animateRotation();
        });
    }

    animateRotation() {
        let seconds = (new Date).getSeconds();
        let rotation = (seconds === 0) ? 360 : seconds * 6;
        this.setState({rotation: rotation});
        requestAnimationFrame(() => {
            this.animateRotation();
        });
    }


    render() {
        return (
            <div className={'Teaser'}>
                <img
                    className={'Teaser__logo'}
                    src={'images/logo_black.svg'}
                    alt={'Olaradio logo'}
                />
                <span
                    className={'Teaser__text'}
                >
                    Rendez-vous en janvier 2019.
                </span>
                <span
                    className={'Teaser__links'}
                >
                    <a className={'Teaser__link'} target={'blank'} href="https://www.facebook.com/Ola-Radio-2003400579719885/">
                        <FaFacebook className="Teaser__icon Teaser__links-fb"/>
                    </a>
                    <a className={'Teaser__link'} target={'blank'} href="https://www.instagram.com/ola_radio/">
                        <FaInstagram className="Teaser__icon Teaser__links-ig"/>
                    </a>
                </span>

                <div
                    className="TurnTable"
                    style={{
                        transform: 'rotate(' + this.state.rotation + 'deg)',
                        transition: 'all 1s linear',
                    }}
                >
                    <div className="TurnTable__disk"></div>
                </div>
            </div>
        );
    }
}
