import React, { Component } from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";
import styled from "styled-components";
import { TextLg, TextMed, TextSm } from "../common/Fonts";
import FlexWrapper from "../common/FlexWrapper";
import { Parallax, ParallaxLayer } from "react-spring";
import { SignupForm } from "../common/SignupForm";

import blueBackground from "../assets/bg_blue.svg";
import greenBackground from "../assets/bg_green.svg";
import redBackground from "../assets/bg_red.svg";

const Img = styled.div`
  width: 100%;
  height: 100%;
  max-width: 750px;
  max-height: 500px;
  background: linear-gradient(#ffffff00, #ffffff52, white),
    url(${props => props.src});
`;

const Background = styled.img`
  width: 100%;
  height: auto;
`;

export default class ParallaxPage extends Component {
  static propTypes = {
    text: PropTypes.object
  };
  render() {
    const { text } = this.props;
    return (
      <Parallax pages={4} scrolling ref={ref => (this.parallax = ref)}>
        <ParallaxLayer offset={0.75} speed={0.1}>
          <Background src={blueBackground} />
        </ParallaxLayer>
        <ParallaxLayer offset={1.75} speed={0.1}>
          <Background src={redBackground} />
        </ParallaxLayer>
        <ParallaxLayer offset={2.75} speed={0.1}>
          <Background src={greenBackground} />
        </ParallaxLayer>
        <ParallaxLayer offset={0.1} speed={0.95}>
          <FlexWrapper justify={"flex-start"}>
            <Img src={text.first_img_url} />
          </FlexWrapper>
        </ParallaxLayer>
        <ParallaxLayer offset={0.15} speed={0.25}>
          <FlexWrapper>
            <TextLg>{text.first_title}</TextLg>
            {text.first_body.map(paragraph => (
              <TextMed key={uuidv1()}>{paragraph}</TextMed>
            ))}
          </FlexWrapper>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.55}>
          <FlexWrapper justify={"flex-start"}>
            <Img src={text.second_img_url} />
          </FlexWrapper>
        </ParallaxLayer>
        <ParallaxLayer offset={1.25} speed={0.15}>
          <FlexWrapper>
            <TextLg>{text.second_title}</TextLg>
            {text.second_body.map(paragraph => (
              <TextMed key={uuidv1()}>{paragraph}</TextMed>
            ))}
          </FlexWrapper>
        </ParallaxLayer>
        <ParallaxLayer offset={2.15} speed={0.75}>
          <FlexWrapper justify={"flex-end"}>
            <Img src={text.third_img_url} />
          </FlexWrapper>
        </ParallaxLayer>
        <ParallaxLayer offset={2.75} speed={0.45}>
          <FlexWrapper>
            <TextLg>{text.third_title}</TextLg>
            {text.third_body.map(paragraph => (
              <TextMed key={uuidv1()}>{paragraph}</TextMed>
            ))}
          </FlexWrapper>
        </ParallaxLayer>
        <ParallaxLayer offset={3.35} speed={0.15}>
          <FlexWrapper justify={"flex-start"}>
            <TextLg>{"Sign me up"}</TextLg>
            <SignupForm />
          </FlexWrapper>
        </ParallaxLayer>
      </Parallax>
    );
  }
}
