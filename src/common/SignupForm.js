import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import styled from "styled-components";

const FormStyle = styled.div`
    div > input{
        padding: 20px 15px;
        min-width: 175px;
        font-size: 12px;
        border: .5px solid #4990e2;
        border-radius: 5px;
    }
    div > button{
        padding: 20px;
        font-size: 12px;
        font-weight: 800;
        border: .5px solid #4990e2;
        border-radius: 5px;
        background: #4990e2;
        margin-left: 10px;
        color: white;
        cursor: pointer;
        &:hover {
            background: #555;
          }
    }
`;

//Add your mail chimp url
const url =
  "//youraddress.us13.list-manage.com/subscribe/post?u=zefzefzef&id=fnfgn";

export const SignupForm = () => (
  <FormStyle>
    <MailchimpSubscribe url={url} />
  </FormStyle>
);
