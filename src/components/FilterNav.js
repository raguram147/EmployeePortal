import React,{useEffect,useState}  from "react";
import styled from "styled-components";
import Profile_icons from "../assets/User_icons.png";
import '../components/styles/style.css';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import config from '../config';

const FilterNav = ({Logo}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShow(false);
    };

    const fetchURL = config.drupal_url+'/FilterPageHeadFooter';
  
    const [items, setItems] = useState();
  
     useEffect(() => {
        const getItems = () => fetch(fetchURL).then(res => res.json());
       getItems().then(data => setItems(data));
    }, [fetchURL,setItems]);

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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    <MenuItem onClick={handleShow}>Logout</MenuItem>
                </Menu>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Logging Out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure want to Logout the account!<br></br>
                        <Button style={{ margin: '10px' }} variant="secondary" onClick={handleClose}>
                            No,Wait
                        </Button>
                        <Button style={{ margin: '10px', backgroundColor: '#ef6e25', border: "#ef6e25" }} variant="primary" onClick={handleClose}>
                            Yes,Logout
                        </Button>
                    </Modal.Body>
                </Modal>
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
    margin: "0 40px",
    color: "#858586",

  }
