import React, {Component} from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import {NavLink} from "react-router-dom";

import "./../styles/components/Navigation.css";

export default class Navigation extends Component {
    static propTypes = {
        pageArray: PropTypes.array,
        currentPage: PropTypes.string,
        setCurrentPage: PropTypes.func
    };

    render() {
        const {pageArray, currentPage} = this.props;
        return (
            <nav className={'NavigationBar'}>
                {pageArray.map(page => (
                    <NavLink
                        className={'NavigationBar__link'}
                        activeClassName={'NavigationBar__link--active'}
                        to={"/" + page.path}
                        key={uuidv1()}
                    >
                        <span>{page.text}</span>
                    </NavLink>
                ))}
            </nav>
        );
    }
}
