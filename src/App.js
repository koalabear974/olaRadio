import React, {Component} from "react";
import Responsive from 'react-responsive-decorator';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import "typeface-open-sans";

import "./styles/Teaser.css";
import * as utils from './common/util';

import firebase from 'firebase/app';
import 'firebase/auth';

import Home from "./containers/Home";
import Navigation from "./components/Navigation";
// import Shop from "./containers/Shop"
import Support from "./containers/Support"
import About from "./containers/About"
import Archives from "./containers/Archives"
import Admin from "./containers/Admin"
import NotFoundPage from "./containers/NotFoundPage";

import "./styles/App.css";

import RadioBox from "./components/RadioBox";
import Logo from "./components/Logo";
import CookieWarning from "./common/CookieWarning";
import FullTeaser from "./containers/FullTeaser";

const pages = [
    {path: "Prog", text: "Prog"},
    // {path: "Archives", text: "Archives"},
    {path: "About", text: "A propos"},
    {path: "Support", text: "Soutenir"},
    // {path: "Shop", text: "Shop"},
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "Home",
            isMobile: false,
            isVerified: false,
        };
    }

    componentWillMount() {
        this.props.media({minWidth: 768}, () => {
            this.setState({
                isMobile: false
            });
        });
        this.props.media({maxWidth: 768}, () => {
            this.setState({
                isMobile: true
            });
        });
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                this.setState({isVerified: !!user, errors: ""})
            }
        );
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    setCurrentPage = currentPage => this.setState({currentPage});

    render() {
        const {isMobile} = this.state;

        if(!this.state.isVerified) {
            return (
                <Router>
                    <div className={'AppContainer'}>
                        <div className={'AppContainer__teaser'}>
                            <Switch>
                                <Route exact path='/' component={FullTeaser}/>
                                <Route path="/Admin" component={Admin}/>
                                <Redirect from="*" to="/" />
                            </Switch>
                        </div>

                        <footer className={'AppContainer__footer'}>
                            © Ola Radio 2018
                        </footer>
                    </div>
                </Router>
            );
        } else {
            // FULL SITE
            let sideBar = (isMobile ?
                <div className={'AppContainer__sideBar AppContainer__sideBar--mobile'}>
                    <Navigation
                        pageArray={pages}
                        currentPage={this.state.currentPage}
                        setCurrentPage={this.setCurrentPage}
                    />
                    <footer className={'AppContainer__footer--login'}>
                        © Ola Radio 2018
                    </footer>
                </div> : <div className={'AppContainer__sideBar'}>
                    <Logo/>
                    <RadioBox/>
                    <Navigation
                        pageArray={pages}
                        currentPage={this.state.currentPage}
                        setCurrentPage={this.setCurrentPage}
                    />
                    <footer className={'AppContainer__footer--login'}>
                        © Ola Radio 2018
                    </footer>
                </div>);

            let switchRoutes = (
                <Switch>
                    <Redirect exact from="/" to="Home"/>
                    <Route exact path="/Home" component={Home}/>
                    <Route path="/Prog" component={Home}/>
                    {/*<Route path="/Archives" component={Archives}/>*/}
                    {/*<Route path="/Shop" component={Shop}/>*/}
                    <Route path="/Support" component={Support}/>
                    <Route path="/About" component={About}/>
                    <Route path="/Admin" component={Admin}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            );

            let appBody = (isMobile ?
                    <div className={'AppContainer__body AppContainer__body--mobile'}>
                        <Logo/>
                        {switchRoutes}
                        <RadioBox/>
                    </div> :
                    <div className={'AppContainer__body'}>
                        {switchRoutes}
                    </div>
            );

            return (
                <Router>
                    <div className={'AppContainer' + (isMobile ? ' AppContainer--mobile' : '')}>
                        {sideBar}
                        {appBody}
                        <CookieWarning />
                    </div>
                </Router>
            );
        }
    }
}

export default Responsive(App);
