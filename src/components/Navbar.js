import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import '../components/styles/style.css';
import config from '../config';
import Profile_icons from "../assets/User_icons.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles,Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Navbar = ({ navdata }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  // console.log(navdata)
  const [isOpen, setIsOpen] = useState(false);
  const fetchURL = config.drupal_url + '/HomeNav';

  const [HomeNav, setItems] = useState();

  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
   
  };

  const handleLogOut = () => {
    window.sessionStorage.setItem("login", "false");
    console.log("good day");
    setAnchorEl(null);
    // setShow(false);
  };

  useEffect(() => {
    const getItems = () => fetch(fetchURL).then(res => res.json());
    getItems().then(data => setItems(data));
  }, [ fetchURL, setItems]);


  let params = new URLSearchParams((window.location).search);
  if (params.get("login") === "true") {
    window.sessionStorage.setItem("login", "true");
  }
  return (
    <Nav>
      <Container>
        <img src={`${config.drupal_url}/${navdata.website_logo}`} alt="Skill Portal"></img>

        {/* <LogoIcon></LogoIcon> */}
        {console.log("login:" + window.sessionStorage.getItem("login"))}
        <Humburger onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </Humburger>
        <Menu1 isOpen={isOpen}>

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
            {window.sessionStorage.getItem("login") === "true" ?
              <>
                <img
                  className="Profile_icons"
                  src={Profile_icons}
                  alt="Profile"
                  onClick={handleClick}
                ></img>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  style={{ top: "40px", right: "5%" }}
                >
                  <MenuItem onClick={handleClose}><a href={`${config.drupal_url}/node/add/employee`} className="Profile-Nav" style={{ textDecoration: "none" }}>Profile</a></MenuItem>
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                  <MenuItem onClick={handleOpen}>Logout</MenuItem>
                </Menu>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={closeModal}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <div className={classes.paper}>
                    Are you sure want to Logout the account!<br></br>
                    <Button style={{ margin: '10px' }} variant="secondary" onClick={closeModal} onChange={handleLogOut}>
                      No,Wait
                    </Button>
                    <Button style={{ margin: '10px', backgroundColor: '#ef6e25', border: "#ef6e25", borderRadius: "10%" }} variant="primary" onClick={handleLogOut}>
                      Yes,Logout
                    </Button>
                    </div>
                  </Fade>
                </Modal>
   
              </>
              : <Button1><a href={`${config.drupal_url}/user/login`} style={{ color: '#f5f5f5' }}>LOGIN</a></Button1>}
          </LinkWrapper>
        </Menu1>
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
  padding: 0.5%;
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

const Menu1 = styled.div`
  diplay: flex;
  justy-content: space-between;
  align-item: center;
  position: relative;
  @media (max-width: 850px) {
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

 }`;
const Button1 = styled.button`
  font-family: Montserrat;
  font-size: 1rem;
  background: #ef6e25;
  border: none;
  padding: 8px 10px;
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
  @media (max-width: 850px) {
  }
  a {
    text-decoration: none;
    color: white;
    &:hover {
      color: white;
      background: none;
    }
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
  @media (max-width: 850px) {
    display: flex;
  }
`;
