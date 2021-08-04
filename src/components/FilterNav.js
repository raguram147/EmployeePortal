import React,{useEffect,useState}  from "react";
import styled from "styled-components";
import Profile_icons from "../assets/User_icons.png";
import '../components/styles/style.css';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import Modal from "react-bootstrap/Modal";
// import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import config from '../config';

import { makeStyles,Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// import FilterScreen from '../FilterScreen'
// import {ReactComponent as LogoIcon}from "../assets/Logo.svg"
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

const FilterNav = ({Logo}) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const closeModal = () => {
      setOpen(false);
      setAnchorEl(null);
    };

    // const [show, setShow] = useState(false);
    // const handleShow = () => setShow(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setShow(false);
    console.log("good");
  };

  const handleLogOut = () => {
    window.sessionStorage.setItem("login", "false");
    console.log("good day");
    setAnchorEl(null);
    // setShow(false);
  };


    const fetchURL = config.drupal_url+'/FilterPageHeadFooter';
  
    const [items, setItems] = useState();
  
     useEffect(() => {
        const getItems = () => fetch(fetchURL).then(res => res.json());
       getItems().then(data => setItems(data));
    }, [fetchURL,setItems]);

    let params = new URLSearchParams((window.location).search);
    if (params.get("login") === "true") {
      window.sessionStorage.setItem("login", "true");
    }
    // console.log(Logo)
    return (
        <Nav>
            <Container>
                <img
                    src={`${config.drupal_url}/${Logo.website_logo}`}
                    alt="Skill Portal"
                    style={{height:'60px'}}
                ></img>
            {/* {console.log(items)} */}
            <div>
               {items && items.map((data, index) => (
                <Link style={NavBarItems} to={data.field_navigation_link}>{data.title}</Link>  ))}
                <a style={NavBarItems} href={config.drupal_url+"/admin/content"}>Dashboard</a>
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
                {/* <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Logging Out</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure want to Logout the account!<br></br>
                    <Button style={{ margin: '10px' }} variant="secondary" onClick={handleClose} onChange={handleLogOut}>
                      No,Wait
                    </Button>
                    <Button style={{ margin: '10px', backgroundColor: '#ef6e25', border: "#ef6e25", borderRadius: "10%" }} variant="primary" onClick={handleLogOut}>
                      Yes,Logout
                    </Button>
                  </Modal.Body>
                </Modal> */}
              </>
              : <Button1><a href={`${config.drupal_url}/user/login`} style={{ color: '#858586' }}>LOGIN</a></Button1>}
                </div>
            </Container>
        </Nav>
    );
};

export default FilterNav;

const Container = styled.div`
 display: flex;
 justify-content: space-between;
 width: 100%;
 align-items: center;
 flex-wrap: wrap;
 max-width: 100%;
 margin: auto;
 background-color:white;
 text-decoration: none;
 padding: 0;
 img{
 cursor: Pointer;
 background-color:white;
 }
`;


const Nav = styled.div`
 height: 50px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 flex-wrap: wrap;
 position: sticky;
 top: 0;
 left: 0;
 right: 0;
 z-index: 3;
`;

var NavBarItems = {
    margin: "0 30px 0px 0px",
    color: "#858586",
    textDecoration: "none"
  }
const Button1 = styled.button`
  font-family: Montserrat;
  font-size: 1rem;
  background: #ef6e25;
  border: none;
  padding: 5px 5px;
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
  a {
    text-decoration: none;
    &:hover {
      color: #ef6e25;
      background: none;
    }
  }
`;