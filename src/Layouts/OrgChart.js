import React from "react";
import config from "../config";
import Chart from "../components/Chart";
import FilterNav from "../components/FilterNav";
import useFetch from "../Hooks/use-fetch";
import { useEffect, useState } from "react";
import { NotificationContainer } from "react-notifications";

const OrgChart = () => {
  const fetchURL = config.drupal_url + "/ReportsTo";
  const Nav = config.drupal_url + "/OrgChartNav";
  const fetchLogo=config.drupal_url+"/Home";
  const [items, setItems] = useState();
  const [, fetchData] = useFetch();
  const [logo,setLogo]=useState();
  useEffect(() => {
    if(!window.sessionStorage.getItem("Logo")){
      fetchData(fetchLogo,(data)=>{
        setLogo(data);
      });
    }
    fetchData(fetchURL, (data) => {
      setItems(data);
    });
  }, [fetchURL, fetchData,fetchLogo]);
  console.log(logo)
  if (logo) {
    window.sessionStorage.setItem("Logo", logo[0].website_logo);
  }
  let bgcolor=true;
  return (
    <>
      {items && <FilterNav navdata={Nav} color={bgcolor} />}
      {items && <Chart empData={items} />}
      <NotificationContainer
        style={{ top: "10% !important" }}
      ></NotificationContainer>
    </>
  );
};

export default OrgChart;
