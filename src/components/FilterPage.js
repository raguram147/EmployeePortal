import React, { Component } from 'react';
import '../components/styles/style.css';
import config from '../config';
// import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import NoResult from '../assets/noResult.gif'
import Chip from '@material-ui/core/Chip';
import empGroup from '../assets/group-orange.png'
import {  TextField } from "@material-ui/core";
import { event } from 'jquery';
import { EmployeeCard } from './EmployeeCard';
import { Scrollbars } from 'react-custom-scrollbars';

/*
  state variables and api data: 20-68 lines
  onchange functions
  filtering employees based on filter logic
  req Data initializations
  filters (Dynamic checkboxes,slider,input) html
  displaying tags,emp cards,next/back button
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
      hobbiesApi: [],
      skills: [],
      name: '',
      skillsFilterShow:10,   //number of skill filters to be shown
      projectsFilterShow:10,   //number of projects filters to be shown
      managersFilterShow:10,
      podsFilterShow:10,
      HobbiesFilterShow:10,
      skillsExpanded: false,
      projectsExpanded: false,
      managersExpanded: false,
      podsExpanded:false,
      hobbiesExpanded:false,
      checkedItemsSkills: new Map(),
      checkedItemsManager: new Map(),
      checkedItemsPod: new Map(),
      checkedItemsProjects: new Map(),
      checkedItemsHobbies: new Map(),
      ExperienceMinMax: [0, 25],
      filteredEmployee: [],
      currentPage :1,
      maxItemsPerPage:12,
      checkedItemsTag : [],
      skillsCheckBox: false
    }

    this.CheckBoxhandleChange = this.CheckBoxhandleChange.bind(this);
    this.showMoreSkills = this.showMoreSkills.bind(this);
    this.showMoreProjects = this.showMoreProjects.bind(this);
    this.showMoreManagers = this.showMoreManagers.bind(this);
    this.showMorePods = this.showMorePods.bind(this);
    this.showMoreHobbies = this.showMoreHobbies.bind(this);
  }
  //fetching data from api
  componentDidMount() {
    Promise.all([
      fetch(config.drupal_url + '/Employees').then(res => res.json()),
      fetch(config.drupal_url + '/TaxonomyOrder/skills').then(res => res.json()),
      fetch(config.drupal_url + '/TaxonomyOrder/manager').then(res => res.json()),
      fetch(config.drupal_url + '/TaxonomyOrder/pod').then(res => res.json()),
      fetch(config.drupal_url + '/TaxonomyOrder/projects').then(res => res.json()),
      fetch(config.drupal_url + '/TaxonomyOrder/hobbies').then(res => res.json()),
    ]).then(([urlOneData, urlTwoData, urlThreeData, urlFourData, urlFiveData, urlSixData]) => {
      this.setState({
        Employees: urlOneData,
        skillsApi: urlTwoData,
        MangersApi: urlThreeData,
        PodsApi: urlFourData,
        projectsApi: urlFiveData,
        hobbiesApi: urlSixData
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
    else if(nam === 'checkedItemsHobbies')
      this.setState(prevState => ({ checkedItemsHobbies: prevState.checkedItemsHobbies.set(item, isChecked) }));
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

   //show more filter filter option this.state.managersExpanded
   showMoreManagers(){
    this.state.managersFilterShow === 10 ? (
      this.setState({ managersFilterShow: this.state.MangersApi.length, managersExpanded: true })
    ) : (
      this.setState({ managersFilterShow: 10, managersExpanded: false })
    )
  }

  //show more filter filter option this.state.managersExpanded
  showMorePods() {
    this.state.podsFilterShow === 10 ? (
      this.setState({ podsFilterShow: this.state.PodsApi.length, podsExpanded: true })
    ) : (
      this.setState({ podsFilterShow: 10, podsExpanded: false })
    )
  }

  showMoreHobbies(){
    this.state.HobbiesFilterShow === 10 ? (
      this.setState({ HobbiesFilterShow: this.state.hobbiesApi.length, hobbiesExpanded: true })
    ) : (
      this.setState({ HobbiesFilterShow: 10, hobbiesExpanded: false })
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

  AllCheckedItems(){
    let skillsChecked = this.state.checkedItemsSkills;
    let ManagersChecked = this.state.checkedItemsManager;
    let podsChecked = this.state.checkedItemsPod;
    let projectsChecked = this.state.checkedItemsProjects;
    let HobbiesChecked = this.state.checkedItemsHobbies;
    let checkedItemsTagList=[];
    //storing all the checked items in array to display as tags
    if(skillsChecked.size >0 || ManagersChecked.size >0  ||  podsChecked.size >0  || projectsChecked.size>0 || HobbiesChecked.size>0){
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

      const iteratorH1 = HobbiesChecked.keys();
      const iteratorH2 = HobbiesChecked.values();
      for (let i = 0; i < HobbiesChecked.size; i++) {
        let ps = iteratorH1.next().value;
        if (iteratorH2.next().value) {
          let tagsCheckedObj = { value: ps, filterField: "hobby" };
          checkedItemsTagList.push(tagsCheckedObj);
        }
      }
      console.log(checkedItemsTagList.length);
      console.log(checkedItemsTagList);
  }
  return checkedItemsTagList;

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
    else if(nam === 'hobby'){
      this.setState(prevState => ({ checkedItemsHobbies: prevState.checkedItemsHobbies.set(item, isChecked) }));
      document.getElementById(item).checked = false;
    }
  };

  //checking the empdetails matches 
  //experience match employee's
  CheckExperience(employeeExperience,expMinReq, expMaxReq){
     //experience checking: whether the emp has meet the req experience of customer
    if ((((parseInt(employeeExperience)) >= expMinReq) && (parseInt(employeeExperience) <= expMaxReq))) {
      return true;
    }
    return false;
  }

    //name checking: whether the emp has matched the name
  checkNameId(empName,empId,NameIdReq){
    if (NameIdReq) {
      if (((empName.toLowerCase()).includes(NameIdReq.toLowerCase())) || empId.includes(NameIdReq)) {
       return true;
        //   console.log("nameMatch"+x.name+" "+nameReq);
      } else {
        return false;
      }
    } else {
      return true;     //if customer not typed anything
    }

  }

  //checking skills match
  checkSkillsMatch(skillsChecked,empPrimarySkills,empSecondarySkills){
    if (skillsChecked.size > 0) {  //atleast one skill is checked
      const iterator1 = skillsChecked.keys();
      const iterator2 = skillsChecked.values();
      for (let i = 0; i < skillsChecked.size; i++) {  //checking all the checked skills the emp has or not
        let selectedSkill = iterator2.next().value;
        let skillName = iterator1.next().value;
        if (selectedSkill) {
          if ( !(((empPrimarySkills.toLowerCase()).includes(skillName)) || ((empSecondarySkills.toLowerCase()).includes(skillName))) ) {
            return false;  //if one is not in the profile then return false
          }
        }
      }
      return true;
    } else {
      return true;
    }
  }

  //managers Match checking
  checkManagerMatch(ManagersChecked,EmpManager){
    let managerMatch = false;
    if (ManagersChecked.size > 0) {
      const iterator1 = ManagersChecked.keys();
      const iterator2 = ManagersChecked.values();
      let oneManagerAtleastChecked = false;
      for (let i = 0; i < ManagersChecked.size; i++) {
          let selectedManger = iterator2.next().value;
           let selectedMangerName = iterator1.next().value;
        if (selectedManger && !managerMatch) {  //check whether the checkbox is still selected and manager is matched in previous loop
          oneManagerAtleastChecked = true;
          if (((EmpManager.toLowerCase()).includes(selectedMangerName))) {
            managerMatch = true;
            console.log("true inside loop");
          } else {
            managerMatch = false;
          }

        } else if ((!oneManagerAtleastChecked) && (i === ManagersChecked.size - 1)) {  //if all the previous checked managers are unchecked
          managerMatch = true;
        }
      }
      if(managerMatch)
        return true;
      else
        return false;
    } else {
      return true;
    }
  }

  //check pods Match
  checkPodsMatch(podsChecked,empPod){
    let podsMatch = false;
     if (podsChecked.size > 0) {
      const iterator1 = podsChecked.keys();
      const iterator2 = podsChecked.values();
      let onePodAtleastChecked = false;
      for (let i = 0; i < podsChecked.size; i++) {
          let selectedPod = iterator2.next().value;
        let selectedPodName = iterator1.next().value;

        if (selectedPod && !podsMatch) { //check whether the checkbox is still selected and pod is matched in previous loop
          onePodAtleastChecked = true;
          if (((empPod.toLowerCase()).includes(selectedPodName))) {

            podsMatch = true;
            console.log("true inside loop");
          } else {
            podsMatch = false;
          }

        } else if ((!onePodAtleastChecked) && (i === podsChecked.size - 1)) { //if all the previous checked pods are unchecked
          podsMatch = true;
        }
      }
       if (podsMatch){
        return true;
       }  
       else{
        return false;
       }  
    } else {
      return true;
    }
  }

 //projects match
  checkProjectMatch(projectsChecked,empProject){
    let projectsMatch = false;
    if (projectsChecked.size > 0) {
      const iterator1 = projectsChecked.keys();
      const iterator2 = projectsChecked.values();
      let oneProjectAtleastChecked = false;
      for (let i = 0; i < projectsChecked.size; i++) {
          let selectedProject = iterator2.next().value;
          let selectedProjectName = iterator1.next().value;
        if (selectedProject && !projectsMatch) { //check whether the checkbox is still selected and project is matched in previous loop
          oneProjectAtleastChecked = true;
          if (((empProject.toLowerCase()).includes(selectedProjectName))) {
            projectsMatch = true;
            // console.log("true inside loop");
          } else {
            projectsMatch = false;
          }

        } else if ((!oneProjectAtleastChecked) && (i === projectsChecked.size - 1)) { //if all the previous checked projects are unchecked
          projectsMatch = true;   
        } 
      }
      if (projectsMatch){
        return true;
       }  
       else{
        return false;
       }
    } else {
      return true;
    }
  }

  //Hobbies match
  checkHobbiesMatch(hobbiesChecked,empHobbies){

    if (hobbiesChecked.size > 0) {  //atleast one hobby is checked
      const iterator1 = hobbiesChecked.keys();
      const iterator2 = hobbiesChecked.values();
      for (let i = 0; i < hobbiesChecked.size; i++) {  //checking all the checked hobby the emp has or not
        let selectedHobby = iterator2.next().value;
        let hobbyName = iterator1.next().value;
        if (selectedHobby) {
          if ( !(((empHobbies.toLowerCase()).includes(hobbyName))) ) {
            return false;  //if one is not in the profile then return false
          }
        }
      }
      return true;
    } else {
      return true;
    }
  }

  filteringTheEmp(){
    let Employees = this.state.Employees;
    let expMinReq = this.state.ExperienceMinMax[0];
    let expMaxReq = this.state.ExperienceMinMax[1];
    let nameReq = this.state.name;
    let skillsChecked = this.state.checkedItemsSkills;
    let ManagersChecked = this.state.checkedItemsManager;
    let podsChecked = this.state.checkedItemsPod;
    let projectsChecked = this.state.checkedItemsProjects;
    let HobbbiesChecked = this.state.checkedItemsHobbies;
    let filteredEmployee= [];
    Employees.map(x => (
      <>{((() => {
        if (this.CheckExperience(x.Experience, expMinReq, expMaxReq) 
          && this.checkNameId(x.name, x.Emp_id, nameReq)
          && this.checkPodsMatch(podsChecked, x.Pod)
          && this.checkProjectMatch(projectsChecked, x.current_working_project) 
          && this.checkSkillsMatch(skillsChecked, x.primary_skills, x.secndary_skills) 
          && this.checkManagerMatch(ManagersChecked, x.Manager) 
          && this.checkHobbiesMatch(HobbbiesChecked, x.hobbies) 
          ) {
          filteredEmployee.push(x);
        }
      })())}
      </>
    ))
    return filteredEmployee;
  }


  render() {
    //initialisig the state variables for manipulations 
    let skillsFilterShowCust =this.state.skillsFilterShow;
    let podsFilterShowCust =this.state.podsFilterShow;
    let managersFilterShowCust =this.state.managersFilterShow;
    let projectsFilterShowCust =this.state.projectsFilterShow;
    let HobbiesFilterShowCust = this.state.HobbiesFilterShow;
    let filteredEmployee = this.filteringTheEmp();
    let checkedItemsTagList = this.AllCheckedItems();  //getting all the checked items and storing to make tags
    // console.log(checkedItemsTagList);

    return (
      <>
      <div className="filter-container" id="filterPage">
        {/* different types of filters  */}
        <div className="reqForm">
        <Scrollbars  
        style={{ height: 1600 }}
          onScroll={this.handleScroll}
          autoHide     // Hide delay in ms
          autoHideTimeout={1000}   // Duration for hide animation in ms.
          autoHideDuration={200}
        >
          <form >
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
                          /> {item.name} ({item.count })
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
                  this.state.MangersApi.slice(0, managersFilterShowCust).map(item => (
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
                          /> {item.name } ({item.count })
                        </label>
                      </td>
                    </tr>
                  ))
                }
                  {(this.state.MangersApi.length > 10)? 
                  <p className="showMore"
                    onClick={this.showMoreManagers}>
                    {this.state.managersExpanded ? (
                      <span>show less</span>
                    ) : (
                      <span>show more</span>
                    )}
                  </p> 
                :console.log("less managers")}
              </table>
            </form>

            {/* Pods checkbox selection */}
            <p className="filterName">Pods :</p>
            <form >
              <table className="CheckboxesTable">
                {
                  this.state.PodsApi.slice(0, podsFilterShowCust).map(item => (
                    <tr>
                      <td>
                        <label>
                          <input
                            name = 'checkedItemsPod'
                            type="checkbox"
                            value={item.name.toLowerCase()}
                            onChange={this.CheckBoxhandleChange}
                            id={item.name.toLowerCase()}
                          /> {item.name} ({item.count })
                        </label>
                      </td>
                    </tr>
                  ))
                  }
                  {(this.state.PodsApi.length > 10) ?
                    <p className="showMore"
                      onClick={this.showMorePods}>
                      {this.state.podsExpanded ? (
                        <span>show less</span>
                      ) : (
                        <span>show more</span>
                      )}
                    </p>
                    : console.log("less pods")
                  }
              </table>
            </form>

            {/* projects checkbox selection */}
            <p className="filterName">projects :</p>
            <form >
              <table className="CheckboxesTable">
                {
                  this.state.projectsApi.slice(0, projectsFilterShowCust).map(item => (
                    <tr>
                      <td>
                        <label>
                          <input
                            name = 'checkedItemsProjects'
                            type="checkbox"
                            value={item.name.toLowerCase()}
                            onChange={this.CheckBoxhandleChange}
                            id={item.name.toLowerCase()}
                          /> {item.name} ({item.count })
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

             {/* Hobbbies checkbox selection */}
             <p className="filterName">Hobbies :</p>
            <form >
              <table className="CheckboxesTable">
                {
                  this.state.hobbiesApi.slice(0, HobbiesFilterShowCust).map(item => (
                    <tr>
                      <td>
                        <label>
                          <input
                            name = 'checkedItemsHobbies'
                            type="checkbox"
                            value={item.name.toLowerCase()}
                            onChange={this.CheckBoxhandleChange}
                            id={item.name.toLowerCase()}
                          /> {item.name} ({item.count })
                        </label>
                      </td>
                    </tr>
                  ))
                  }
                  {(this.state.hobbiesApi.length > 10) ?
                    <p className="showMore"
                      onClick={this.showMoreHobbies}>
                      {this.state.hobbiesExpanded ? (
                        <span>show less</span>
                      ) : (
                        <span>show more</span>
                      )}
                    </p>
                    : console.log("less hobbies")
                  }
              </table>
            </form>

          </form>
          </Scrollbars>
        </div>

        {/* //displaying */}
          <div className="Employees">
            {/* selected filters as tags */}
            {/* {console.log(this.state.checkedItemsTag)} */}
            <div className="tagsAndEmpCountContainer">
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
              <div className="filtered-emp-count">
                <img alt="no of emp" src={empGroup} style={{ height: "25%" }}></img>
                <p className="empCount">{filteredEmployee.length}</p>
              </div>
            </div>
         
              {filteredEmployee.length > 0 ? console.log(filteredEmployee.length) :
                <>
                  {(
                    (() => {
                      return ( //no result found
                        <div className='NoResult'>
                          <img alt="No result found" src={NoResult}></img>
                        </div>
                      )
                    })())
                  }
                </>
              }

              {/* Filtered Employees displaying */}
              {filteredEmployee.slice((this.state.currentPage * this.state.maxItemsPerPage) - this.state.maxItemsPerPage, this.state.currentPage * this.state.maxItemsPerPage).map(employee => (
                <>
                  {(
                    (() => {
                      return (
                        (
                          <EmployeeCard employee={employee}></EmployeeCard>
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
          {filteredEmployee.length > this.state.currentPage * this.state.maxItemsPerPage ?
            <button className="nextBackBttn" onClick={() => this.changePage('next')}>Next &raquo;</button>
            : null}
        </div>
      </>
    );
  }
}
