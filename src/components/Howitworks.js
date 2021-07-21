import React, { useEffect } from "react";
import perfect from "../assets/perfect.png";
import search from "../assets/search.png";
import share from "../assets/share.png";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css"

const Conatiner = styled.div`
    display:flex;
    flex-direction:column;
    font-family: Montserrat;
    width:100%
    height: 250vh;
    background-color: #F5F5F5;
    @media (max-width:400px){
      height:100%;
    }
  `;

const Left_How_it_works = styled.div`

  margin: 0px;
  padding:0px;
  img {
    z-index:1;
    @media (max-width:400px){
      height:85%;
      width:85%;
    }
  }
  h1 {
    color:#939191;
    font-size: 2rem;
    font-weight: 600;
    @media (max-width:400px){
      font-size:1.3rem;
    }
  }
  p {
    font-size: 1.5rem;
    margin-left: 15px;
    @media (max-width:400px){
      font-size:0.8rem;
    }
  }
  @media (max-width:400px){
    width:100%;
    margin:0;
    padding:0;
    font-size:1rem;
}
  

`;

const Right_How_it_works = styled.div`
 
  margin: 0px;
  padding: 0px;
  img {
    padding-left:7rem ;
    z-index:1;
    @media (max-width:400px){
      height:85%;
      width:85%;
    }
  }
  h1 {
    color:#939191;
    font-size: 2rem;
    font-weight: 600;
    padding-left: 7rem;
    @media (max-width:400px){
      font-size:1.3rem;
    }
  }
  p {
    font-size: 1.5rem;
    margin-left: 15px;
    padding-left: 8rem;
    @media (max-width:400px){
      font-size:0.8rem;
    }
  }
  @media (max-width:400px){
    height:75%;
    width:100%;
    margin:0;
    padding:0;
}
  
`;
const Heading = styled.h1`
  
    margin-left:30px;
    padding:0.7rem;
    font-weight:700;
    font-size:2rem;
    @media (max-width:400px){
      margin:0;
      margin-bottom:0.7rem;
      padding:0rem;
      font-weight:700;
      font-size:1.8rem;
  }
`;

const Row = styled.div`
  text-align:left;
  padding-bottom:5%;
  justify-between: space-between;
  display: flex;
  align-items: center;
  max-width: 1100px;
  padding-left: 150px;
  @media (max-width:400px){
    width:100%;
    margin:0;
    padding:3%;
    font-size:1rem;
}
  
`;

const Howitworks = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });

  }, []);
  return (
    <>

      <Conatiner id="Howitworks">
        <Heading>How it Works</Heading>
        <Row>
          <div data-aos="fade-right" className="Left">
            <Left_How_it_works>
              <h1>Struck Ups, Facing issues Need Help?</h1>
              <p>The right place is here, Search here for right person.</p>
            </Left_How_it_works>
          </div>
          <div data-aos="fade-left" className="Right">
            <Right_How_it_works>
              <img src={search} alt="search"></img>
            </Right_How_it_works>
          </div>
        </Row>
        <Row>
          <div data-aos="fade-right" className="Left">
            <Left_How_it_works>
              <img src={perfect} alt="filter"></img>
            </Left_How_it_works>
          </div>
          <div data-aos="fade-left" className="Right">
            <Right_How_it_works>
              <h1> Look for the best one!</h1>
              <p> Find the perfect and wonderful matches.</p>
            </Right_How_it_works>
          </div>
        </Row>
        <Row>
          <div data-aos="fade-right" className="Left">
            <Left_How_it_works>
              <h1>Start sharing and get your needs!</h1>
              <p>Start Working together and do it quickly with sharing mind.</p>
            </Left_How_it_works>
          </div>
          <div data-aos="fade-left" className="Right">
            <Right_How_it_works>
              <img src={share} alt="reach and work"></img>
            </Right_How_it_works>
          </div>
        </Row>
      </Conatiner>
    </>
  );
};

export default Howitworks;
