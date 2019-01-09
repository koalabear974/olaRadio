import React, {Component} from "react";
import {Link} from "react-router-dom";

import "./../styles/components/Logo.css";

export default class Logo extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div className={'LogoContainer'}>
                <Link
                    className={'LogoContainer__link'}
                    to={'/'}
                >
                    <img
                        className={'LogoContainer__logo'}
                        src={'images/logo_black.svg'}
                        alt={'Logo of the website'}
                    />
                </Link>
            </div>
        );
    }
}
