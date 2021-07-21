import React from "react";
import { Heading, Container, Row, Column } from "./styles/FooterStyles";
import { SocialIcon } from "react-social-icons";
// const socialmedialogo = {
//   fontFamily: "Montserrat",
//   backgroundColor: "#444444",
//   height: "35px",
//   width: "35px",
//   padding: "8px",

// };

// const sampleData = [
//   {
//     name: "Facebook",
//     icons: "https://img.icons8.com/material-rounded/48/ffffff/facebook.png",
//   },
//   {
//     name: "LinkedIn",
//     icons: "https://img.icons8.com/material-rounded/48/ffffff/linkedin--v1.png",
//     },
//   {
//     name: "Instagram",
//     icons:
//       "https://img.icons8.com/material-rounded/48/ffffff/instagram-new.png",
//   },
// ];

const Footer = ({Footerdata}) => {
  return (
    <Container>
      <Row>
        <Column>
          <Heading>About us</Heading>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. It was popularised in the 1960s with the release of
            Letraset Lorem Ipsum.
          </p>
        </Column>

        <Column>
          <Heading>Contact us</Heading>
          {/* <h2 style={{ fontSize: "1rem" }}>Address:</h2> */}
          <p>
            8th Floor, Global Infocity Park, #40, Dr, MGR Main Rd, Perungudi,
            Chennai, Tamil Nadu 600096
          </p>
          <p>Phone: 044 4599 2000</p>
        </Column>
        <Column>
          <Heading>Social media</Heading>
          <div style={{ display: "flex" }}>
          {/* {sampleData.map((data, index) => ( <img
                  style={socialmedialogo}
                  src={data.icons}
                  title={data.name}
                  alt={data.name}
               key={index} ></img>))} */}
               {Footerdata && (Footerdata[1].lister_social_media_links.split(", ")).map((x,index)=>(<SocialIcon url={x} bgColor="#fff" style={{marginLeft:"5px" ,height:"24px",width:"24px"}} key={index}></SocialIcon>))}
          {/* <SocialIcon url="https://www.linkedin.com/company/listertech/mycompany/"  ></SocialIcon> */}
            
          </div>
        </Column>
      </Row>
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
    </Container>
  );
};
export default Footer;
