import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Wheel from "./Wheel";
import Skills from "./Skills";
import classes from "./styles/Projects.module.css";
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
  justify-between: space-evenly;
  display: flex;
  align-items: center;
  max-width: 1100px;
  padding: 30px;
  margin-left: 40px;
  @media screen and (max-width: 670) {
    width: 100%;
  }
`;
const fetchURL = config.drupal_url+'/Taxonomy/Projects';
const fetchSkill= config.drupal_url+'/Taxonomy/Skills';

const Projects = ({ project }) => {
  const [projectData, setProjectData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  useEffect(() => {
    const fetchFuntion = async () => {
      let data,data1
      // if(document.getElementById('projects'))
      // {  data = await fetch(fetchURL);}
      // else{ data= await fetch(fetchSkill);}
      data = await fetch(fetchURL);
      data1= await fetch(fetchSkill);
      // if (data.ok) {
        let res = await data.json();
        setProjectData(res);
         res = await data1.json();
        setSkillData(res);
      // }
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
        <h2 className={classes.Achievements_title}> Achievements </h2>
        <Carousel fade className={classes.Achievements}>
          <Carousel.Item>
            ​​​​​​​​
            <div className={classes.Achievement_text}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
              semper nisi. Aenean vulputate eleifend tellus
            </div>
            <Carousel.Caption>
              <h3>Achievement 1</h3>
              <p>Team description</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className={classes.Achievement_text}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
              semper nisi. Aenean vulputate eleifend tellus
            </div>

            <Carousel.Caption>
              <h3>Achievement 2</h3>
              <p>Team description</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className={classes.Achievement_text}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
              semper nisi. Aenean vulputate eleifend tellus
            </div>

            <Carousel.Caption>
              <h3>Achievement 3</h3>
              <p>Team description</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Projects;
