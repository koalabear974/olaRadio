import React, {Component} from "react";
import { FaSearch } from 'react-icons/fa';


import "../styles/common/SearchBar.css";

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
                <FaSearch className={'SearchBar__icon'} />
            </div>
        );
    }
}
