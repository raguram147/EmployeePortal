import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Aos from "aos";
/*
        Component       : It is the scrolling component/button appers after 300-y-axis,that helps to scroll up.
        Author          : Created by Lister Raguram Sundaravadivel
        Child-Components: NIL
        Material-UI     : Button
        Libraries       : AOS(Animated on Scroll)

      
        Last Modified   :
        (Format "Name Date `MM-DD-YYY`")
      */
const useStyles = makeStyles((theme) => ({
  scrollUp: {
    position: "fixed",
    zIndex: 99,
    right: "5%",
    bottom: "10%",
    opacity: 0.8,
    background: "#ef6e25",
    borderRadius: 50,
    "&:hover": {
      background: "#ef6e25",
      boxShadow: "1px 5px 12px -6px #ef6e25",
      transform: "translateY(-2px)",
    },
  },
}));
const ScrollTo = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
// This function will scroll the window to the top
const ScrollToTop = () => {
  const classes = useStyles();
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 2000 });
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  return (
    showButton && (
      <div data-aos="fade-up" className={classes.scrollUp}>
        <Button onClick={ScrollTo} className={classes.scrollUp}>
          <ExpandLessIcon></ExpandLessIcon>
        </Button>
      </div>
    )
  );
};

export default ScrollToTop;
