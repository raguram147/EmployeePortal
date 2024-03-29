import React, { Fragment } from "react";
import randomcolor from "randomcolor";
import { useParams } from "react-router-dom";
import "../components/styles/style.css";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Lottie from "react-lottie";
import Orgtree from "../lottie/org-tree.json";
import config from '../config';

const Chart = ({ empData }) => {
  let params = useParams();
  let BreadcrumbsArr = [];

  let head = [];
  window.sessionStorage.setItem("OrgLevel", 1);

  const ReportingPeople = (EmpName) => {
    if (JSON.parse(window.sessionStorage.getItem(EmpName + " Reporting"))) {
      return JSON.parse(window.sessionStorage.getItem(EmpName + " Reporting"));
    }

    let ReportingPeopleArr = [];
    let match = false;
    for (let i = 0; i < empData.length; i++) {
      let matching = false;
      if (!match && empData[i].reports_to.includes(EmpName)) {
        //checking for a match
        ReportingPeopleArr.push(empData[i]);
        match = true;
        matching = true;
      } else if (match && empData[i].reports_to.includes(EmpName)) {
        //after having match all the reporting employee will be in group
        ReportingPeopleArr.push(empData[i]);
        matching = true;
      }

      if (match && !matching) {
        //when the sequence of reporters broken then return the array
        window.sessionStorage.setItem(
          EmpName + " Reporting",
          JSON.stringify(ReportingPeopleArr)
        );
        return ReportingPeopleArr;
      }
    }
    return ReportingPeopleArr;
  };

  const ReportsTo = (Emp) => {
    let reportsTo = Emp[0].reports_to;

    let AllReportsToArr = [];

    if (reportsTo) {
      while (!reportsTo.includes("Srinivasan Gopal")) {
        let ReportsToArr = [];
        if (JSON.parse(window.sessionStorage.getItem(reportsTo))) {
          ReportsToArr = JSON.parse(window.sessionStorage.getItem(reportsTo));
          AllReportsToArr.push(ReportsToArr[0]);
        } else {
          for (let i = 0; i < empData.length; i++) {
            if (empData[i].name.includes(reportsTo)) {
              ReportsToArr.push(empData[i]);
              AllReportsToArr.push(empData[i]);
              window.sessionStorage.setItem(
                empData[i].name,
                JSON.stringify(ReportsToArr)
              );
              window.sessionStorage.setItem(
                "ReportsTo",
                JSON.stringify(ReportsToArr)
              );
            }
          }
        }
        reportsTo = ReportsToArr[0].reports_to;
      }
    }
    let CEO = [
      {
        name: "Srinivasan Gopal",
        emp_id: "0001",
        role: "Chief Executive Officer",
        DP: "/sites/default/files/default_images/DefaultDp_0.png",
      },
    ];
    AllReportsToArr.push(CEO[0]);
    AllReportsToArr.reverse();
    // console.log(AllReportsToArr);
    return AllReportsToArr;
  };
  const EmpDetails = (EmpName) => {
    let ReportsToArr = [];
    for (let i = 0; i < empData.length; i++) {
      if (empData[i].name.includes(EmpName)) {
        ReportsToArr.push(empData[i]);
        // console.log(ReportsToArr);
        return ReportsToArr;
      }
    }
    let CEO = [
      {
        name: "Srinivasan Gopal",
        emp_id: "0001",
        role: "Chief Executive Officer",
        DP: "/sites/default/files/default_images/DefaultDp_0.png",
      },
    ];

    return CEO;
  };
  //org chart level array initializations 2 cases for CEO and rem emp
  if (params.Emp === "Srinivasan Gopal") {
    //2 levels
    head = [
      {
        name: "Srinivasan Gopal",
        emp_id: "0001",
        role: "Chief Executive Officer",
        DP: "/sites/default/files/default_images/DefaultDp_0.png",
      },
    ];

    const Presidents = ReportingPeople(params.Emp);
    window.sessionStorage.setItem("ReportsTo", JSON.stringify(head));
    window.sessionStorage.setItem(head[0].name, JSON.stringify(head));

    for (let i = 0; i < Presidents.length; i++) {
      let EmpArr = [];
      EmpArr.push(Presidents[i]);
      window.sessionStorage.setItem(Presidents[i].name, JSON.stringify(EmpArr));
    }
    head = Presidents;
    let Reporting = [];
    window.sessionStorage.setItem("Reporting", JSON.stringify(Reporting));
  } else {
    // 3 levels for non ceo
    if (JSON.parse(window.sessionStorage.getItem(params.Emp))) {
      head = JSON.parse(window.sessionStorage.getItem(params.Emp));
      // console.log(head);
    } else {
      head = EmpDetails(params.Emp);
      window.sessionStorage.setItem(params.Emp, JSON.stringify(head));
      // console.log(head);
    }
    // console.log(params.Emp);
    // console.log(head);
    let EmpReportsTo = head[0].reports_to;
    // console.log(EmpReportsTo);
    window.sessionStorage.setItem(
      "Reporting",
      JSON.stringify(ReportingPeople(params.Emp))
    );

    BreadcrumbsArr = ReportsTo(head);
    if (EmpReportsTo) {
      if (JSON.parse(window.sessionStorage.getItem(EmpReportsTo))) {
        // if reports to data is stored in SS then no loop
        let ReportsToArr = [];
        ReportsToArr = JSON.parse(window.sessionStorage.getItem(EmpReportsTo));
        window.sessionStorage.setItem(
          "ReportsTo",
          JSON.stringify(ReportsToArr)
        );
      } else {
        let EmpReportsToDetails = EmpDetails(EmpReportsTo);
        window.sessionStorage.setItem(
          EmpReportsTo,
          JSON.stringify(EmpReportsToDetails)
        );
        window.sessionStorage.setItem(
          "ReportsTo",
          JSON.stringify(EmpReportsToDetails)
        );
      }
    } else {
      let Ceo = [
        {
          name: "Srinivasan Gopal",
          emp_id: "0001",
          role: "Chief Executive Officer",
          DP: "/sites/default/files/default_images/DefaultDp_0.png",
        },
      ];
      window.sessionStorage.setItem("ReportsTo", JSON.stringify(Ceo));
    }
  }
  // console.log(window.sessionStorage.getItem("ReportsTo"));
  // console.log(window.sessionStorage.getItem("Reporting"));

  const handleOnSelect = (Emp) => {
    // the item selected
    let EmpArr = [];
    EmpArr.push(Emp);
    window.sessionStorage.removeItem("ReportsTo");
    let name = Emp.name;
    window.sessionStorage.setItem(name, JSON.stringify(EmpArr));
    window.location.href = "/org-chart/" + name;
    // console.log(Emp);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Orgtree,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const formatResult = (item) => {
    return item;
  };
  return (
    <div className="org-container">
      {params.Emp === "Srinivasan Gopal" ? (
        <></>
      ) : (
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          {BreadcrumbsArr.map((item,index) => (
            <Link color="inherit" href={`/org-chart/${item.name}`} key={index}>
              {item.name}
            </Link>
          ))}
          <Typography  style={{ color: "#2c5c6d", fontWeight:"700" }} >{params.Emp}</Typography>
        </Breadcrumbs>
      )}
      <div className="searchWidget">
        <SearchIcon className="searchIcon"></SearchIcon>
        <div className="SearchAutocomplete" >
          <ReactSearchAutocomplete
            items={empData}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </div>
      <div className="org-tree">
        <Card data={head} />
      </div>
      <Lottie
        options={defaultOptions}
        style={{
          margin: "0",
          left: "0",
          bottom: "0%",
          top: "90%",
          position: "absolute",
          height: "35%",
          width: "25%",
          cursor: "default",
          zIndex: "0",
          paddingBottom: "2%",
        }}
      />
    </div>
  );
};

