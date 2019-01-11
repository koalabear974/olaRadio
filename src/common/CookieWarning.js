import React, {Component} from "react";
import Cookies from 'universal-cookie';

export default class CookieWarning extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.cookies = new Cookies();

        this.state = {
            cookieAccepted: !!this.cookies.get('cookieAccepted'),
        }

        this.acceptCookie = this.acceptCookie.bind(this);
    }

    acceptCookie(e) {
        e.preventDefault();

        this.cookies.set('cookieAccepted', true, { path: '/' });
        this.setState({cookieAccepted: true})
    }

    render() {
        return (
            <div className={'CookieWarning '+(this.state.cookieAccepted ? 'CookieWarning--hidden' : '')}>
                Ce site utilise des cookies as des fins d'analyse.
                <a target={'_blank'} href="https://en.wikipedia.org/wiki/HTTP_cookie"> En lire plus.</a>
                <button onClick={this.acceptCookie}>
                    Ok
                </button>
            </div>
        );
    }
}
