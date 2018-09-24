import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "typeface-open-sans";

import Home from "./containers/Home";
import About from "./containers/About";
import Why from "./containers/Why";
import How from "./containers/How";
import Signup from "./containers/Signup";
import Navigation from "./components/Navigation";
import NotFoundPage from "./containers/NotFoundPage";

import { Body } from "./common/Fonts";

const pages = ["Home", "About", "Why", "How-to", "Signup"];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: ""
    };
  }

  setCurrentPage = currentPage => this.setState({ currentPage });

  render() {
    return (
      <Router>
        <Body>
          <Navigation
            pageArray={pages}
            currentPage={this.state.currentPage}
            setCurrentPage={this.setCurrentPage}
          />
          <Switch>
            <Redirect exact from="/" to="Home" />
            <Route
              exact
              path="/Home"
              render={() => <Home setCurrentPage={this.setCurrentPage} />}
            />
            <Route path="/About" component={About} />
            <Route path="/Why" component={Why} />
            <Route path="/How-to" component={How} />
            <Route path="/Signup" component={Signup} />
            <Route component={NotFoundPage} />
          </Switch>
        </Body>
      </Router>
    );
  }
}
