import React, { Component } from "react";
import { TextXl, TextMed } from "../common/Fonts";

export default class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <TextXl>Oops, 404!</TextXl>
        <TextMed>Could not find the page you requested.</TextMed>
      </div>
    );
  }
}
