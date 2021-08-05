import React from "react";
// import { SocialIcon } from "react-social-icons";, { useEffect, useState }
import styled from "styled-components";
// import config from '../config';



//  const Heading=styled.div`
// font-weight:700;
// `;



 const Container=styled.div`
padding: 1%;
background: #444444;
margin-bottom:0px;
color:#fff;

  span{
    padding-left:30%;
  }
`;
//copyright position is not fixed

//  const Column=styled.div`
//   margin-left:30px;
//   float: left;
//   width: 30%;
//   padding: 10px;
//   height: auto; /* Should be removed. Only for demonstration */
//   @media screen and (max-width: 670px) {
    
//       width: 100%;
//     }
// `;

/* Clear floats after the columns */
//  const Row=styled.div`
//   content: "";
//   display: table;
//   clear: both;
// `;



const Footer = () => {

  // const fetchURL = config.drupal_url+'/Footer';
  // const [items, setItems] = useState();

  // useEffect(() => {
  //   const getItems = () => fetch(fetchURL).then(res => res.json());
  //    getItems().then(data => setItems(data));
  // }, [fetchURL,setItems]);


  return (
    <Container>
        {/* {items &&
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
          <p>
          {footer.address}
          </p>
          <p>Phone: {footer.phone_number}</p>
        </Column>
        <Column>
          <Heading>Social media</Heading>
          <div style={{ display: "flex" }}>
     
               {(footer.lister_social_media_links.split(", ")).map((x,index)=>(<SocialIcon url={x} bgColor="#fff" style={{marginLeft:"5px" ,height:"24px",width:"24px"}} key={index}></SocialIcon>))}
          
            
          </div>
        </Column>
      </Row> */}
      <div style={{alignContent:"center", position:"relative"}}>
      <span >
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
      {/* </>
              ))} */}
    </Container>
  );
};
export default Footer;



