import React, { Component, Fragment } from "react";
import styled from "styled-components";
import base from "../db/config";
import ParallaxPage from "../components/ParallaxPage";

export default class WhyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: {
        first_body:[],
        second_body:[],
        third_body:[],
      }
    };
  }

  componentDidMount() {
    base.bindToState("why", {
      context: this,
      state: "text"
    });
  }

  render() {
    const { text } = this.state;
    return (
      <ParallaxPage text={text}/>
    );
  }
}
