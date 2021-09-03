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
  const [items, setItems] = useState();
  const [, fetchData] = useFetch();
  useEffect(() => {
    fetchData(fetchURL, (data) => {
      setItems(data);
    });
  }, [fetchURL, fetchData]);
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
