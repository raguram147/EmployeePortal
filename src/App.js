import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import HomeScreen  from './Layouts/Home';
import "./App.css";
import FilterScreen from './Layouts/EmployeeSearch'
import EmployeeDetails from "./components/EmployeeDetails"

const App = () => {
  return (
    <Router>
      <Route component ={HomeScreen} path ='/' exact/>
      {/* <Route component ={Navbar} path ='/Acheivements' exact/> */}
      <Route component ={FilterScreen} path ='/FilterPage' exact/>
      <Route path="/EmployeeDetails/:Emp_id" component={EmployeeDetails}></Route>
  
    </Router>
  );
}

export default App
