import React,{useEffect,useState}  from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import config from '../config';
import Project from "../components/Projects.js"
// import { Route, Router } from "react-router-dom";
// import FilterScreen from './FilterScreen'

const HomeScreen = () => {
  const fetchURL = config.drupal_url+'/Home';
  const [items, setItems] = useState();

  useEffect(() => {
    const getItems = () => fetch(fetchURL).then(res => res.json());
     getItems().then(data => setItems(data));
  }, [fetchURL,setItems]);

  return (
    <>
      <ScrollToTop />
      { items &&<Navbar navdata={items[0]}/>}
      { items &&<HeroBanner data={items}/>}
      { items && <Project project={items}></Project>}
      {  <Footer/>}
    </>
  );
};

export default HomeScreen;