export default Chart;

const Card = (props) => {
  const levelColor = randomcolor();
  // console.log(props);
  
  //get the new emp details of desired emp (clicked) and show his org chart
  const newChart = (Emp) => {
    let EmpArr = [];
    EmpArr.push(JSON.parse(Emp));
    window.sessionStorage.removeItem("ReportsTo");
    let name = JSON.parse(Emp).name;
    window.sessionStorage.setItem(name, JSON.stringify(EmpArr));
    window.location.href = "/org-chart/" + name;
  };

  return (
    <>
      <ul>
        {JSON.parse(window.sessionStorage.getItem("ReportsTo")).map((item,index) => (
          <Fragment key={item.name}>
            <li key={index}>
              <div
                className="OrgCard"
               
              >
                <div className="image"  onClick={() => newChart(JSON.stringify(item))}>
                  {/* {console.log(item)} */}
                  <img
                    src={`${config.drupal_url}/${item.DP}`}
                    alt="Profile"
                    style={{ borderColor: levelColor }}
                  ></img>
                </div>
                <div className="OrgCard-body"  onClick={() => newChart(JSON.stringify(item))}>
                  <div className="name-profile-container">
                    <h4 title={item.name} className="OrgCard-body-h4">{item.name.length>22?item.name.split(" ")[0]:item.name}</h4>
                    <p className="empProfileNav">
                      {/* {console.log(item.name.split(" ")[0])} */}
                    <a href={"/employee-details/" + item.emp_id} className='playBut'>
                        <PlayArrowIcon className="playIcon"></PlayArrowIcon>
                      </a>
                    </p>
                  </div>
                  <p title={item.role} className="OrgCard-body-p">{item.role.length>28?(item.role.split(" ").length===2?item.role.split(" ")[0].substring(0,1)+item.role.split(" ")[1].substring(0,1):item.role.split(" ")[0].substring(0,1)+item.role.split(" ")[1].substring(0,1)+item.role.split(" ")[2].substring(0,1)):item.role}</p>
                </div>
              </div>
              <ul>
                {props.data.map((item,index) => (
                  <Fragment key={item.name}>
                    <li key={index}>
                      <div
                        className="OrgCard"
                      
                      >
                        <div className="image"   onClick={() => newChart(JSON.stringify(item))}>
                          {/* {console.log(item)} */}
                          <img
                            src={`${config.drupal_url}/${item.DP}`}
                            alt="Profile"
                            style={{ borderColor: levelColor }}
                          ></img>
                        </div>
                        <div className="OrgCard-body" id="selected-node"   onClick={() => newChart(JSON.stringify(item))}>
                          <div className="name-profile-container">
                            <h4 title={item.name} className="OrgCard-body-h4">{item.name.length>22?item.name.split(" ")[0]:item.name}</h4>
                            <p className="empProfileNav">
                              <a href={"/employee-details/" + item.emp_id} className='playBut'>
                                <PlayArrowIcon className="playIcon"></PlayArrowIcon>
                              </a>
                            </p>
                          </div>
                          <p title={item.role} className="OrgCard-body-p">{item.role.length>28?(item.role.split(" ").length===2?item.role.split(" ")[0].substring(0,1)+item.role.split(" ")[1].substring(0,1):item.role.split(" ")[0].substring(0,1)+item.role.split(" ")[1].substring(0,1)+item.role.split(" ")[2].substring(0,1)):item.role}</p>
                        </div>
                      </div>
                    {/* more than 1 childsin 3 rd level flat top border */}
                      {JSON.parse(window.sessionStorage.getItem("Reporting"))
                        .length > 0 ? (
                        JSON.parse(window.sessionStorage.getItem("Reporting"))
                          .length === 1 ? (
                          <ul>
                            {JSON.parse(
                              window.sessionStorage.getItem("Reporting")
                            ).map((item,index) => (
                              <Fragment key={item.name}>
                                <li key={index}>
                                  <div
                                    className="OrgCard"
                                  
                                  >
                                    <div className="image"   onClick={() =>
                                      newChart(JSON.stringify(item))
                                    }>
                                      {/* {console.log(item)} */}
                                      <img
                                        src={`${config.drupal_url}/${item.DP}`}
                                        alt="Profile"
                                        style={{ borderColor: levelColor }}
                                      ></img>
                                    </div>
                                    <div className="OrgCard-body"   onClick={() =>
                                      newChart(JSON.stringify(item))
                                    }>
                                      <div className="name-profile-container">
                                        <h4 title={item.name} className="OrgCard-body-h4">
                                        {item.name.length>22?item.name.split(" ")[0]:item.name}
                                        </h4>
                                        <p className="empProfileNav">
                                          <a href={"/employee-details/" + item.emp_id} className='playBut'>
                                            <PlayArrowIcon className="playIcon"></PlayArrowIcon>
                                          </a>
                                        </p>
                                      </div>
                                      <p title={item.role} className="OrgCard-body-p">
                                        {item.role.length>28?(item.role.split(" ").length===2?item.role.split(" ")[0].substring(0)+item.role.split(" ")[1].substring(0):item.role.split(" ")[0].substring(0)+item.role.split(" ")[1].substring(0)+item.role.split(" ")[2].substring(0)):item.role}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </Fragment>
                            ))}
                          </ul>
                        ) : (
                          <ul>
                         
                            <div className="selected-team">
                              {JSON.parse(
                                window.sessionStorage.getItem("Reporting")
                              ).map((item,index) => (
                                <Fragment key={item.name}>
                                 
                                  <div className="" id="team-card" key={index}>
                                    <div
                                      className="OrgCard"
                                      onClick={() =>
                                        newChart(JSON.stringify(item))
                                      }
                                    >
                                      <div className="image">
                                        {/* {console.log(item)} */}
                                        
                                        <img
                                          src={`${config.drupal_url}/${item.DP}`}
                                          alt="Profile"
                                          style={{ borderColor: levelColor }}
                                        ></img>
                                      </div>
                                      <div className="OrgCard-body">
                                        <div className="name-profile-container">
                                          <h4 title={item.name} className="OrgCard-body-h4">
                                          {item.name.length>22?item.name.split(" ")[0]:item.name}
                                          </h4>
                                          <p className="empProfileNav">
                                          <a href={"/employee-details/" + item.emp_id} className='playBut'>
                        <PlayArrowIcon className="playIcon"></PlayArrowIcon>
                      </a>
                                          </p>
                                        </div>
                                        <p title={item.role} className="OrgCard-body-p">
                                          {item.role.length>28?(item.role.split(" ").length===2?item.role.split(" ")[0].substring(0,1)+item.role.split(" ")[1].substring(0,1):item.role.split(" ")[0].substring(0,1)+item.role.split(" ")[1].substring(0,1)+item.role.split(" ")[2].substring(0,1)):item.role}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                           
                          </ul>
                        )
                      ) : (
                        <></>
                      )}
                    </li>
                  </Fragment>
                ))}
              </ul>
            </li>
          </Fragment>
        ))}
      </ul>
    </>
  );
};
