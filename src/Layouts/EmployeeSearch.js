import React from "react";
import FilterNav from "../components/FilterNav";
// import Home from "./components/Home";
import Footer from "../components/Footer";
// import ScrollToTop from "./components/ScrollToTop";
import FilterPage from "../components/FilterPage";
import config from "../config";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import useFetch from "../Hooks/use-fetch";
import { useEffect, useState } from "react";
const FilterScreen = () => {
  const fetchLogo = config.drupal_url + "/Home";
  // const [items, setItems] = useState();
  const [, fetchData] = useFetch();
  const [logo,setLogo]=useState();
  useEffect(() => {
    if(!window.sessionStorage.getItem("Logo")){
      fetchData(fetchLogo,(data)=>{
        setLogo(data);
      });
    }
    
  }, [ fetchData,fetchLogo]);
  // console.log(logo)
  if (logo) {
    window.sessionStorage.setItem("Logo", logo[0].website_logo);
  }
  
  const Nav = config.drupal_url + "/FilterPageHeadFooter";
  return (
    <>
      {/* <ScrollToTop /> */}
      {<FilterNav navdata={Nav} />}

      {<FilterPage />}
      <NotificationContainer
        style={{ top: "10% !important" }}
      ></NotificationContainer>
      {<Footer />}
    </>
  );
};

export default FilterScreen;
