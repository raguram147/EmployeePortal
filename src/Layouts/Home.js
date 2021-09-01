import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import { HowItWorks } from "../components/HowItWorks";
import Footer from "../components/Footer";
import config from "../config";
import Project from "../components/Projects.js";
import ScrollToTop from "../components/ScrollToTop";
import CircularProgress from "@material-ui/core/CircularProgress";
import useFetch from "../Hooks/use-fetch";
const HomeScreen = () => {
  const fetchURL = config.drupal_url + "/Home";
  const [items, setItems] = useState();
  const [, fetchData] = useFetch();
  useEffect(() => {
    fetchData(fetchURL, (data) => {
      setItems(data);
    });
  }, [fetchURL, fetchData]);
  const Nav = config.drupal_url + "/HomeNav";
  if (items) {
    window.sessionStorage.setItem("Logo", items[0].website_logo);
  }
  return (
    <>
      {items ? (
        <>
          <ScrollToTop />
          {items && <Navbar navdata={Nav} />}
          {items && <HeroBanner data={items} />}
          <HowItWorks></HowItWorks>
          {items && <Project project={items}></Project>}
          {<Footer />}
        </>
      ) : (
        <div style={{ left: "50%", top: "50%", position: "absolute" }}>
          <CircularProgress style={{ color: "#ef6e25" }}></CircularProgress>
          <p style={{ color: "#d6d6c2" }}>Loading..</p>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
