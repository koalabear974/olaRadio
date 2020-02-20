import React, {Component} from "react";
import Responsive from 'react-responsive-decorator';
import {Router, Switch, Route, Redirect} from "react-router-dom";
import {createBrowserHistory} from 'history';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as utils from './common/util';
import Home from "./containers/Home";
import Navigation from "./components/Navigation";
import Support from "./containers/Support"
import About from "./containers/About"
import Legal from "./containers/Legal"
import Archives from "./containers/Archives"
import Admin from "./containers/Admin"
import NotFoundPage from "./containers/NotFoundPage";
import RadioBox from "./components/RadioBox";
import Logo from "./components/Logo";
import CookieWarning from "./common/CookieWarning";
import ExternalPlayer from "./components/ExternalPlayer";
import InformationPanel from "./containers/InformationPanel";
import MobileHome from "./containers/MobileHome";
import AdvertisementBar from "./components/AdvertisementBar";
import "typeface-open-sans";
import "./styles/Teaser.css";
import "./styles/App.css";
import "./styles/theme-light.css";
import "./styles/theme-dark.css";
import {
    ABOUT_PATH,
    ADMIN_PATH, BOOKING_PATH,
    HOME_PATH,
    LEGAL_PATH,
    PODCASTS_PATH,
    ROOT_PATH,
    SUPPORT_PATH
} from "./common/app-route-paths";
import Booking from "./containers/Booking";

const PAGES = [
    {path: PODCASTS_PATH, text: "Podcasts"},
    {path: BOOKING_PATH, text: "Booking"},
];
const history = createBrowserHistory();

class App extends Component {

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

        this.changeDarkThemeState(history.location);

        this.unregisterListenHistoryChange = history.listen( location =>  {
            this.changeDarkThemeState(location);
        })
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
        this.unregisterListenHistoryChange();
    }

    onEmissionClick(link) {
        this.setState({currentEmissionLink: link});
    }

    onEmissionClear() {
        this.setState({currentEmissionLink: ""});
    }

    changeDarkThemeState(location) {
        const darkThemePages = [BOOKING_PATH];

        this.setState({
            darkTheme: darkThemePages.includes(location.pathname)
        });
    }

    render() {
        const {isMobile} = this.state;
        const { darkTheme } = this.state;

        let onEmissionClearFunc = this.onEmissionClear;

        let switchRoutes = (
            <Switch>
                <Redirect exact from={ROOT_PATH} to="Home"/>
                <Route exact path={HOME_PATH} render={() => {return <Home onEmissionClick={this.onEmissionClick} />;}} />
                <Route path={PODCASTS_PATH} render={() => <Archives onEmissionClick={this.onEmissionClick} />}  />
                <Route path={SUPPORT_PATH} component={Support}/>
                <Route path={ABOUT_PATH} component={About}/>
                <Route path={LEGAL_PATH} component={Legal}/>
                <Route path={ADMIN_PATH} component={Admin}/>
                <Route path={BOOKING_PATH} component={Booking}/>
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

        const appContainerMobile = (isMobile ? ' AppContainer--mobile' : '');
        const appContainerTheme = (darkTheme ? ' AppContainer--dark' : ' AppContainer--light');

        return (
            <Router history={history}>
                <div className={'AppContainer' + appContainerMobile + appContainerTheme}>
                    <div className={'AppContainer__container AppContainer__top'}>
                        <AdvertisementBar />
                    </div>
                    <div className={'AppContainer__container AppContainer__bottom'}>
                        {sideBar}
                        {appBody}
                        {externalPlayer}
                        {cookieWorning}
                        {informationPanel}
                    </div>
                </div>
            </Router>
        );
    }
}

export default Responsive(App);
