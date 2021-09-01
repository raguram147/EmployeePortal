import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home  from './Layouts/Home';
import "./App.css";
import EmployeeSearch from './Layouts/EmployeeSearch'
import EmployeeDetails from "./components/EmployeeDetails"
import OrgChart from './Layouts/OrgChart';

const App = () => {
  return (
    <Router>
      <Route component ={Home} path ='/' exact/>
      {/* <Route component ={Navbar} path ='/Acheivements' exact/> */}
      <Route component ={EmployeeSearch} path ='/EmployeeSearch' exact/>
      {/* <Route component ={Chart} path ='/OrgChart' exact/> */}
      <Route path="/OrgChart/:Emp" component={OrgChart}></Route>
      <Route path="/EmployeeDetails/:Emp_id" component={EmployeeDetails}></Route>
  
    </Router>
  );
}

export default App
