import React, { Component} from "react";

import "../styles/containers/InformationPanel.css"
import _ from "lodash";
import {FaFacebook, FaInstagram} from "react-icons/fa/index";
import Footer from "../components/Footer";

export default class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let curPage = this.props.infoPage;
        let curImages = this.props.infoImages;

        if (_.isEmpty(curPage) || _.size(curPage.texts)<1) {
            return (
                <div className="Information">
                    <div className={'Loading'}>
                        <img
                            className={'Loading__logo'}
                            src={'images/logo_black.svg'}
                            alt={'Olaradio logo'}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className={'Information'}>
                <div className={'Information__first-text'}>
                    {curPage.texts[0]}
                </div>
                <h3 className={'Information__title'}>{curPage.title}</h3>
                <div className={'Information__org'}>
                    {_.map(curPage.texts, (object, key) => {
                        if (key === 0) { return ;}
                        return (
                            <p className={'Information__org-item'} key={key}>
                                {curPage.texts[key]}
                            </p>
                        );
                    })}
                </div>
                <div className="Information__social">
                    <a target='_blank' href='https://www.helloasso.com/associations/ola-radio/formulaires/1/widget'
                        className="Social__link"
                    >
                        Nous soutenir
                    </a>
                    <a className='Social__link' target='blank' href="https://www.instagram.com/ola_radio/">
                        Instagram
                    </a>
                    <a className='Social__link' target='blank' href="https://www.facebook.com/Ola-Radio-2003400579719885/">
                        Facebook
                    </a>
                    <a className='Social__link' target='blank' href="https://soundcloud.com/ola_radio">
                        Soundcloud
                    </a>
                    <a className='Social__link' target='blank' href="https://www.mixcloud.com/ola_radio/">
                        Mixcloud
                    </a>
                </div>
                <Footer />
            </div>
        );
    }
}
