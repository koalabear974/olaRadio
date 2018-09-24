import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import uuidv1 from "uuid/v1";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 999;
  transition: all 0.3s ease-in-out;
  background: white;
  box-shadow: 2px 1px 16px rgba(0,0,0,0.15);
  border-radius: 5px;
  padding: 5px;
  &:hover{
    box-shadow: 5px 10px 16px rgba(0,0,0,0.15);
  }
  @media (max-width: 425px) {
    width:100%;
    bottom: 0%;
    flex-direction: row;
    justify-content:center;
  }
  @media (min-width: 426px) {
    height:100%;
    right: 0%;
    flex-direction: column;
    justify-content:center;
  }
`;

const PageTitle = styled.span`
  transition: all 0.3s ease-in-out;
  right: 25px;
  opacity: 0;
  position: absolute;
  color: rgba(63, 226, 177, 0.25) 0%;
  text-decoration:none;
  `

const Page = styled.div`
  width: 15px;
  height: 15px;
  margin: 5px;
  padding:15px;
  cursor: pointer;
  border-radius: 5px;
  background: rgba(63, 226, 177, 0.25) 0%;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: rgba(63, 226, 177, 0.75) 0%;
  } 
  &:hover span{
    @media (max-width: 425px) {
      opacity: 1;
      color: #367cda;
      box-shadow: 5px 10px 16px rgba(0,0,0,0.05);
      bottom:50px;
      position: relative;
    }
    @media (min-width: 426px) {
      opacity: 1;
      color: #367cda;
      box-shadow: 5px 10px 16px rgba(0,0,0,0.05);
      right: 35px;
    }
  }
`;

export default class Navigation extends Component {
  static propTypes = {
    pageArray: PropTypes.array,
    currentPage: PropTypes.string,
    setCurrentPage: PropTypes.func
  };

  render() {
    const { pageArray, currentPage } = this.props;
    return (
      <Wrapper>
        {pageArray.map(pg => (
          <Page
            key={uuidv1()}
          >
          <Link to={"/"+pg}>
            <PageTitle>{pg}</PageTitle>
          </Link>
          </Page>
        ))}
      </Wrapper>
    );
  }
}
