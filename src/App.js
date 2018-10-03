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
import NotFoundPage from "./containers/NotFoundPage";

import "./styles/App.css";

import {Body} from "./common/Fonts";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";

const pages = ["Home", "Direct", "Agenda", "Shop", "Dons", "Video Live", "Info", "Contact"];

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
                    {/*<Route path="/Signup" component={Signup} />*/}
                    <Route component={NotFoundPage}/>
                </Switch>
                </Body>
            </Router>
        );
    }
}
