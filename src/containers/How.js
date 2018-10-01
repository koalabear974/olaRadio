import React, { Component, Fragment } from "react";
import base from "../db/config";

export default class HowPage extends Component {
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
    base.bindToState("how", {
      context: this,
      state: "text"
    });
  }

  render() {
    const { text } = this.state;
    return (
        <div>{text}</div>
    );
  }
}
