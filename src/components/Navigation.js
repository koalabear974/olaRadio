import React, {Component} from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import {Link} from "react-router-dom";

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
                    <li
                        className={'NavigationBar__li'}
                        key={uuidv1()}
                    >
                        <Link
                            className={'NavigationBar__link'}
                            to={"/" + page}
                            active={page === currentPage}
                        >
                            <span>{page}</span>
                        </Link>
                    </li>
                ))}
            </nav>
        );
    }
}
