import React from "react";
import FilterNav from "../components/FilterNav";
// import Home from "./components/Home";
import Footer from "../components/Footer";
// import ScrollToTop from "./components/ScrollToTop";
import FilterPage from "../components/FilterPage";
import config from "../config";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

const FilterScreen = () => {
  // const fetchURL = config.drupal_url + "/Home";
  // const [items, setItems] = useState();
  // const [, fetchData] = useFetch();

  // useEffect(() => {
  //   fetchData(fetchURL, (data) => {
  //     setItems(data);
  //   });
  // }, [fetchURL,fetchData]);
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
