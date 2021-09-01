import React from "react";
import Lottie from "react-lottie";
import { Chip, Grid, Paper, makeStyles } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import Rocket from "../lottie/rocket_man.json";

/* Rocket animation in the right-bottom*/
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Rocket,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
/*Customized styles of the material-ui components, like Paper,chip*/
const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    fontWeight: 600,
  },
  paper: {
    display: "block",
    backgroundColor: "#272727",
    padding: theme.spacing(2),
    width: "100%",
    height:"90%",
    overflowY:"auto",
    color: "#fff",
    marginRight:"0 !important",
  },
  Innerwrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    height: "-webkit-fill-available",
  },
  paper1: {
    backgroundColor: "#272727",
    padding: theme.spacing(2),
    width: "100%",
    height:"90%",
    color: "#fff",
    overflowY:"auto",
  },
  fire_icon: {
    color: "#e25822",
    height: "20px",
  },
  para: {
    marginBottom: "5px",
  },
  Right_grid: {
    zIndex: 1,
  },
}));
/*
        Component       : It is the inner component of the Employee detials page.
        Author          : Created by Lister Raguram Sundaravadivel
        Child-Components: NIL
        Variables       : data[] (API JSON) 


      
        Last Modified   :
        (Format "Name Date `MM-DD-YYY`")
      */
const RightDashboard = ({ data }) => {
  const classes = useStyles();
  let icons = (
    <StarsIcon style={{ height: "18px", color: "#272121" }}></StarsIcon>
  );
  return (
    <>
      {data.map((x) => (
        <div className="RightDashboard">
          <Grid container xs={12} sm={12} lg={12}>
            <Grid item xs={12} sm={12} lg={12}>
              <Paper className={classes.paper}>
                <h1 className="heading">Skills</h1>

                {x.primary_skills.split(", ").map((value) => (
                  <Chip
                    className={classes.chip}
                    classname={classes.chip}
                    style={{ backgroundColor: "#E16428", color: "#f1f1f1" }}
                    label={value}
                  />
                ))}
                {x.secndary_skills.split(", ").map((value) => (
                  <Chip
                    variant="outlined"
                    classname={classes.chip}
                    style={{ border: "#E16428 solid 2px", color: "#E16428" }}
                    label={value}
                  />
                ))}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <Paper className={classes.paper}>
                <h1 className="heading">Tools</h1>

                {x.tools_familiar.split(", ").map((value) => (
                  <Chip
                    className={classes.chip}
                    style={{ backgroundColor: "#E16428", color: "#f1f1f1" }}
                    label={value}
                  ></Chip>
                ))}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <Paper className={classes.paper1}>
                <h1 className="heading">Certificates</h1>

                {x.certifications.map((value) => (
                  <Chip
                    className={classes.chip}
                    style={{ backgroundColor: "#E16428", color: "#f1f1f1" }}
                    label={value}
                    icon={icons}
                  ></Chip>
                ))}
              </Paper>
            </Grid>
          </Grid>
          <Lottie
            className="lottie"
            id='lottie'
            options={defaultOptions}
            height={200}
            width={200}
            style={{
              background: "transparent",
              zIndex: "0",
              left: "-5%",
              bottom: "-5%",
              position: "fixed",
              cursor: "default",
            }}
          />
        </div>
      ))}
    </>
  );
};

export default RightDashboard;