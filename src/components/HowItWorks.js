import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Aos from "aos";
import { Grid, useTheme } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import config from "../config";
import useFetch from "../Hooks/use-fetch";
/*
        Component       : It is the inner component of the Employee detials page repersents the middle part.
        Author          : Created by Lister- Raguram Sundaravadivel
        Child-Components: NIL
        Variables       : 
        Libarries       : styled-components,AOS(Animated on Scroll)

      
        Last Modified   :
        (Format "Name Date `MM-DD-YYY`")
      */
/*Styling using the sytled-component*/
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
      margin-top: 15%;
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
    font-size: 1.5rem;
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
  const [,fetchData,] = useFetch(); /*calling custom-hooks*/
  const theme = useTheme();
  let matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [HowItWorks, setItems] = useState();
  const fetchURL = config.drupal_url + "/HowItWorks";
  useEffect(() => {
    fetchData(fetchURL, (data) => {
      setItems(data);
    });

    Aos.init({ duration: 2000 });
  }, [fetchURL, fetchData]);
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
        item={true}
        direction="column"
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Row>
            {HowItWorks &&
              HowItWorks.map((x, index) =>
                index % 2 === 0 && HowItWorks[index] ? (
                  <div key={index}>
                    <Grid container xs={12} sm={12} md={12} lg={12} spacing={0} direction="row" item={true}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div data-aos="fade-right" className="Left">
                          <LeftHowItworks>
                            <h1>{x.title}</h1>
                            <p>{x.field_title_description}</p>
                          </LeftHowItworks>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div data-aos="fade-left" className="Right">
                          <RightHowItworks>
                            <img
                              src={`${config.drupal_url}/${x.field_picture}`}
                              alt={x.title}
                            ></img>
                          </RightHowItworks>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  <div key={index}>
                    <Grid
                      container
                      direction={matches ? "column-reverse" : "row"} spacing={0} item={true}
                    >
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div
                          data-aos={matches ? "fade-left" : "fade-right"}
                          className="Left"
                        >
                          <LeftHowItworks>
                            <img
                              src={`${config.drupal_url}/${x.field_picture}`}
                              alt={x.title}
                            ></img>
                          </LeftHowItworks>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div
                          data-aos={matches ? "fade-right" : "fade-left"}
                          className="Right"
                        >
                          <RightHowItworks>
                            <h1>{x.title}</h1>
                            <p>{x.field_title_description}</p>
                          </RightHowItworks>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                )
              )}
          </Row>
        </Grid>
      </Grid>
    </Banner>
  );
};
