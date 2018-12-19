import React, {Component} from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/auth";

export default class AdminNavbar extends Component {
    static propTypes = {
        onNavClick: PropTypes.func,
        selected: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            toggleNavbar: false,
        };

        this.handleNavClick = this.handleNavClick.bind(this);
    }

    handleNavClick(nav) {
        this.props.onNavClick(nav);
    }

    render() {
        return (
            <div className="Admin__navbar tabs">
                <ul>
                    <li className={this.props.selected === 'Category' ? 'is-active' : ''}>
                        <a onClick={() => this.handleNavClick('Category')}>Catégories</a>
                    </li>
                    <li className={this.props.selected === 'Emission' ? 'is-active' : ''}>
                        <a onClick={() => this.handleNavClick('Emission')}>Emissions</a>
                    </li>
                    <li className={this.props.selected === 'Question' ? 'is-active' : ''}>
                        <a onClick={() => this.handleNavClick('Question')}>Questions</a>
                    </li>
                    <li className={'is-pulled-right'}>
                        <button className={'button is-primary'} onClick={() => firebase.auth().signOut()}>Log out</button>
                    </li>
                </ul>
            </div>
        );
    }
}
