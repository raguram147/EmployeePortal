import React from "react";
// import mySvg from "../assets/avatardesign.svg";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import ContactMailSharpIcon from "@material-ui/icons/ContactMailSharp";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Grid from "@material-ui/core/Grid";
import '../components/styles/style.css';
import EditIcon from "@material-ui/icons/Edit";
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import { Paper,makeStyles } from "@material-ui/core";
import config from '../config';
const dummy = [
  {
    status: "active",
    summary:"If you don't make a step to change your own mind, there is no way to win the war against the world.",
  },
];
const useStyles = makeStyles((theme)=>({
  Grid_container: {
    margin: "0px",
    padding: "0px",
  },
  paper:{
    display: "block",
    backgroundColor: "#272727",
    padding: theme.spacing(1),
    maxHeight: "200px",
    height: "30%",
    color: "#fff",
    opacity:"0.5",
    fontSize:"0.8rem"
  }
}));

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
            <div
              className="Avatar"
              style={
                {
                  // backgroundImage: `url(${mySvg})`,
                  // backgroundSize: "cover",
                }
              }
            >
              <img
                src={`${config.drupal_url}/${x.Profile_photo}`}
                alt="Profile"
                className="EmpProfilephoto"
                key={index}
              ></img>
              {dummy.map((x) =>
                x.status === "active" ? (
                  <CheckCircleIcon
                    style={{
                      color: "#3ECC27",
                      bottom: "75%",
                      left: "380%",
                      position: "relative",
                    }}
                    title="Active"
                  ></CheckCircleIcon>
                ) : (
                  <RemoveCircleRoundedIcon
                    title="Inactive"
                    style={{
                      color: "red",
                      bottom: "75%",
                      left: "380%",
                      position: "relative",
                    }}
                  ></RemoveCircleRoundedIcon>
                )
              )}
              {/*Avatar ends here */}
            </div>
            <div className="Leftdashborad_details">
              <h2 className="Emplyoee_name">
                {x.name + " (" + x.Emp_id + ")"}
              </h2>
              <h2 className="Designation">{x.role}</h2>
              <Paper id="status" className={classes.paper}>{console.log(dummy[0].summary)}
                    <FormatQuoteIcon style={{color:"#FFA500"}}></FormatQuoteIcon>
                    {dummy[0].summary!==""? <p>{dummy[0].summary}</p>:<p>Hi I'm here in Lister</p>}
              </Paper>
              <div className="Grid_align">
                <Grid
                  container
                  xs={12}
                  spacing={1}
                  className={classes.Grid_container}
                  style={{ textAlign: "start", marginTop: "10%" }}
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
                      title="Mail to"
                      href="/"
                      className="left-details"
                      id="MailTo"
                      style={{ color: "#282936", wordBreak: "break-all" }}
                    >
                      {" " + x.email}
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
                    <p title="Experience" className="left-details">
                      {x.Experience} years
                    </p>
                  </Grid>
                </Grid>
              </div>
              <button class="button1">
                <span>
                  <a
                    href={config.drupal_url+"/node/"+x.nid+"/edit"}
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