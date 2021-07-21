import React, { Component } from 'react';
import '../components/styles/FilterPage.css';
import config from '../config';
// import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import NoResult from '../assets/noResult.gif'
import Chip from '@material-ui/core/Chip';
// import Rating from "@material-ui/lab/Rating";
import {  TextField } from "@material-ui/core";
import { event } from 'jquery';
import emailIcon from "../assets/email-logo.png";
import { SocialIcon } from "react-social-icons";

/*
  state variables and api data: 20-68 lines
  onchange functions 70-164
  req Data initializations: 170-235
  filters (Dynamic checkboxes,slider,input) html: 240-400
  filtering employees based on filter logic: 401-550
  displaying tags,emp cards,next/back buttons: 550-670
*/

export default class EmployeeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Employees: [],//api data
      skillsApi: [],
      MangersApi: [],
      PodsApi: [],
      projectsApi: [],
      skills: [],
      name: '',
      skillsFilterShow:10,   //number of skill filters to be shown
      projectsFilterShow:10,   //number of projects filters to be shown
      checkedItemsSkills: new Map(),
      checkedItemsManager: new Map(),
      checkedItemsPod: new Map(),
      checkedItemsProjects: new Map(),
      ExperienceMinMax: [0, 25],
      skillsExpanded: false,
      projectsExpanded: false,
      filteredEmployee: [],
      currentPage :1,
      maxItemsPerPage:9,
      checkedItemsTag : [],
      skillsCheckBox: false
    }

    this.CheckBoxhandleChange = this.CheckBoxhandleChange.bind(this);
    this.showMoreSkills = this.showMoreSkills.bind(this);
    this.showMoreProjects = this.showMoreProjects.bind(this);
  }
  //fetching data from api
  componentDidMount() {
    Promise.all([
      fetch(config.drupal_url + '/Employees').then(res => res.json()),
      fetch(config.drupal_url + '/Taxonomy/skills').then(res => res.json()),
      fetch(config.drupal_url + '/Taxonomy/manager').then(res => res.json()),
      fetch(config.drupal_url + '/Taxonomy/pod').then(res => res.json()),
      fetch(config.drupal_url + '/Taxonomy/projects').then(res => res.json()),
    ]).then(([urlOneData, urlTwoData, urlThreeData, urlFourData, urlFiveData]) => {
      this.setState({
        Employees: urlOneData,
        skillsApi: urlTwoData,
        MangersApi: urlThreeData,
        PodsApi: urlFourData,
        projectsApi: urlFiveData
      });
    })
  }

  //Experience slider on change calls the fxn and changes the values
  valueText = (value) => {
    return `${value}`;
  };
  handleChange = (e, newValue) => {
    console.log(newValue);
    this.setState({ ExperienceMinMax: newValue });
  };

  //all types of input text field changes will call the fxn and changes the value
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }


  CheckBoxhandleChange(event) {   //skills,project,pod,manager checkeditems change 
    let nam = event.target.name;
    var isChecked = event.target.checked;
    var item = event.target.value;
    console.log(nam);
    console.log(isChecked);
    if(nam === 'checkedItemsSkills'){
      this.setState(prevState => ({ checkedItemsSkills: prevState.checkedItemsSkills.set(item, isChecked) }));
      // document.getElementById(item).checked = true;
    }
    else if(nam === 'checkedItemsManager')
      this.setState(prevState => ({ checkedItemsManager: prevState.checkedItemsManager.set(item, isChecked) }));
    else if(nam === 'checkedItemsPod')
      this.setState(prevState => ({ checkedItemsPod: prevState.checkedItemsPod.set(item, isChecked) }));
    else if(nam === 'checkedItemsProjects')
      this.setState(prevState => ({ checkedItemsProjects: prevState.checkedItemsProjects.set(item, isChecked) }));
  }

  //show more skill filter option 
  showMoreSkills(){
    this.state.skillsFilterShow === 10 ? (
      this.setState({ skillsFilterShow: this.state.skillsApi.length, skillsExpanded: true })
    ) : (
      this.setState({ skillsFilterShow: 10, skillsExpanded: false })
    )
  }

  //show more filter filter option 
  showMoreProjects(){
    this.state.projectsFilterShow === 10 ? (
      this.setState({ projectsFilterShow: this.state.projectsApi.length, projectsExpanded: true })
    ) : (
      this.setState({ projectsFilterShow: 10, projectsExpanded: false })
    )
  }

  //next or back to view other emp cards if exists
  changePage(direction) {
    console.log(direction);
    if (direction === 'back') {
     this.setState({
      currentPage: this.state.currentPage - 1
     });
    } else if (direction === 'next') {
     this.setState({
      currentPage: this.state.currentPage + 1
     });
    }
  }

  //if u click cancel on the selected tags the checkboxes should be unchecked auto
  handleDelete = (chipToDelete) => () => {
    console.log(chipToDelete);

    let nam = chipToDelete.filterField;
    var isChecked = false;
    var item = chipToDelete.value;;
    console.log(nam);
    console.log(isChecked);
    if(nam === 'skill'){
      this.setState(prevState => ({ checkedItemsSkills: prevState.checkedItemsSkills.set(item, isChecked) }));
      document.getElementById(item).checked = false;
      console.log(event.target);
    }
    else if(nam === 'manager'){
      this.setState(prevState => ({ checkedItemsManager: prevState.checkedItemsManager.set(item, isChecked) }));
      document.getElementById(item).checked = false;
    }
    else if(nam === 'pod'){
      this.setState(prevState => ({ checkedItemsPod: prevState.checkedItemsPod.set(item, isChecked) }));
      document.getElementById(item).checked = false;
    }
    else if(nam === 'project'){
      this.setState(prevState => ({ checkedItemsProjects: prevState.checkedItemsProjects.set(item, isChecked) }));
      document.getElementById(item).checked = false;
    }
  };


  render() {
    //initialisig the state variables for manipulations 
    let Employees = this.state.Employees;
    // let experienceMin, experienceMax;
    let expMinReq = this.state.ExperienceMinMax[0];
    let expMaxReq = this.state.ExperienceMinMax[1];
    let nameReq = this.state.name;
    let skillsChecked = this.state.checkedItemsSkills;
    let ManagersChecked = this.state.checkedItemsManager;
    let podsChecked = this.state.checkedItemsPod;
    let projectsChecked = this.state.checkedItemsProjects;
    let skillsFilterShowCust =this.state.skillsFilterShow;
    let checkedItemsTagList = this.state.checkedItemsTag;
    checkedItemsTagList=[];
    this.state.filteredEmployee = [];
    console.log((this.state.checkedItemsSkills));
    console.log((ManagersChecked));
    console.log((projectsChecked));
    console.log((podsChecked));
    console.log((this.state.skillsApi));
    console.log(checkedItemsTagList);

    //storing all the checked items in array to display as tags
    if(skillsChecked.size >0 || ManagersChecked.size >0  ||  podsChecked.size >0  || projectsChecked.size>0){
      const iteratorS1 = skillsChecked.keys();
      const iteratorS2 = skillsChecked.values();
     
      for (let i = 0; i < skillsChecked.size ; i++) {
        let ps = iteratorS1.next().value;
        if (iteratorS2.next().value) {
          const tagsCheckedObj = { value: ps, filterField: "skill" };
          checkedItemsTagList.push(tagsCheckedObj);
         
        }
      }

      const iteratorM1 = ManagersChecked.keys();
      const iteratorM2 = ManagersChecked.values();
      for (let i = 0; i < ManagersChecked.size; i++) {
        let ps = iteratorM1.next().value;
        if (iteratorM2.next().value) {
          let tagsCheckedObj = { value: ps, filterField: "manager" };
          checkedItemsTagList.push(tagsCheckedObj);
        }
      }

      const iteratorP1 = podsChecked.keys();
      const iteratorP2 = podsChecked.values();
      for (let i = 0; i < podsChecked.size; i++) {
        let ps = iteratorP1.next().value;
        if (iteratorP2.next().value) {
          let tagsCheckedObj = { value: ps, filterField: "pod" };
          checkedItemsTagList.push(tagsCheckedObj);
        }
      }

      const iteratorPr1 = projectsChecked.keys();
      const iteratorPr2 = projectsChecked.values();
      for (let i = 0; i < projectsChecked.size; i++) {
        let ps = iteratorPr1.next().value;
        if (iteratorPr2.next().value) {
          let tagsCheckedObj = { value: ps, filterField: "project" };
          checkedItemsTagList.push(tagsCheckedObj);
        }
      }
      console.log(checkedItemsTagList.length);
      console.log(checkedItemsTagList);
  }

    return (
      <>
      <div className="filter-container" id="filterPage">
        {/* different types of filters  */}
        <div className="reqForm">
          <form >
            {/* <p className="filterName">Enter name or Id:</p> */}
            {/* name or id input filed*/}
              <TextField
                id="outlined-basic"
                label="Enter name or Id"
                variant="outlined"
                style={{ marginTop: "15px", padding: "10.5px 8px", paddingLeft: 0 }}
                type="text"
                name="name"
                onChange={this.myChangeHandler}
                className="InpcheckedItemsSkillsuttextField"
              />

            {/* Experience slider*/}
            <div className="Experience-overview">
              <p className="filterName">Experience: </p>
              <p> {this.state.ExperienceMinMax[0]} - </p>
              <p>  {this.state.ExperienceMinMax[1]} years</p>
            </div>
            <div  className="experienceSlider" >
              {/* <Typography id="range-slider" gutterBottom>
                </Typography> style={{ width: 180 }} */}
              <Slider
                defaultValue={[0, 25]}
                value={this.ExperienceMinMax}
                onChange={this.handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={this.valueText}
                step={1}
                min={0}
                max={45}
                style={{color:"#ff8c4b"}}
              />
            </div>

            {/*  skills checkboxes*/}
            <p className="filterName">Skills :</p>
            <form >
              <table className="CheckboxesTable">
                {
                  this.state.skillsApi.slice(0, skillsFilterShowCust).map(item => (
                    <tr>
                      <td>
                        <label>
                          <input
                            type="checkbox"
                            name='checkedItemsSkills'
                            value={item.name.toLowerCase()}
                            onChange={this.CheckBoxhandleChange}
                            id={item.name.toLowerCase()}
                          /> {item.name}
                        </label>
                      </td>
                    </tr>
                  ))
                }
                <p className="showMore"
                 onClick={this.showMoreSkills}>
                  {this.state.skillsExpanded ? (
                    <span>show less</span>
                  ) : (
                    <span>show more</span>
                  )}
                </p>
              </table>
            </form>

            {/* Manager checkbox selection */}
            <p className="filterName">Managers :</p>
            <form >
              <table className="CheckboxesTable">
                {
                  this.state.MangersApi.map(item => (
                    <tr>
                      <td>
                        <label>
                          <input
                            name = 'checkedItemsManager'
                            type="checkbox"
                            value={item.name.toLowerCase()}
                            onChange={this.CheckBoxhandleChange}
                            id={item.name.toLowerCase()}
                            className="checkboxes"
                          /> {item.name}
                        </label>
                      </td>
                    </tr>
                  ))
                }
              </table>
            </form>

            {/* Pods checkbox selection */}
            <p className="filterName">Pods :</p>
            <form >
              <table className="CheckboxesTable">
                {
                  this.state.PodsApi.map(item => (
                    <tr>
                      <td>
                        <label>
                          <input
                            name = 'checkedItemsPod'
                            type="checkbox"
                            value={item.name.toLowerCase()}
                            onChange={this.CheckBoxhandleChange}
                            id={item.name.toLowerCase()}
                          /> {item.name}
                        </label>
                      </td>
                    </tr>
                  ))
                }
    
              </table>
            </form>

            {/* projects checkbox selection */}
            <p className="filterName">projects :</p>
            <form >
              <table className="CheckboxesTable">
                {
                  this.state.projectsApi.map(item => (
                    <tr>
                      <td>
                        <label>
                          <input
                            name = 'checkedItemsProjects'
                            type="checkbox"
                            value={item.name.toLowerCase()}
                            onChange={this.CheckBoxhandleChange}
                            id={item.name.toLowerCase()}
                          /> {item.name}
                        </label>
                      </td>
                    </tr>
                  ))
                }
                {(this.state.projectsApi.length > 10)? 
                  <p className="showMore"
                    onClick={this.showMoreProjects}>
                    {this.state.projectsExpanded ? (
                      <span>show less</span>
                    ) : (
                      <span>show more</span>
                    )}
                  </p> 
                :console.log("less products")}
 
              </table>
            </form>

          </form>
        </div>

    {/* checking the req conditions for emp */}
          {Employees.map(x => (
            <>
              {(
                (() => {
                  var experienceMatch = false;
                  var primarySkillsMatch = false;
                  var projectsMatch = false;
                  var nameMatch = false;
                  var podsMatch = false;
                  var managerMatch = false;
                  //experience checking: whether the emp has meet the req experience of customer
                  if ((((parseInt(x.Experience)) >= expMinReq) && (parseInt(x.Experience) <= expMaxReq))) {
                    experienceMatch = true;
                  }

                  //name checking: whether the emp has matched the name
                  if (nameReq) {
                    if (((x.name.toLowerCase()).includes(nameReq.toLowerCase())) || x.Emp_id.includes(nameReq)) {
                      nameMatch = true;
                      //   console.log("nameMatch"+x.name+" "+nameReq);
                    } else {
                      return <></>
                    }
                  } else {
                    nameMatch = true;     //if customer not typed anything
                  }

                  // skills checking: whether the emp has req  skills

                  if (skillsChecked.size > 0) {
                    const iterator1 = skillsChecked.keys();
                    const iterator2 = skillsChecked.values();
                    for (let i = 0; i < skillsChecked.size; i++) {
                      let selectedSkill = iterator2.next().value;
                      let ps = iterator1.next().value;
                      if (selectedSkill) {
                        if (((x.primary_skills.toLowerCase()).includes(ps)) || ((x.secndary_skills.toLowerCase()).includes(ps))) {

                          primarySkillsMatch = true;
                          // console.log("true");
                        } else {
                          // console.log("false");
                          return (<></>);
                        }

                      } else {
                        primarySkillsMatch = true;
                       
                      }
                    }
                  } else {
                    primarySkillsMatch = true;
                  }

                  //managers Match
                  if (ManagersChecked.size > 0) {
                    const iterator1 = ManagersChecked.keys();
                    const iterator2 = ManagersChecked.values();
                    let oneManagerAtleastChecked = false;
                    for (let i = 0; i < ManagersChecked.size; i++) {
                        let selectedManger = iterator2.next().value;
                         let ps = iterator1.next().value;
                      if (selectedManger && !managerMatch) {  //check whether the checkbox is still selected and manager is matched in previous loop
                        oneManagerAtleastChecked = true;
                        if (((x.Manager.toLowerCase()).includes(ps))) {
                          managerMatch = true;
                          console.log("true inside loop");
                        } else {
                          managerMatch = false;
                        }

                      } else if ((!oneManagerAtleastChecked) && (i === ManagersChecked.size - 1)) {
                        managerMatch = true;
                      }
                    }
                  } else {
                    managerMatch = true;
                  }
                  // console.log(managerMatch);


                  //pods Match
                  if (podsChecked.size > 0) {
                    const iterator1 = podsChecked.keys();
                    const iterator2 = podsChecked.values();
                    let onePodAtleastChecked = false;
                    for (let i = 0; i < podsChecked.size; i++) {
                        let selectedPod = iterator2.next().value;
                      let ps = iterator1.next().value;

                      if (selectedPod && !podsMatch) {
                        onePodAtleastChecked = true;
                        // let ps = iterator1.next().value;
                        console.log(ps);
                        console.log(x.Pod.toLowerCase());

                        if (((x.Pod.toLowerCase()).includes(ps))) {

                          podsMatch = true;
                          console.log("true inside loop");
                        } else {
                          podsMatch = false;
                        }

                      } else if ((!onePodAtleastChecked) && (i === podsChecked.size - 1)) {
                        podsMatch = true;
                      }
                    }
                  } else {
                    podsMatch = true;
                  }
                  // console.log(podsMatch);


                  //projects match
                  if (projectsChecked.size > 0) {
                    const iterator1 = projectsChecked.keys();
                    const iterator2 = projectsChecked.values();
                    let oneProjectAtleastChecked = false;
                    for (let i = 0; i < projectsChecked.size; i++) {
                        let selectedProject = iterator2.next().value;
                        let ps = iterator1.next().value;
                      if (selectedProject && !projectsMatch) {
                        oneProjectAtleastChecked = true;
                        console.log(ps);
                        console.log(x.current_working_project.toLowerCase());

                        if (((x.current_working_project.toLowerCase()).includes(ps))) {

                          projectsMatch = true;
                          console.log("true inside loop");
                        } else {
                          projectsMatch = false;
                        }

                      } else if ((!oneProjectAtleastChecked) && (i === projectsChecked.size - 1)) {
                        projectsMatch = true;   
                      } 
                    }
                  } else {
                    projectsMatch = true;
                  }
                  // console.log(projectsMatch);




                  if (experienceMatch && nameMatch && primarySkillsMatch && managerMatch && podsMatch && projectsMatch) {
                    this.state.filteredEmployee.push(x);
                  }
                })()
              )}
            </>
          ))
          }
    

        {/* //displaying */}
        <div className="Employees">
{/* selected filters as tags */}
          {console.log(this.state.checkedItemsTag)}
          <div className="selectedTags">   
          {checkedItemsTagList.map(x => ( 
            <>
              {(
                (() => {
                  return (
                    (
                      <>
                        <Chip
                          label={x.value}
                          // icon={icon}
                          onDelete={this.handleDelete(x)}
                          className="tags"
                        />
                      </>
                    )
                  )
                })()
              )}
            </>
          ))
          }
          </div>

          {this.state.filteredEmployee.length>0 ? console.log(this.state.filteredEmployee.length):
          <>
          {(
          (()=>{
            return(   //no result found
              <div className='NoResult'>
               <img alt= "No result found" src= {NoResult}></img>   
              </div>
              )})())
          }
          </>
          }

          {/* Filtered Employees displaying */}
          {this.state.filteredEmployee.slice((this.state.currentPage * this.state.maxItemsPerPage) - this.state.maxItemsPerPage, this.state.currentPage * this.state.maxItemsPerPage).map(employee => (
            <>
              {(
                (() => {
                    return (
                      (
                         
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
                              Manager: {employee.Manager}
                            </p>
                             <a href={"mailto:" + employee.email}><img style={{borderRadius:"50%", textAlign: "right",height: "22px", marginRight:"14px" }} alt= "email-icon" src={emailIcon}></img></a>
                           
                            </div>
                            <div className="exp-linkedin">
                            <p style={{ textAlign: "left", fontSize: "0.7rem" }}>
                              Experience: {employee.Experience} years
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
                    )
                })()
              )}
            </>
          ))
          
          } 
        </div>
      </div>
      {/* next page or back button for viewing the cards */}
      <div className="nextBack">
      {this.state.currentPage > 1 ?
       <button className="nextBackBttn" onClick={() => this.changePage('back')}>&laquo; Back</button>
      : null}
      {this.state.filteredEmployee.length  > this.state.currentPage * this.state.maxItemsPerPage ?
       <button className="nextBackBttn" onClick={() => this.changePage('next')}>Next &raquo;</button>
      : null}
     </div>
    </>
    );
  }
}
