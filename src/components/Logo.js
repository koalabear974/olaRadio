import React, {Component} from "react";
import PropTypes from "prop-types";
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
                    <span className={'LogoContainer__logo'}>OLA</span>
                </Link>
            </div>
        );
    }
}
