import React, {Component} from "react";
import NavLink from "react-router-dom/es/NavLink";

export default class Footer extends Component {
    static propTypes = {
    };

    render() {
        return (
            <footer className={'AppContainer__footer--login'}>
                © Ola Radio 2019, <NavLink className={'AppContainer__legal'} to={'/Legal'}>mentions légales</NavLink>.
            </footer>
        );
    }
}
