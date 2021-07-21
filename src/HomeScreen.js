import React,{useEffect,useState}  from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import config from './config';
// import { Route, Router } from "react-router-dom";
// import FilterScreen from './FilterScreen'

const HomeScreen = () => {
  const fetchURL = config.drupal_url+'/Home';
  const getItems = () => fetch(fetchURL).then(res => res.json());
  const [items, setItems] = useState();

  useEffect(() => {
     getItems().then(data => setItems(data));
  }, []);

  return (
    <>
      <ScrollToTop />
      { items &&<Navbar navdata={items}/>}
      {/* <Router>
       
      <Route component ={FilterScreen} path ='/FilterPage' exact/>
     
      </Router> */}
      { items &&<Home data={items}/>}
      { items && <Footer Footerdata={items}/>}
    </>
  );
};

export default HomeScreen;
