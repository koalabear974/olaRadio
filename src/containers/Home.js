import React, { Component } from "react";
import base from "../db/config";
import { SignupForm } from "../common/SignupForm";
import { Link } from "react-router-dom";
import { NextButton } from "../common/NextButton";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <header>Ola radio</header>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        <SignupForm />
        <Link to={"/About"}>
          <NextButton onClick={() => this.props.setCurrentPage("About")}>
            {"Read More"}
          </NextButton>
        </Link>
      </div>
    );
  }
}
