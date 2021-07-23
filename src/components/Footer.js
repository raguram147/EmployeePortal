import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import styled from "styled-components";
import config from '../config';



 const Heading=styled.div`
font-weight:700;
`;



 const Container=styled.div`
padding:30px;
background: #444444;
margin-bottom:0px;
color:#fff;
`;


 const Column=styled.div`
  margin-left:30px;
  float: left;
  width: 30%;
  padding: 10px;
  height: auto; /* Should be removed. Only for demonstration */
  @media screen and (max-width: 670px) {
    
      width: 100%;
    }
`;

/* Clear floats after the columns */
 const Row=styled.div`
  content: "";
  display: table;
  clear: both;
`;



const Footer = () => {

  const fetchURL = config.drupal_url+'/Footer';
  const [items, setItems] = useState();

  useEffect(() => {
    const getItems = () => fetch(fetchURL).then(res => res.json());
     getItems().then(data => setItems(data));
  }, [fetchURL,setItems]);


  return (
    <Container>
        {items &&
              items.map((footer, index) => (
                <>
      <Row>
        <Column>
          <Heading>About us</Heading>
          <p>
            {footer.Aboutus}
          </p>
        </Column>

        <Column>
          <Heading>Contact us</Heading>
          {/* <h2 style={{ fontSize: "1rem" }}>Address:</h2> */}
          <p>
          {footer.address}
          </p>
          <p>Phone: {footer.phone_number}</p>
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
               {(footer.lister_social_media_links.split(", ")).map((x,index)=>(<SocialIcon url={x} bgColor="#fff" style={{marginLeft:"5px" ,height:"24px",width:"24px"}} key={index}></SocialIcon>))}
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
      </>
              ))}
    </Container>
  );
};
export default Footer;



