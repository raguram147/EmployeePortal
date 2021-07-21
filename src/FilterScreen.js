import React,{useEffect,useState}  from "react";
import FilterNav from "./components/FilterNav";
// import Home from "./components/Home";
import Footer from "./components/Footer";
// import ScrollToTop from "./components/ScrollToTop";
import  FilterPage  from "./components/FilterPage";
import config from './config';
const FilterScreen = () => {
    const fetchURL = config.drupal_url+'/Home';
    const getItems = () => fetch(fetchURL).then(res => res.json());
    const [items, setItems] = useState();
  
    useEffect(() => {
       getItems().then(data => setItems(data));
    }, []);
  

  return (
    <>
      {/* <ScrollToTop /> */}
      { items && <FilterNav Logo={items}/>}
      { <FilterPage />}
      { items && <Footer Footerdata={items}/>}
    </>
  );
};

export default FilterScreen;
