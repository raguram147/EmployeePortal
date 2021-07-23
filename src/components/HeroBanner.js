import React, { useEffect } from "react";
import styled from "styled-components";

// import { ReactComponent as Target } from "../assets/target.svg";
import '../components/styles/style.css';
import Lottie from "react-lottie";
import BannerSearch from "../lottie/banner_serach_anime.json";
import BannerHi from "../lottie/banner_hi_team.json";

import perfect from "../assets/perfect.png";
import search from "../assets/search.png";
import share from "../assets/share.png";
import Aos from "aos";
import "aos/dist/aos.css"

const Banner = styled.div`
    position:relative;
    display:block;
    flex-direction:column;
    font-family: Montserrat;
    width:100%
    height: 250vh;
    background-color: #F5F5F5;
    @media (max-width:400px){
      height:100%;
    }
  `;

const LeftHowItworks = styled.div`

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
    margin-left: 3%;
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

const RightHowItworks = styled.div`
 
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
    margin-left: 2%;
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
  
    margin-left:2.5%;
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
  width:100%;
  padding-left: 10%;
  @media (max-width:400px){
    width:100%;
    margin:0;
    padding:3%;
    font-size:1rem;
}
  
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: BannerSearch,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultHi = {
  loop: true,
  autoplay: true,
  animationData: BannerHi,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};


const Home = ({ data }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });

  }, []);

  return (
    <>

      <div className="bubble x1"></div>
      <div className="bubble x2"></div>
      <div className="bubble x3"></div>
      <div className="bubble x4"></div>
      <div className="bubble x5"></div>
      <div className="bubble x6"></div>
      <Welcome id="Home">
        <InnerWrapper>
          <Left>
            <Container>
              {data &&
                data.map((x, index) => (
                  <>
                    <h1 key={index} id="banner_header">
                      {x.banner_content_header}</h1>
                    <h1 id="banner_description">{x.banner_content_description}</h1>
                    <h1 id="banner_sub">{x.banner_content_sub_description}</h1>
                  </>
                ))}
              <button class="button" id="getTouch">
                <span>
                  <a href="/Filterpage" style={{ fontWeight: 'bold' }}>Get Touch!!</a>{" "}
                </span>
              </button>
            </Container>
            <Lottie
              className="lottie"
              options={defaultHi}
              height={400}
              width={400}
              style={{ left: '0', top: '18%', position: 'absolute', opacity: 0.4 }} />

          </Left>
          <RightContent>
            <Lottie
              className="lottie"
              options={defaultOptions}
              height={250}
              width={300}
              style={{
                justifyContent: "space-between",
                backgroundColor: "#e5e5e5",
                opacity: 0.8,
                // position:'absolute',
                right: 0,
                cursor: "default",
                bottom: "-10px",
                overflow: "hidden",
              }}
            />
          </RightContent>
        </InnerWrapper>
      </Welcome>
      <Banner id="Howitworks">
        <Heading>How it Works</Heading>
        <Row>
          <div data-aos="fade-right" className="Left">
            <LeftHowItworks>
              <h1>Struck Ups, Facing issues Need Help?</h1>
              <p>The right place is here, Search here for right person.</p>
            </LeftHowItworks>
          </div>
          <div data-aos="fade-left" className="Right">
            <RightHowItworks>
              <img src={search} alt="search"></img>
            </RightHowItworks>
          </div>
        </Row>
        <Row>
          <div data-aos="fade-right" className="Left">
            <LeftHowItworks>
              <img src={perfect} alt="filter"></img>
            </LeftHowItworks>
          </div>
          <div data-aos="fade-left" className="Right">
            <RightHowItworks>
              <h1> Look for the best one!</h1>
              <p> Find the perfect and wonderful matches.</p>
            </RightHowItworks>
          </div>
        </Row>
        <Row>
          <div data-aos="fade-right" className="Left">
            <LeftHowItworks>
              <h1>Start sharing and get your needs!</h1>
              <p>Start Working together and do it quickly with sharing mind.</p>
            </LeftHowItworks>
          </div>
          <div data-aos="fade-left" className="Right">
            <RightHowItworks>
              <img src={share} alt="reach and work"></img>
            </RightHowItworks>
          </div>
        </Row>
      </Banner>
      
    </>
  );
};

export default Home;

// const LottieStyle = {
//   justifyContent: 'space-between',
//   backgroundColor: '#e5e5e5',
//   opacity: '0.5',
//   height: 75,
//   width: 100,
//   float: 'right'
// }
const InnerWrapper = styled.div`
    padding:10%;
    max-width:1000px
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;


`;
const Welcome = styled.div`
  background-color: #e5e5e5;
  height: 70vh;
  width: 100%;
  overflow:hidden;
  display: block;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 400px) {
    height: 80vh;
  }
`;
const Left = styled.div`
  width: 75%;
  @meida (max-width:400px) {
    width: 80%;
  }
`;
const RightContent = styled.div`
  overflow: hidden;
  width: 25%;
  animation: zoomInZoomOut 5s infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes zoomInZoomOut {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.2, 1.2);
    }
    100% {
      transform: scale(1, 1);
    }
  }
  @media (max-width: 670px) {
    display: none;
  }
`;

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
// const OuterCircle = styled.div`
//   width: 200px;
//   height: 200px;
//   border: 2px dashed #ef6e25;
//   background-color: ;
//   border-radius: 50%;
//   animation: spin 5s;
//   animation-duration: 5s;
//   animation-timing-function: ease;
//   animation-iteration-count: infinite;
// `;
// const InnerCircle = styled.div`
//   align-items: center;
//   position: absolute;
//   margin: 50px 0px 0px 47px;
//   width: 100px;
//   height: 100px;
//   border: 1.5px solid #ef6e25;
//   background-color: ;
//   border-radius: 50%;
//   animation: spin 5s;
//   animation-duration: 5s;
//   animation-timing-function: ease;
//   animation-iteration-count: infinite;
//   svg {
//     margin: 16px 10px 10px 16px;
//   }
// `;
