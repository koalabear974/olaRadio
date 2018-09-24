import React, { Component } from "react";
import FlexWrapper from "../common/FlexWrapper";
import AnimationContainer from "../components/AnimationContainer";
import { TextXl, TextMed, TextSm } from "../common/Fonts";
import base from "../db/config";
import { SignupForm } from "../common/SignupForm";
import { Link } from "react-router-dom";
import { NextButton } from "../common/NextButton";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "...",
      toggle: false
    };
  }

  componentDidMount() {
    base.bindToState("home", {
      context: this,
      state: "text"
    });
    setTimeout(() => this.startAnimation(), 1500);
  }

  startAnimation() {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
  }

  render() {
    const { text } = this.state;
    return (
      <FlexWrapper>
        <AnimationContainer
          toggle={this.startAnimation.bind(this)}
          isToggled={this.state.toggle}
        />
        <TextXl style={{ marginBottom: 0 }}>{text.title}</TextXl>
        <TextMed style={{ color: "darkgray" }}>{text.subhead}</TextMed>
        <SignupForm />
        <Link to={"/About"}>
          <NextButton onClick={() => this.props.setCurrentPage("About")}>
            {"Read More"}
          </NextButton>
        </Link>
      </FlexWrapper>
    );
  }
}
