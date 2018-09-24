//Needed control of flex div for positioning elements
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FlexDiv = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: ${props => (props.direction ? props.direction : "column")};
  justify-content: ${props => (props.justify ? props.justify : "center")};
  align-items: ${props => (props.align ? props.align : "center")};
  margin-top: ${props => (props.marginTop ? props.marginTop : 0) + "px"};
`;

export default class FlexWrapper extends PureComponent {
  static propTypes = {
    direction: PropTypes.string,
    justify: PropTypes.string,
    align: PropTypes.string,
    marginTop: PropTypes.number,
  };

  render() {
    return (
      <FlexDiv
        direction={this.props.direction}
        justify={this.props.justify}
        align={this.props.align}
        marginTop={this.props.marginTop}
      >
        {this.props.children}
      </FlexDiv>
    );
  }
}