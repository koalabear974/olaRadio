import React, {Component} from "react";
import Responsive from 'react-responsive-decorator';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import "typeface-open-sans";

import Home from "./containers/Home";
import Navigation from "./components/Navigation";
import Direct from "./containers/Direct"
import Agenda from "./containers/Agenda"
import Shop from "./containers/Shop"
import Dons from "./containers/Dons"
import VideoLive from "./containers/VideoLive"
import Info from "./containers/Info"
import Contact from "./containers/Contact"
import Admin from "./containers/Admin"
import NotFoundPage from "./containers/NotFoundPage";

import "./styles/App.css";

import RadioBox from "./components/RadioBox";
import Logo from "./components/Logo";

const pages = [
    {path: "Direct", text: "Direct"},
    {path: "Agenda", text: "Agenda"},
    {path: "Shop", text: "Shop"},
    {path: "Dons", text: "Dons"},
    {path: "VideoLive", text: "Video Live"},
    {path: "Info", text: "Info"},
    {path: "Contact", text: "Contact"},
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "Home",
            isMobile: false,
        };
    }

    componentWillMount() {
        this.props.media({ minWidth: 768 }, () => {
            this.setState({
                isMobile: false
            });
        });
        this.props.media({ maxWidth: 768 }, () => {
            this.setState({
                isMobile: true
            });
        });
    }

    setCurrentPage = currentPage => this.setState({currentPage});

    render() {
        const { isMobile } = this.state;
        let sideBar = (isMobile ?
            <div className={'AppContainer__sideBar AppContainer__sideBar--mobile'}>
                <Navigation
                    pageArray={pages}
                    currentPage={this.state.currentPage}
                    setCurrentPage={this.setCurrentPage}
                />
            </div> : <div className={'AppContainer__sideBar'}>
                <Logo />
                <RadioBox />
                <Navigation
                    pageArray={pages}
                    currentPage={this.state.currentPage}
                    setCurrentPage={this.setCurrentPage}
                />
            </div>);

        let switchRoutes = (
            <Switch>
                <Redirect exact from="/" to="Home"/>
                <Route
                    exact
                    path="/Home"
                    render={() => <Home setCurrentPage={this.setCurrentPage}/>}
                />
                <Route path="/Direct" component={Direct}/>
                <Route path="/Agenda" component={Agenda}/>
                <Route path="/Shop" component={Shop}/>
                <Route path="/Dons" component={Dons}/>
                <Route path="/VideoLive" component={VideoLive}/>
                <Route path="/Info" component={Info}/>
                <Route path="/Contact" component={Contact}/>
                <Route path="/Admin" component={Admin}/>
                <Route component={NotFoundPage}/>
            </Switch>
        );

        let appBody = (isMobile ?
                <div className={'AppContainer__body AppContainer__body--mobile'}>
                    <Logo />
                    { switchRoutes }
                    <RadioBox />
                </div> :
                <div className={'AppContainer__body'}>
                    { switchRoutes }
                </div>
        );

        return (
            <Router>
                <div className={'AppContainer' + ( isMobile ? ' AppContainer--mobile' : '')}>
                    { sideBar }
                    { appBody }
                </div>
            </Router>
        );
    }
}

export default Responsive(App);
