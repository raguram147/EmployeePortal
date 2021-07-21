import React from "react";
import styled from "styled-components";
import HomeText from "./HomeText.js";
import Howitworks from "./Howitworks.js";
import Project from "./Projects.js"
// import { ReactComponent as Target } from "../assets/target.svg";

import Lottie from "react-lottie";
import classes from "./styles/Projects.module.css";
import BannerSearch from "../lottie/banner_serach_anime.json";
import BannerHi from "../lottie/banner_hi_team.json";
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
            <HomeText welcome={data} style={{ left: '20px' }}></HomeText>
            <Lottie
              className={classes.lottie}
              options={defaultHi}
              height={400}
              width={400}
              style={{ left: '0', top: '18%', position: 'absolute', opacity: 0.4 }} />

          </Left>
          <RightContent>
            <Lottie
              className={classes.lottie}
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
      <Howitworks ></Howitworks>
      <Project project={data}></Project>
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
