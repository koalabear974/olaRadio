import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import "typeface-open-sans";

import "./styles/Teaser.css";

import FullTeaser from "./containers/FullTeaser";

import {Body} from "./common/Fonts";


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Body className={'AppContainer'}>
                <div className={'AppContainer__teaser'}>
                    <Switch>
                        <Route exact path='/' component={FullTeaser}/>
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>

                <footer className={'AppContainer__footer'}>
                    © Ola Radio 2018
                </footer>
                </Body>
            </Router>
        );
    }
}


