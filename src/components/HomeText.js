import React from "react";
import styled from "styled-components";
import "./styles/bubbles.css";
import "./styles/cards.css";
const HomeText = ({ welcome }) => {

  return (
    <Container>
      {welcome &&
        welcome.map((x, index) => (
          <>
            <h1 key={index} id="banner_header">
              {x.banner_content_header}</h1>
            <h1 id="banner_description">{x.banner_content_description}</h1>
            <h1 id="banner_sub">{x.banner_content_sub_description}</h1>
          </>
        ))}
    </Container>
  );
};

export default HomeText;

const Container = styled.div`
 position: absolute;
 z-index:1;
 width: auto;
 top:35%;
 left:375px;
 padding-right: 1%;
 h1 {
 color: #555;
 width: auto;
 font-family: Dancing Script;
 margin: 0px;
 padding-bottom: 1%;
 }
 @media (max-width: 400px) {
 height: 100%;
 }
`;
