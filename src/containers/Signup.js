import React, { Component } from "react";
import FlexWrapper from "../common/FlexWrapper";
import base from "../db/config";
import styled from "styled-components";
import AnimationContainer from "../components/AnimationContainer";
import { TextXl, TextMed, TextSm } from "../common/Fonts";
import { SignupForm } from "../common/SignupForm";


export default class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      text: "...",
      toggle: false
    }
  }

  componentDidMount() {
    base.bindToState("signup", {
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
        <TextXl>{text.title}</TextXl>
        <SignupForm />
        <TextSm>{text.contact}</TextSm>
        <TextSm>{text.legal}</TextSm>
      </FlexWrapper>
    );
  }
}
