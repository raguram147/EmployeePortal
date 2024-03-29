import React, { useState, useEffect } from "react";
import "../components/styles/style.css";
import Target_icon from "../assets/target_icon.png";
import invisble from "../assets/invisible.png";
import config from "../config";
/*
        Component       : It is the inner component of the Project and skill section in the home page.
        Author          : Created by Lister Raguram Sundaravadivel
        Child-Components: NIL
        Variables       : skill[] (API JSON) 


      
        Last Modified   :
        (Format "Name Date `MM-DD-YYY`")
      */

        /*
           Method : CustomProjectLogo
           Return : First letter of each word/First letter of a word in Uppper case
           usage  : Used to load the short-term of skills when logo of project is not uploaded
        */
const CustomProjectLogo = (ProjectName) => {
  let count = ProjectName.split(" ").length;
  if (count === 1) {
    return ProjectName.charAt(0) + ProjectName.charAt(-1);
  } else {
    return (
      ProjectName.split(" ")[0].charAt(0) + ProjectName.split(" ")[1].charAt(0)
    ).toUpperCase();
  }
};

const Wheel = ({ card }) => {
  const [state, setState] = useState(false);
  if (state) {
  }
  const dummy = card;

  useEffect(() => {
    setInterval(() => {
      var targetIconTag1 = document.getElementById("target_iconP1");
      var targetIconTag2 = document.getElementById("target_iconP2");
      var targetIconTag3 = document.getElementById("target_iconP3");
      var targetIconTag4 = document.getElementById("target_iconP4");
      if (targetIconTag1) {
        if (targetIconTag1.getAttribute("src") === Target_icon) {
          targetIconTag1.setAttribute("src", invisble);
          targetIconTag2.setAttribute("src", Target_icon);
        } else if (targetIconTag2.getAttribute("src") === Target_icon) {
          targetIconTag2.setAttribute("src", invisble);
          targetIconTag3.setAttribute("src", Target_icon);
        } else if (targetIconTag3.getAttribute("src") === Target_icon) {
          targetIconTag3.setAttribute("src", invisble);
          targetIconTag4.setAttribute("src", Target_icon);
        } else if (targetIconTag4.getAttribute("src") === Target_icon) {
          targetIconTag4.setAttribute("src", invisble);
          targetIconTag1.setAttribute("src", Target_icon);
        }
      }

      const temp = dummy[0];
      dummy.shift();
      dummy.push(temp);
      setState((prevstate) => !prevstate);
    }, 5000);
  }, [dummy]);

  return (
    <>
      <div className="wheels" id="project"></div>
      <a href="/employee-search" className="btn">
        Projects
      </a>
      {dummy[0] && (
        <>
          {" "}
          {/* card-1 desgin */}
          <div className="cards" id="card1">
            <img
              src={invisble}
              alt="active card"
              className="target_iconP"
              id="target_iconP1"
            ></img>
            {dummy[0].project_logo ? (
              <img
                src={`${config.drupal_url}/${dummy[0].project_logo}`}
                className="ProjectImage"
                alt={dummy[0].name}
              ></img>
            ) : (
              <p className="ProjectCustomLogo">
                {CustomProjectLogo(dummy[0].name)}
              </p>
            )}
          </div>
          {/* card-2 desgin */}
          <div className="cards" id="card2">
            <img
              src={Target_icon}
              alt="active card"
              className="target_iconP"
              id="target_iconP2"
            ></img>
            {dummy[1].project_logo ? (
              <img
                src={`${config.drupal_url}/${dummy[1].project_logo}`}
                className="ProjectImage"
                alt={dummy[1].name}
              ></img>
            ) : (
              <p className="ProjectCustomLogo">
                {CustomProjectLogo(dummy[1].name)}
              </p>
            )}
          </div>
          {/* card-3 desgin */}
          <div className="cards" id="card3">
            <img
              src={invisble}
              alt="active card"
              className="target_iconP"
              id="target_iconP3"
            ></img>
            {dummy[2].project_logo ? (
              <img
                src={`${config.drupal_url}/${dummy[2].project_logo}`}
                className="ProjectImage"
                alt={dummy[2].name}
              ></img>
            ) : (
              <p className="ProjectCustomLogo">
                {CustomProjectLogo(dummy[2].name)}
              </p>
            )}
          </div>
          {/* card-4 desgin */}
          <div className="cards" id="card4">
            <img
              src={invisble}
              alt="active card"
              className="target_iconP"
              id="target_iconP4"
            ></img>
            {dummy[3].project_logo ? (
              <img
                src={`${config.drupal_url}/${dummy[3].project_logo}`}
                className="ProjectImage"
                alt={dummy[3].name}
              ></img>
            ) : (
              <p className="ProjectCustomLogo">
                {CustomProjectLogo(dummy[3].name)}
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Wheel;
