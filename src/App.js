import React, {Component} from "react";
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

import {Body} from "./common/Fonts";
import SearchBar from "./components/SearchBar";
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

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: ""
        };
    }

    setCurrentPage = currentPage => this.setState({currentPage});

    render() {
        return (
            <Router>
                <Body className={'AppContainer'}>
                <div className={'AppContainer__sideBar'}>
                    <Logo />
                    <SearchBar />
                    <Navigation
                        pageArray={pages}
                        currentPage={this.state.currentPage}
                        setCurrentPage={this.setCurrentPage}
                    />
                </div>
                <Switch>
                    <Redirect exact from="/" to="Home"/>
                    <Route
                        exact
                        path="/Home"
                        render={() => <Home setCurrentPage={this.setCurrentPage}/>}
                    />
                    <Route path="/Direct" component={Direct} />
                    <Route path="/Agenda" component={Agenda} />
                    <Route path="/Shop" component={Shop} />
                    <Route path="/Dons" component={Dons} />
                    <Route path="/VideoLive" component={VideoLive} />
                    <Route path="/Info" component={Info} />
                    <Route path="/Contact" component={Contact} />
                    <Route path="/Admin" component={Admin} />
                    <Route component={NotFoundPage}/>
                </Switch>
                </Body>
            </Router>
        );
    }
}
