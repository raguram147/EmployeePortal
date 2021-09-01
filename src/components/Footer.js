import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 1%;
  background: #444444;
  margin-bottom: 0px;
  color: #fff;
  justify-content:center;
  span {
    padding-left: 30%;
    @media (max-width:624px){
      padding:0;
      justify-content:center;
    }
  }
`;
//copyright position is not fixed

const Footer = () => {
  return (
    <Container>
      <div style={{ alignContent: "center", position: "relative" }}>
        <span>
          Created By{" "}
          <a href="/#" style={{ color: "#fff" }}>
            Lister Technologies
          </a>
          |
          <img
            src="https://img.icons8.com/ios-glyphs/30/ffffff/copyright.png"
            alt=""
          />
          2021 All rights reserved.
        </span>
      </div>
    </Container>
  );
};
export default Footer;
