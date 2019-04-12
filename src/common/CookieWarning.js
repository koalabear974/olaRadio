import React, {Component} from "react";
import Cookies from 'universal-cookie';
import NavLink from "react-router-dom/es/NavLink";

export default class CookieWarning extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.cookies = new Cookies();

        this.state = {
            cookieAccepted: !!this.cookies.get('cookieAccepted'),
        };

        this.acceptCookie = this.acceptCookie.bind(this);
    }

    acceptCookie(e) {
        e.preventDefault();

        this.cookies.set('cookieAccepted', true, { path: '/' });
        this.setState({cookieAccepted: true})
    }

    render() {
        return (
            <div className={'CookieWarning '+(this.state.cookieAccepted ? 'hidden' : '')}>
                Ce site utilise des cookies à des fins analytiques.
                <NavLink to={'/Legal'}> En lire plus.</NavLink>
                <button onClick={this.acceptCookie}>
                    Ok
                </button>
            </div>
        );
    }
}
