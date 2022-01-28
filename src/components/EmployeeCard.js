import React from 'react'
// import { SocialIcon } from "react-social-icons";
import '../components/styles/style.css';
import emailIcon from "../assets/email-logo.png";
import orgIcon from "../assets/org.png";
import config from '../config';
/*
        Component       : It is the component of the Employee card that seen in the filter page.
        Author          : Created by Lister Yaswanth
        Child-Components: NIL
        Variables       : employee[] (API JSON)
        Libraries       : react-social-icons 


      
        Last Modified   :
        (Format "Name Date `MM-DD-YYY`")
      */
const experienceCalci = (doj) => {   //calculating experience from date of joining date
  var date = new Date().getDate();
  if (date < 10) {
    date = "0" + date;
  }
  var month = new Date().getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var year = new Date().getFullYear();
  var todayDate = month + "-" + date;
  let JoiningYear = doj.slice(0, 4);
  let JoiningMonth = doj.slice(5, 7);
  // let Joiningday = doj.slice(8);
  let exp =0;
  if (doj.includes(todayDate)){
    exp = year - JoiningYear;
  }else{
    if(JoiningMonth < month){
      exp = year - JoiningYear +(((month-JoiningMonth))/12);
    }else{
      exp = year - JoiningYear -1 +((12-(JoiningMonth-month))/12);
    }
  }

  return exp.toFixed(2);
};

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
          <p title={employee.name}className="Name" style={{ marginBottom: "1rem",textTransform: "capitalize" }}>
          {/* {employee.name.length>30?employee.name.split(" ")[0]:employee.name} */}
          {/* {employee.name.split(" ").length===2?employee.name:employee.name.length>30? employee.name.split(" ")[0]+" "+employee.name.split(" ")[1].substirng(0,1):employee.name.split(" ")[0]+" "+employee.name.split(" ")[1]} */}
          {(employee.name.length<23)?employee.name:employee.name.split(" ")[0]+" "+employee.name.split(" ")[1].charAt(0)}
          {console.log(employee.name)}
          {console.log(employee.name.length>20)}
          </p>
          {/* <p>{ employee.Emp_id }</p> */}
          <p style={{textTransform: "capitalize"}}>{employee.role}</p>
          <div className="Manager-email">
          {employee.Manager ? 
          <p style={{ textAlign: "left", fontSize: "0.7rem", marginBottom: "5px",  }} >
            <span style={{fontWeight:"600" }}>Manager: </span>{employee.Manager}
          </p>
          : 
           <p style={{ textAlign: "left", fontSize: "0.7rem", marginBottom: "5px",  }} >
          <span style={{fontWeight:"600" }}>Reports: </span>{employee.reports_to}
        </p>} 
           <a href={"mailto:" + employee.email}><img style={{borderRadius:"50%", textAlign: "right",height: "22px", marginRight:"14px" }} alt= "email-icon" src={emailIcon}></img></a>
         
          </div>
          <div className="exp-linkedin">
          <p style={{ textAlign: "left", fontSize: "0.7rem" }}>
            <span style={{fontWeight:"600" }}>Lister Experience: </span>{experienceCalci(employee.date_of_joining)+" years"} 
 
          </p>
          {/* <SocialIcon url={employee.linkedin_profile} bgColor="#282936" style={{borderRadius:"50%", textAlign: "right", fontSize: "0.7rem",height: "22px"  }} ></SocialIcon> */}
         {employee.employment_status==="Active"&& <a href={"/org-chart/" +employee.name}><img style={{textAlign: "center",height: "35px" ,marginRight:"8px"}} alt="Organization"  src={orgIcon}></img></a>}
          </div>
          <button class="button">
            <span>
              <a href={"/employee-details/" + employee.Emp_id}>View Profile</a>{" "}
            </span>
          </button>
        </div>
    </div>
    )
}



