import React, { useState, useEffect , useCallback} from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import '../components/styles/style.css';
import config from '../config';
// import FilterScreen from '../FilterScreen'
// import {ReactComponent as LogoIcon}from "../assets/Logo.svg"

const Navbar = ({navdata}) => {
  // console.log(navdata)
  const [isOpen, setIsOpen] = useState(false);
  const [nav, setNav] = useState(false);
  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 140) {
      if (!nav) {
        setNav(true);
      }
    } else {
      if (nav) {
        setNav(false);
      }
    }
  },[nav]);

  const fetchURL = config.drupal_url+'/HomeNav';
  
  const [HomeNav, setItems] = useState();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const getItems = () => fetch(fetchURL).then(res => res.json());
    getItems().then(data => setItems(data));
  }, [handleScroll,fetchURL,setItems]);

 
 
  return (
    <Nav onScroll={handleScroll}>
       <Container>
       <img src={ `${config.drupal_url}/${navdata.website_logo}` } alt="Skill Portal"></img>

        {/* <LogoIcon></LogoIcon> */}
        {/* {console.log(navdata)} */}
        <Humburger onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </Humburger>
        <Menu isOpen={isOpen}>

          <LinkWrapper >
          {/* <Link to="/FilterPage" component={FilterScreen}>FilterPage</Link> */}
          {/* {console.log(HomeNav[0])}
          {console.log(sampleData[0])} */}
            {HomeNav && HomeNav.map((data, index) => (
              <Link id="menu" key={index} activeClass="active" to={data.url}
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}>
                <MenuLink  >
                  {data.name}
                </MenuLink>
              </Link>
            ))}
            <Button>LOGIN</Button>
          </LinkWrapper>
        </Menu>
      </Container>
    </Nav>
  );
};

export default Navbar;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  margin: auto;
  padding: 0;
  img{
    cursor: Pointer;
  }
  a {
    text-decoration: none;
    color: #000000;
    font-size: 18px;
    font-family: Montserrat;
    padding: 0.7rem 1.5rem;
    transition: all 0.2s ease-in;
    font-wegiht: 500;
    &:hover {
      color: #ef6e25;
      background: #e7e9fc;
    }
  }
`;
const Nav = styled.div`
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: ${({ nav }) => (nav ? "black" : "#e5e5e5")};
`;

const Menu = styled.div`
  diplay: flex;
  justy-content: space-between;
  align-item: center;
  position: relative;
  @media (max-width: 768px) {
    background-color: rgba(255, 255, 255, 0.9);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      -webkit-backdrop-filter: blur(35px);
      backdrop-filter: blur(15px);
      background-color: rgba(255, 255, 255, 0.4);
    }
    border-radius: 1rem;
    margin-top: 1rem;
    box-shadow: -4px 8px 15px 1px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;
const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0.5rem 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const MenuLink = styled.div`
 text-decoration: none;
 color: #858586;
 font-size: 1rem;
 padding: 0rem;
 transition: all 0.2s ease-in;
 border-radius: 0.5rem;
 font-weight: 500;
 cursor:pointer;
 &:hover {
 color:#ef6e25;
 background: #e7e9fc;
 }`;
const Button = styled.button`
  font-family: Montserrat;
  font-size: 1rem;
  background: #ef6e25;
  border: none;
  padding: 15px 45px;
  color: #fff;
  border-radius: 1rem;
  box-shadow: 0px 2px 3px -2px #ef6e25;
  transition: all 0.2s ease-in;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 5px 12px -6px #ef6e25;
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
  }
`;
const Humburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #ef6e25;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 670px) {
    display: flex;
  }
`;
