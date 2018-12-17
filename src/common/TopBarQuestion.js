import React, {Component} from "react";
import { FaSearch } from 'react-icons/fa';


import "./../styles/common/TopBarQuestion.css";

export default class TopBarQuestion extends Component {
    render() {
        return (
            <div className={'TopBarQuestion'}>
                <input
                    className={'TopBarQuestion__input'}
                    type="text"
                />
                <FaSearch className={'TopBarQuestion__icon'} />
            </div>
        );
    }
}
