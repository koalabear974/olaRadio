import React, { Component } from "react";
import { TextXl, TextMed } from "../common/Fonts";
import FlexWrapper from "../common/FlexWrapper";

export default class NotFoundPage extends Component {
  render() {
    return (
      <FlexWrapper>
        <TextXl>Oops, 404!</TextXl>
        <TextMed>Could not find the page you requested.</TextMed>
      </FlexWrapper>
    );
  }
}
