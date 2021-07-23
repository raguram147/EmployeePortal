import React,{useEffect,useState}  from "react";
import FilterNav from "../components/FilterNav";
// import Home from "./components/Home";
import Footer from "../components/Footer";
// import ScrollToTop from "./components/ScrollToTop";
import  FilterPage  from "../components/FilterPage";
import config from '../config';
const FilterScreen = () => {
    const fetchURL = config.drupal_url+'/Home';
    const [items, setItems] = useState();
  
    useEffect(() => {
      const getItems = () => fetch(fetchURL).then(res => res.json());
       getItems().then(data => setItems(data));
    }, [fetchURL,setItems]);
  

  return (
    <>
      {/* <ScrollToTop /> */}
      { items && <FilterNav Logo={items}/>}
      { <FilterPage />}
      { <Footer/>}
    </>
  );
};

export default FilterScreen;
