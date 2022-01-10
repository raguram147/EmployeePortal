import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import ContactMailSharpIcon from "@material-ui/icons/ContactMailSharp";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Grid from "@material-ui/core/Grid";
import "../components/styles/style.css";
import EditIcon from "@material-ui/icons/Edit";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { Paper, makeStyles } from "@material-ui/core";
import config from "../config";
/*Dummy date for the status and description*/
const dummy = [
  {
    status: "active",
    summary:
      "If you don't make a step to change your own mind, there is no way to win the war against the world.",
  },
];
/*Customized styles of the material-ui components, like Paper,chip*/
const useStyles = makeStyles((theme) => ({
  Grid_container: {
    margin: "0px",
    padding: "0px",
  },
  paper: {
    display: "block",
    backgroundColor: "#272727",
    padding: theme.spacing(1),
    maxHeight: "200px",
    height: "30%",
    color: "#fff",
    opacity: "0.8",
    fontSize: "0.8rem",
  },
}));
/*
        Component       : It is the inner component of the Employee detials page,represent the left part.
        Author          : Created by Lister Raguram Sundaravadivel
        Child-Components: NIL
        Variables       : data[] (API JSON) 
        Material-UI     : ICONS - CheckCircleIcon, RemoveCircleRoundedIcon, ContactMailSharpIcon, AccountTreeOutlinedIcon, AccessTimeIcon, FormatQuoteIcon, EditIcon 
                          COMP  - Grid,Paper
      
        Last Modified   :
        (Format "Name Date `MM-DD-YYY`")
      */
const LeftDashborad = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      {console.log(data)}
      {data.map((x, index) => (
        //Left side of the profile dashboard

        <div className="LeftDashboard" key={index}>
          <div className="LeftDashboard-container">
            {/* Profile picture and its frame and status icons  */}
            <div className="Avatar">
              <img
                src={`${config.drupal_url}/${x.Profile_photo}`}
                alt="Profile"
                className="EmpProfilephoto"
                key={index}
              ></img>
              {data.map((x) =>
                x.employment_status === "Active" ? (
                  <CheckCircleIcon
                    className="status-icon"
                    style={{
                      color: "#3ECC27",
                      bottom: "65%",
                      position: "relative",
                    }}
                    title="Active"
                  ></CheckCircleIcon>
                ) : (
                  <RemoveCircleRoundedIcon
                    title="Inactive"
                    style={{
                      color: "red",
                      bottom: "65%",
                      left: "80%",
                      position: "relative",
                    }}
                  ></RemoveCircleRoundedIcon>
                )
              )}
              {/*Avatar ends here */}
            </div>
            <div className="Leftdashborad_details">
              <a className="Employee_name" style={{textTransform:"capitalize", textOverflow:"ellipsis",overflowX:"hidden"}} href={"/OrgChart/" +x.name}>
                {x.name + " (" + x.Emp_id + ")"}
              </a>
              <h2 className="Designation" style={{textTransform:"capitalize", textOverflow:"ellipsis",overflowX:"hidden"}}>{x.role}</h2>
              {/* <h2 className="Employee_name" style={{ color: "#282936"}}>{ x.employment_type}</h2> */}
              <Paper id="status" className={classes.paper} style={{textTransform:"capitalize", textOverflow:"ellipsis",overflowX:"hidden"}}>
                {console.log(dummy[0].summary)}
                <FormatQuoteIcon style={{ color: "#FFA500" }}></FormatQuoteIcon>
                {dummy[0].summary !== "" ? (
                  <p>{dummy[0].summary}</p>
                ) : (
                  <p>Hi I'm here in Lister</p>
                )}
              </Paper>
              <div className="Grid_align">
                <Grid
                  container
                  xs={12}
                  spacing={1}
                  className={classes.Grid_container}
                  style={{ textAlign: "start", marginTop: "10%"  ,textOverflow:"ellipsis",overflowX:"hidden"}}
                >
                  <Grid item xs={3}>
                    <ContactMailSharpIcon
                      className="LeftDashboard_icon"
                      style={{
                        display: "block",
                        color: "#373737",
                        left: 0,
                        height: "18px",
                      }}
                    ></ContactMailSharpIcon>
                  </Grid>
                  <Grid item xs={9}>
                    <a
                      title={x.email}
                      href="/"
                      className="left-details"
                      id="MailTo"
                      style={{ color: "#282936", wordBreak: "keep-all" }}
                    >
                      {" " + x.email  }
                    </a>
                  </Grid>

                  <Grid item xs={3}>
                    <AccountTreeOutlinedIcon
                      className="LeftDashboard_icon"
                      style={{
                        display: "block",
                        color: "#373737",
                        left: 0,
                        height: "18px",
                      }}
                    ></AccountTreeOutlinedIcon>
                  </Grid>
                  <Grid item xs={9}>
                    <p title="Organization" className="left-details">
                      {x.Pod}
                    </p>
                  </Grid>
                  <Grid item xs={3}>
                    <AccessTimeIcon
                      className="LeftDashboard_icon"
                      style={{
                        display: "block",
                        color: "#373737",
                        left: 0,
                        height: "18px",
                      }}
                    ></AccessTimeIcon>
                  </Grid>
                  <Grid item xs={9}>
                    <p title="Lister Experience" className="left-details">
                      {x.lister_experience} Years
                    </p>
                  </Grid>
                  <Grid item xs={3}>
                    <p title="Employment type" className="left-details"style={{ color: "#282936"}}>
                      Type
                    </p>
                  </Grid>
                  <Grid item xs={9}>
                    <p className="left-details" >
                      {x.employment_type}
                    </p>
                  </Grid>
                  <Grid item xs={3}>
                    <p title="Current Project"className="left-details" style={{ color: "#282936"}} >
                      Project
                    </p>
                  </Grid>
                  <Grid item xs={9}>
                    <p className="left-details" >
                      {x.current_working_project}
                    </p>
                  </Grid>
                  <Grid item xs={3}>
                    <p title="Lister Level"className="left-details" style={{ color: "#282936"}} >
                      Level
                    </p>
                  </Grid>
                  <Grid item xs={9}>
                    <p className="left-details" >
                      {x.lister_level}
                    </p>
                  </Grid>
                </Grid>
              </div>
              <button class="button1">
                <span>
                  <a
                    href={config.drupal_url + "/node/" + x.nid + "/edit"}
                    style={{ fontWeight: "bold" }}
                    id="Edit-btn"
                  >
                    <EditIcon></EditIcon> Edit Profile
                  </a>{" "}
                </span>
              </button>
            </div>
          </div>
          {/*Left dashborad ends */}
        </div>
      ))}
    </>
  );
};

export default LeftDashborad;
