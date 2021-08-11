import React, { useEffect } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import "./styles/style.css";
import BannerSearch from "../lottie/banner_serach_anime.json";
import BannerHi from "../lottie/banner_hi_team.json";
import Aos from "aos";
import "aos/dist/aos.css";
import { Grid } from "@material-ui/core";
const Container = styled.div`
  position: relative;
  z-index: 1;
  width: auto;
  padding-right: 1%;
  margin-left: 5%;
  h1 {
    color: #555;
    width: auto;
    margin: 0px;
    padding-bottom: 1%;
    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }
  @media (max-width: 400px) {
    height: 100%;
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
      <Grid container direction="column" spacing={2}>
        <Welcome id="Home">
          <InnerWrapper>
            <Grid item xs={12} md={3} lg={3}>
              <div className="lotties">
                <Lottie
                  options={defaultHi}
                  style={{
                    margin: "0",
                    right: "30%",
                    top: "25%",
                    position: "relative",
                    // opacity: 1,
                    height: "150%",
                    width: "150%",
                    cursor:"default",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Container>
                <div data-aos="fade-in">
                  <div className="hero-txt" style={{ width: "100%", position: "relative" }}>
                    <h1 id="banner_header">{data[1].banner_content_header}</h1>
                    <h1 id="banner_description">
                      {data[1].banner_content_description}
                    </h1>
                    <h1 id="banner_sub">
                      {data[1].banner_content_sub_description}
                    </h1>
                    <button class="button">
                      <span>
                        <a href="/Filterpage" style={{ fontWeight: "bold" }}>
                          Get Touch!!
                        </a>{" "}
                      </span>
                    </button>
                  </div>
                </div>
              </Container>
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <div className="lottie-2">
              <Lottie
                
                options={defaultOptions}
                style={{
                  justifyContent: "space-between",
                  width: "100%",
                  height: "90%",
                  backgroundColor: "#e5e5e5",
                  opacity: 0.8,
                  position: "relative",
                  right: 0,
                  cursor: "default",
                  overflow: "hidden",
                }}
              /></div>
            </Grid>
          </InnerWrapper>
        </Welcome>
        {/* <HowItWorks></HowItWorks> */}
        {/* <Project ></Project> */}
      </Grid>
    </>
  );
};

export default Home;

const InnerWrapper = styled.div`
  padding: 5%;
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 400px) : {
    height: 100vh;
  }
`;
const Welcome = styled.div`
  background-color: #e5e5e5;
  overflow: hidden;
  width: 100%;
  display: block;
  justify-content: space-between;
  align-items: center;
`;
