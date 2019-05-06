import React, {Component} from "react";
import Responsive from 'react-responsive-decorator';
import {
    Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {createBrowserHistory} from 'history';

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
import Legal from "./containers/Legal"
import Archives from "./containers/Archives"
import Admin from "./containers/Admin"
import NotFoundPage from "./containers/NotFoundPage";

import "./styles/App.css";

import RadioBox from "./components/RadioBox";
import Logo from "./components/Logo";
import CookieWarning from "./common/CookieWarning";
import MobileNavigator from "./common/MobileNavigator";
import NavLink from "react-router-dom/es/NavLink";
import ExternalPlayer from "./components/ExternalPlayer";
import Footer from "./components/Footer";
import InformationPanel from "./containers/InformationPanel";

const PAGES = [
    {path: "Podcasts", text: "Podcasts"},
    // {path: "Shop", text: "Shop"},
];
const NAVBARHEIGHT = 220;
const history = createBrowserHistory();

function simple_easing(how_much_time_has_passed) {
    return (1 - Math.cos(how_much_time_has_passed * Math.PI)) / 2;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "Home",
            currentEmissionLink: "",
            isMobile: false,
            isVerified: false,
            navBarHeight: 0,
            isNavBarOpen: false,
        };


        this.animateNav = this.animateNav.bind(this);
        this.onEmissionClick = this.onEmissionClick.bind(this);
        this.onEmissionClear = this.onEmissionClear.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
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
        history.listen((location, action) => {
            this.toggleMenu(false);
        })
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    toggleMenu(isOpen) {
        let start = Date.now();
        this.setState({isNavBarOpen: isOpen});
        requestAnimationFrame(() => {
            this.animateNav(isOpen, start);
        });
    }

    onEmissionClick(link) {
        this.setState({currentEmissionLink: link});
    }

    onEmissionClear() {
        this.setState({currentEmissionLink: ""});
    }

    animateNav(isOpen, start) {
        let duration = 600;
        let now = Date.now();
        if (now - start >= duration) return;
        if (this.state.navBarHeight <= 0 && !isOpen) return;
        let p = (now - start) / duration;
        if (isOpen) {
            let navBarHeight = Math.round(NAVBARHEIGHT * simple_easing(p));
            this.setState({navBarHeight: navBarHeight});
            if (navBarHeight >= NAVBARHEIGHT) return;
            requestAnimationFrame(() => {
                this.animateNav(isOpen, start);
            });
        } else {
            let navBarHeight = Math.round(NAVBARHEIGHT - (NAVBARHEIGHT * simple_easing(p)));
            this.setState({navBarHeight: navBarHeight});
            if (navBarHeight <= 0) return;
            requestAnimationFrame(() => {
                this.animateNav(isOpen, start);
            });
        }

    }

    render() {
        const {isMobile} = this.state;
        let onEmissionClearFunc = this.onEmissionClear;

        let switchRoutes = (
            <Switch>
                <Redirect exact from="/" to="Home"/>
                <Route exact path="/Home" render={() => <Home onEmissionClick={this.onEmissionClick} />} />
                <Route path="/Podcasts" render={() => <Archives onEmissionClick={this.onEmissionClick} />}  />
                {/*<Route path="/Shop" component={Shop}/>*/}
                <Route path="/Support" component={Support}/>
                <Route path="/About" component={About}/>
                <Route path="/Legal" component={Legal}/>
                <Route path="/Admin" component={Admin}/>
                <Route component={NotFoundPage}/>
            </Switch>
        );

        let sideBar = (isMobile ?
            <div
                className={'AppContainer__sideBar AppContainer__sideBar--mobile'}
                style={{
                    height: this.state.navBarHeight + 'px',
                }}
            >
                <Navigation
                    pageArray={PAGES}
                    currentPage={this.state.currentPage}
                />
            </div> : <div className={'AppContainer__sideBar'}>
                <Logo/>
                <RadioBox externalLink={this.state.currentEmissionLink} onEmissionClear={onEmissionClearFunc} />
                <Navigation
                    pageArray={PAGES}
                    currentPage={this.state.currentPage}
                    setCurrentPage={this.setCurrentPage}
                />
            </div>);

        let appBody = (isMobile ?
                <div className={'AppContainer__body AppContainer__body--mobile'}>
                    <MobileNavigator
                        toggleMenu={this.toggleMenu}
                        isOpen={this.state.isNavBarOpen}
                        curHeight={this.state.navBarHeight}
                    />
                    <Logo/>
                    <RadioBox externalLink={this.state.currentEmissionLink} />
                    {switchRoutes}
                </div> :
                <div className={'AppContainer__body'}>
                    {switchRoutes}
                </div>
        );

        return (
            <Router history={history}>
                <div className={'AppContainer' + (isMobile ? ' AppContainer--mobile' : '')}>
                    {sideBar}
                    {appBody}

                    <ExternalPlayer externalLink={this.state.currentEmissionLink} onEmissionClear={onEmissionClearFunc} />
                    <CookieWarning/>
                    <InformationPanel />
                </div>
            </Router>
        );
    }
}

export default Responsive(App);
