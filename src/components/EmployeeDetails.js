import React, { Component } from "react";
import "../components/styles/style.css";
import config from "../config";
import MiddleDashborad from "./MiddleDashborad";
import LeftDashborad from "./LeftDashboard";
import RightDashboard from "./RightDashboard";
import { Grid } from "@material-ui/core";
/*
        Component       : It is the employee details page,based on the id choosen.
        Author          : Created by Lister Raguram Sundaravadivel
        Child-Components: LeftDashborad,RightDashboard and MiddleDashboard
        Variables       : id,Empolyee[]
     
        Last Modified   :
        (Format "Name Date `MM-DD-YYY`")
      */
export default class EmployeeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.Emp_id,
      Employee: [],
    };
  }

  componentDidMount() {
    fetch(config.drupal_url + "/Employees/" + this.state.id)
      .then((x) => x.json())
      .then((x) => this.setState({ Employee: x }));
  }
  render() {
    let Employees = this.state.Employee;
    console.log(Employees);
    return (
      <div className="Employee">
        <div className="wave"></div>
        <Grid
          xs={12}
          sm={12}
          mg={12}
          lg={12}
          container
          direction="row"
          spacing={0.5}
          style={{ color: "#272727" }}
        >
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <LeftDashborad data={Employees}></LeftDashborad>
          </Grid>

          <Grid item xs={12} sm={12} md={9} lg={9}>
            {/* <div className="right-container" > */}
            <Grid container spacing={0} xs={12} sm={12} md={12} lg={12}>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <MiddleDashborad data={Employees}></MiddleDashborad>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <RightDashboard data={Employees}></RightDashboard>
              </Grid>
            </Grid>
            {/* </div> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}
