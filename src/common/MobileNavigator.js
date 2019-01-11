import React, {Component} from "react";


import "../styles/common/SearchBar.css";

export default class MobileNavigator extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(e) {
        e.preventDefault();
        console.log(!this.state.isOpen);
        this.props.toggleMenu(!this.state.isOpen);
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <div className={'MobileNavigator'}>
                <a
                    role="button"
                    className={"MobileNavigator__button navbar-burger burger "+(this.state.isOpen ? 'is-active' : '')}
                    aria-expanded={this.state.isOpen}
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
