import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import { HowItWorks } from "../components/HowItWorks";
import Footer from "../components/Footer";
import config from "../config";
import Project from "../components/Projects.js";
import ScrollToTop from "../components/ScrollToTop";
const HomeScreen = () => {
  const fetchURL = config.drupal_url + "/Home";
  const [items, setItems] = useState();

  useEffect(() => {
    const getItems = () => fetch(fetchURL).then((res) => res.json());
    getItems().then((data) => setItems(data));
  }, [fetchURL, setItems]);

  return (
    <>
      {items && <Navbar navdata={items[0]} />}
      {items && <HeroBanner data={items} />}
      {<HowItWorks></HowItWorks>}
      {items && <Project project={items}></Project>}
      <ScrollToTop></ScrollToTop>
      {<Footer />}
    </>
  );
};

export default HomeScreen;
