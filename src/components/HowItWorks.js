import { React, useEffect } from "react";
import styled from "styled-components";
import Aos from "aos";
import perfect from "../assets/perfect.png";
import search from "../assets/search.png";
import share from "../assets/share.png";
import { Grid, useTheme } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Banner = styled.div`
 overflow: hidden;
 width: 100%;
 max-width: 100%;
 justify-content: space-between;
 align-items: center;
 background-color: #f5f5f5;
 padding: 5%;
`;

const LeftHowItworks = styled.div`
 position: relative;
 margin: 0px;
 padding: 0px;
 justify-content: center;
 align-items: center;
 img {
 height: 65%;
 width: 45%;
 @media (max-width: 500px) {
 margin-left: 30%;
 }
 }
 h1 {
 color: #939191;
 font-size: 2rem;
 font-weight: 600;
 @media (max-width: 600px) {
 font-size: 1.5rem;
 }
 @media (min-width: 500px) and (max-width: 960px) {
 margin-top: 10%;
 }
 }
 p {
 font-size: 1.2rem;
 @media (max-width: 600px) {
 font-size: 1rem;
 }
 }
`;

const RightHowItworks = styled.div`
 margin: 0px;
 position: relative;
 padding: 0px;
 justify-content: center;
 align-items: center;
 img {
 height: 50%;
 width: 50%;
 justify-content: space-around;
 margin-left: 30%;
 @media (max-width: 500px) {
 margin-left: 30%;
 }
 }
 h1 {
 color: #939191;
 font-size: 2rem;
 font-weight: 600;
 @media (max-width: 600px) {
 font-size: 1.5rem;
 }
 }
 p {
 font-size: 1.2rem;
 @media (max-width: 600px) {
 font-size: 1rem;
 }
 }
`;
const Heading = styled.h1`
 text-align: center;

 font-weight: 700;
 font-size: 2rem;
 @media (max-width: 400px) {
 margin: 0;
 margin-bottom: 0.7rem;
 padding: 0rem;
 font-weight: 700;
 font-size:1.5rem;
 }
`;

const Row = styled.div`
 text-align: left;
 justify-content: center;
 display: block;
 align-items: center;
 width: 100%;
 margin-bottom: 5%;
 @media (max-width: 400px) {
 margin-bottom: 0;
 }
`;
export const HowItWorks = () => {
    const theme = useTheme();
    let matches = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);
    return (
        <Banner id="Howitworks">
            <Heading>How it Works</Heading>
            <Grid
                container
                xs={12}
                sm={12}
                md={12}
                lg={12}
                spacing={0}
                direction="column"
            >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Row>
                        <Grid container direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div data-aos="fade-right" className="Left">
                                    <LeftHowItworks>
                                        <h1>Explore</h1>
                                        <p>
                                            Looking to fill a new opening in your project? Search for
                                            probable match as per your need
                                        </p>
                                    </LeftHowItworks>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div data-aos="fade-left" className="Right">
                                    <RightHowItworks>
                                        <img src={search} alt="search"></img>
                                    </RightHowItworks>
                                </div>
                            </Grid>
                        </Grid>
                    </Row>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Row>
                        <Grid container direction={matches ? "column-reverse" : "row"}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div
                                    data-aos={matches ? "fade-left" : "fade-right"}
                                    className="Left"
                                >
                                    <LeftHowItworks>
                                        <img src={perfect} alt="filter"></img>
                                    </LeftHowItworks>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div
                                    data-aos={matches ? "fade-right" : "fade-left"}
                                    className="Right"
                                >
                                    <RightHowItworks>
                                        <h1> Connect</h1>
                                        <p>
                                            {" "}
                                            Want to know who shares similar tech-interests as you?
                                            Start viewing your colleagues profiles
                                        </p>
                                    </RightHowItworks>
                                </div>
                            </Grid>
                        </Grid>
                    </Row>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Row>
                        <Grid container direction="row">
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div data-aos="fade-right" className="Left">
                                    <LeftHowItworks>
                                        <h1>Collaborate</h1>
                                        <p>
                                            Have a creative idea and want to share with fellow
                                            Listerians? Open up your mind and start working together
                                        </p>
                                    </LeftHowItworks>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div data-aos="fade-left" className="Right">
                                    <RightHowItworks>
                                        <img src={share} alt="reach and work"></img>
                                    </RightHowItworks>
                                </div>
                            </Grid>
                        </Grid>
                    </Row>
                </Grid>
            </Grid>
        </Banner>
    );
};
