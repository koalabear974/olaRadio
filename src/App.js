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
import ExternalPlayer from "./components/ExternalPlayer";
import InformationPanel from "./containers/InformationPanel";
import MobileHome from "./containers/MobileHome";
import AdvertisementBar from "./components/AdvertisementBar";
import SoundCloudPlayer from "./components/SoundCloudPlayer";

const PAGES = [
    {path: "Podcasts", text: "Podcasts"},
];
const history = createBrowserHistory();

class App extends Component {
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    constructor(props) {
        super(props);
        this.state = {
            currentPage: "Home",
            currentEmissionLink: "",
            isMobile: false,
            isVerified: false,
            isNavBarOpen: false,
        };


        this.onEmissionClick = this.onEmissionClick.bind(this);
        this.onEmissionClear = this.onEmissionClear.bind(this);
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

        this.randomBackgroundId = this.getRandomInt(1, 5);
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    onEmissionClick(link) {
        this.setState({currentEmissionLink: link});
    }

    onEmissionClear() {
        this.setState({currentEmissionLink: ""});
    }

    render() {
        const {isMobile} = this.state;
        let onEmissionClearFunc = this.onEmissionClear;

        let switchRoutes = (
            <Switch>
                <Redirect exact from="/" to="Home"/>
                <Route exact path="/Home" render={() => <Home onEmissionClick={this.onEmissionClick} />} />
                <Route path="/Podcasts" render={() => <Archives onEmissionClick={this.onEmissionClick} />}  />
                <Route path="/Support" component={Support}/>
                <Route path="/About" component={About}/>
                <Route path="/Legal" component={Legal}/>
                <Route path="/Admin" component={Admin}/>
                <Route component={NotFoundPage}/>
            </Switch>
        );

        let sideBar = (isMobile ?
            "" : <div className={'AppContainer__sideBar'}>
                <Logo/>
                <RadioBox externalLink={this.state.currentEmissionLink} onEmissionClear={onEmissionClearFunc} />
                <Navigation
                    pageArray={PAGES}
                    currentPage={this.state.currentPage}
                    setCurrentPage={this.setCurrentPage}
                />
            </div>);

        sideBar = "";

        let informationPanel = (isMobile ?
            "" : <InformationPanel />);
        let externalPlayer = (isMobile ?
            "" :  <ExternalPlayer externalLink={this.state.currentEmissionLink} onEmissionClear={onEmissionClearFunc} />);

        let cookieWorning = (isMobile ?
            "" : <CookieWarning />);

        let appBody = (isMobile ?
                <div className={'AppContainer__body AppContainer__body--mobile'}>
                    <Logo/>
                    <RadioBox externalLink={this.state.currentEmissionLink} />
                    <MobileHome onEmissionClick={this.onEmissionClick} />
                    <ExternalPlayer externalLink={this.state.currentEmissionLink} onEmissionClear={onEmissionClearFunc} />
                    <CookieWarning/>
                </div> :
                <div className={'AppContainer__body'}>
                    {switchRoutes}
                </div>
        );

        return (
            <Router history={history}>
                <div className={'AppContainer AppContainer-' + this.randomBackgroundId + (isMobile ? ' AppContainer--mobile' : '')}>
                    <div className={'AppContainer__container AppContainer__top'}>
                        <AdvertisementBar />
                    </div>
                    <div className={'AppContainer__container AppContainer__bottom'}>
                        {sideBar}
                        {appBody}
                        {externalPlayer}
                        {cookieWorning}
                        {informationPanel}
                        <SoundCloudPlayer externalLink={this.state.currentEmissionLink}/>;
                    </div>
                </div>
            </Router>
        );
    }
}

export default Responsive(App);
