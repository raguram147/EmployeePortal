import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Wheel from "./Wheel";
import Skills from "./Skills";
import he from "he";
import { Carousel } from "react-bootstrap";
import config from "../config";
import "../components/styles/style.css";
import { Grid, useMediaQuery, useTheme } from "@material-ui/core";
const Container = styled.div`
   padding:5%;
    overflow:hidden;
    font-family: Montserrat;
    width:100%;
    height: 100%;
    background-color: #282828;
    color: white;
}`;
// #ffebcc;
const Left = styled.div`
  h1 {
    color: #939191;
    font-size: 2rem;
    font-weight: 600;
  }
  p {
    font-size: 1.2rem;
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;

const Right = styled.div`
  margin: 0;
  padding: 0;
  img {
    padding-right: 0;
    margin-right: -10px;
    right: 0;
  }
  h1 {
    color: #939191;
    font-size: 2rem;
    font-weight: 600;
  }
  p {
    font-size: 1.2rem;
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;
const Heading = styled.h1`
  margin-bottom: 2%;
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  @media (max-width: 400px) {
    font-size:1.5rem;
    font-weight: 700;
  }
`;

const Row = styled.div`
  text-align: left;
  justify-between: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  @media (min-width: 960px) and (max-width: 1100px) {
    margin-bottom: 10%;
  }
`;
const fetchURL = config.drupal_url + "/Taxonomy/Projects";
const fetchSkill = config.drupal_url + "/Taxonomy/Skills";

const Projects = ({ project }) => {
  const theme = useTheme();
  let matches = useMediaQuery(theme.breakpoints.down("xs"));
  const [projectData, setProjectData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  useEffect(() => {
    const fetchFuntion = async () => {
      let data, data1;
      data = await fetch(fetchURL);
      data1 = await fetch(fetchSkill);
      let res = await data.json();
      setProjectData(res);
      res = await data1.json();
      setSkillData(res);
    };
    fetchFuntion();
  }, []);

  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Container id="Categories">
            <Heading>Projects and Skills</Heading>
            <Grid container xs={12} sm={12} md={12} lg={12}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Row>
                  <Grid container xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Left id="top_left">
                        {project &&
                          project.map((x, index) => (
                            <div key={index}>
                              {he
                                .decode(
                                  x.project_description.replace(/<[^>]+>/g, "")
                                )
                                .split("....,")
                                .map((projectDesc, index) => (
                                  <p>{projectDesc}</p>
                                ))}
                            </div>
                          ))}
                      </Left>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Right
                        id="top_right"
                        style={{ display: matches ? "none" : "block" }}
                      >
                        {" "}
                        {projectData && (
                          <Wheel id="projects" card={projectData}></Wheel>
                        )}
                      </Right>
                    </Grid>
                  </Grid>
                </Row>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Row>
                  <Grid container xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Left
                        id="bottom_left"
                        style={{ display: matches ? "none" : "block" }}
                      >
                        <Skills id="skills" skill={skillData}></Skills>
                      </Left>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Right id="bottom_right">
                        {project &&
                          project.map((x, index) => (
                            <div key={index}>
                              {x.skills_description
                                .split("....,")
                                .map((skillsDesc, index) => (
                                  <p>{skillsDesc}</p>
                                ))}
                            </div>
                          ))}
                      </Right>
                    </Grid>
                  </Grid>
                </Row>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {" "}
          <div id="Acheivements" className="Achievments-container">
            <Heading>Achievements</Heading>

            <Carousel variant="dark" className="Achievements">
              {project &&
                project[1].Achievements.split("....,").map((x, index) => (
                  <Carousel.Item>
                    <div className="Achievement_text">
                      {x.split("---")[0]}
                    </div>
                    <Carousel.Caption style={{ zIndex: "0" }}>
                      {/* <h3>Achievement {count++}</h3> */}
                      <p style={{ color: "#e16428", zIndex: "0" }}>
                        {x.split("---")[1]}
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Projects;