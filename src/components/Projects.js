import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Wheel from "./Wheel";
import Skills from "./Skills";
import he from "he";
import { Carousel } from 'react-bootstrap';
import config from '../config';
const Container = styled.div`
    top:10%;
    overflow:hidden;
    font-family: Montserrat;
    width:100%
    height: 250vh;
    background-color: #ffebcc;
}`;

const Left = styled.div`
  h1 {
    color: #939191;
    font-size: 2rem;
    font-weight: 600;
  }
  p {
    font-size: 1.3rem;
  }
`;

const Right = styled.div`
  display: -webkit-box;
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
    position: relative;
    font-size: 1.3rem;
    left: 25%;
  }
`;
const Heading = styled.h1`
  margin-left: 30px;
  padding: 2rem;
  font-weight: 700;
  font-size: 2rem;
`;

const Row = styled.div`
  text-align: left;
  justify-between: space-between;
  display: flex;
  align-items: center;
  width:85%;
  max-width: 100%;
  padding: 30px;
  margin:0 40px 0 0;
  @media screen and (max-width: 670) {
    width: 100%;
  }
  @media screen and (min-width: 1100) {
    max-width: 100%;
    width: 100%;
  }
`;
const fetchURL = config.drupal_url+'/Taxonomy/Projects';
const fetchSkill= config.drupal_url+'/Taxonomy/Skills';

const Projects = ({ project }) => {
  let count = 1;
  const [projectData, setProjectData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  useEffect(() => {
    const fetchFuntion = async () => {
      let data,data1
      data = await fetch(fetchURL);
      data1= await fetch(fetchSkill);
        let res = await data.json();
        setProjectData(res);
         res = await data1.json();
        setSkillData(res);
    };
    fetchFuntion();
  }, []);

  return (
    <>
      <Container id="Categories">
        <Heading>Projects and Skills</Heading>
        <Row>
          <Left id="top_left">
            {project &&
              project.map((x, index) => (
                <p key={index}>
                  {he.decode(x.project_description.replace(/<[^>]+>/g, ""))}
                </p>
              ))}
          </Left>
          <Right id="top_right">
            {" "}
            {projectData && <Wheel id="projects" card={projectData}></Wheel>}
          </Right>
        </Row>
        <Row>
          <Left id="bottom_left">
            <Skills id="skills" skill={skillData}></Skills>
          </Left>
          <Right id="bottom_right">
            {project &&
              project.map((x, index) => (
                <p key={index}>{x.skills_description}</p>
              ))}
          </Right>
        </Row>
      </Container>
      <div id="Acheivements">
        <h2 className="Achievements_title"> Achievements </h2>


        <Carousel fade className="Achievements">
        {project && project[1].Achievements.split(".....").map((x, index) => (
          <Carousel.Item>
            ​​​​​​​​
            <div className="Achievement_text">
                {x}
            </div>
            <Carousel.Caption>
              <h3>Achievement {count++}</h3>
              <p>Team description</p>
            </Carousel.Caption>
          </Carousel.Item>
              ))}
         </Carousel>
      </div>
    </>
  );
};

export default Projects;
