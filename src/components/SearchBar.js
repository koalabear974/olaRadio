import React, {Component} from "react";
import PropTypes from "prop-types";

import "./../styles/components/SearchBar.css";

export default class SearchBar extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div className={'SearchBar'}>
                <input
                    className={'SearchBar__input'}
                    type="text"
                />
                <span className={'SearchBar__icon'}>
                    X
                </span>
            </div>
        );
    }
}
