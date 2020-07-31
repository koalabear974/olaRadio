import React, {Component} from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import {NavLink} from "react-router-dom";

import "./../styles/components/Navigation.css";
import {FaFacebook, FaInstagram} from "react-icons/fa/index";

export default class Navigation extends Component {
    static propTypes = {
        pageArray: PropTypes.array,
        currentPage: PropTypes.string,
        setCurrentPage: PropTypes.func
    };

    render() {
        let { pageArray } = this.props;
        return (
            <nav className={'NavigationBar'}>
                {pageArray.map(page => (
                    <NavLink
                        className={'NavigationBar__link'}
                        activeClassName={'NavigationBar__link--active'}
                        to={"/" + page.path}
                        key={uuidv1()}>
                        <span>{page.text}</span>
                    </NavLink>
                ))}
                <a
                    href='https://www.helloasso.com/associations/ola-radio/formulaires/1/widget'
                    target='_blank'
                    className={'NavigationBar__link'}>
                    <span>Donate</span>
                </a>
                <li className={'NavigationBar__social hidden'} >
                    <a className={'Social__link'} target={'blank'} href="https://www.facebook.com/Ola-Radio-2003400579719885/">
                        <FaFacebook className="Teaser__icon Teaser__links-fb"/>
                    </a>
                    <a className={'Social__link'} target={'blank'} href="https://www.instagram.com/ola_radio/">
                        <FaInstagram className="Teaser__icon Teaser__links-ig"/>
                    </a>
                </li>
            </nav>
        );
    }
}
