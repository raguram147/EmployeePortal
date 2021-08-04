import React from 'react'
import { SocialIcon } from "react-social-icons";
import '../components/styles/style.css';
import emailIcon from "../assets/email-logo.png";
import config from '../config';

export const EmployeeCard = ({employee}) => {
    return (
        <div className="Employee-details">
        <header>
          <div className="avatar">
            <img
              src={`${config.drupal_url}/${employee.Profile_photo}`}
              height="200"
              alt="profilephoto"
              className="profilephoto"
            ></img>
          </div>
        </header>
        {/* {employee.name} */}
        <div className="Employee-description">
          <p className="Name" style={{ marginBottom: "1rem" }}>
            {employee.name}
          </p>
          {/* <p>{ employee.Emp_id }</p> */}
          <p>{employee.role}</p>
          <div className="Manager-email">
          <p
            style={{
              textAlign: "left",
              fontSize: "0.7rem",
              marginBottom: "5px",
            }}
          >
            <span style={{fontWeight:"600" }}>Manager: </span>{employee.Manager}
          </p>
           <a href={"mailto:" + employee.email}><img style={{borderRadius:"50%", textAlign: "right",height: "22px", marginRight:"14px" }} alt= "email-icon" src={emailIcon}></img></a>
         
          </div>
          <div className="exp-linkedin">
          <p style={{ textAlign: "left", fontSize: "0.7rem" }}>
            <span style={{fontWeight:"600" }}> Experience: </span>{employee.Experience} years
          </p>
          <SocialIcon url={employee.linkedin_profile} bgColor="#282936" style={{borderRadius:"50%", textAlign: "right", fontSize: "0.7rem",height: "22px"  }} ></SocialIcon>
          </div>
          <button class="button">
            <span>
              <a href={"/EmployeeDetails/" + employee.Emp_id}>View Profile</a>{" "}
            </span>
          </button>
        </div>
    </div>
    )
}



