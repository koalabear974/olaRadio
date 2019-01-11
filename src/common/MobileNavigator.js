import React, {Component} from "react";
import PropTypes from "prop-types";

import "../styles/common/SearchBar.css";

export default class MobileNavigator extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        curHeight: PropTypes.int,
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(e) {
        e.preventDefault();
        this.props.toggleMenu(!this.props.isOpen);
    }

    render() {
        return (
            <div className={'MobileNavigator'}>
                <a
                    role="button"
                    className={"MobileNavigator__button navbar-burger burger "+(this.props.isOpen ? 'is-active' : '')}
                    aria-expanded={this.props.isOpen}
                    onClick={this.toggleMenu}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        );
    }
}
