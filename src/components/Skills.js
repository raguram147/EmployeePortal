import React, { useState, useEffect } from "react";
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
           Method : CustomSkillLogo
           Return : First letter of each word/First letter of a word in Uppper case
           usage  : Used to load the short-term of skills when logo of skill is not uploaded
        */
const CustomSkillLogo = (skillName) => {
  let count = skillName.split(" ").length;
  if (count === 1) {
    return skillName.charAt(0) + skillName.charAt(-1);
  } else {
    return (
      skillName.split(" ")[0].charAt(0) + skillName.split(" ")[1].charAt(0)
    ).toUpperCase();
  }
};

const TargetIconMovement = () => {
  var targetIconTag1 = document.getElementById("target_iconS1");
  var targetIconTag2 = document.getElementById("target_iconS2");
  var targetIconTag3 = document.getElementById("target_iconS3");
  var targetIconTag4 = document.getElementById("target_iconS4");
  if (targetIconTag1) {
    if (targetIconTag1.getAttribute("src") === Target_icon) {
      targetIconTag1.setAttribute("src", invisble);
      targetIconTag2.setAttribute("src", Target_icon);
      //  targetIconTag2.style.transitionDelay = '8s';
      //  console.timeLog(targetIconTag1);
      return "done";
    } else if (targetIconTag2.getAttribute("src") === Target_icon) {
      targetIconTag2.setAttribute("src", invisble);
      targetIconTag3.setAttribute("src", Target_icon);
      return "done";
    } else if (targetIconTag3.getAttribute("src") === Target_icon) {
      targetIconTag3.setAttribute("src", invisble);
      targetIconTag4.setAttribute("src", Target_icon);
      return "done";
    } else if (targetIconTag4.getAttribute("src") === Target_icon) {
      targetIconTag4.setAttribute("src", invisble);
      targetIconTag1.setAttribute("src", Target_icon);
      return "done";
    }
  }
};

const Skills = ({ skill }) => {
  const [state, setState] = useState(false);
  // const [skillData, setskillData] = useState([]);
  // console.log(state)
  if (state) {
  }
  const dummy = skill;

  useEffect(() => {
    setInterval(() => {
      TargetIconMovement();
      const temp = dummy[0];
      dummy.shift();
      dummy.push(temp);
      setState((prevstate) => !prevstate);
    }, 5000);
  }, [dummy]);

  return (
    <>
      <div className="wheels" id="skills"></div>
      <a href="/EmployeeSearch" className="btn_s">
        Skills
      </a>
      {dummy[0] && (
        <>
          {" "}
          {/* card-1 desgin */}
          <div className="cards" id="skill1">
            <img src={invisble} alt="active card" id="target_iconS4"></img>
            {dummy[0].skill_image ? (
              <img
                src={`${config.drupal_url}/${dummy[0].skill_image}`}
                className="skillImage"
                id="Skill1Img"
                alt={dummy[0].name}
              ></img>
            ) : (
              <p className="ProjectCustomLogo">
                {CustomSkillLogo(dummy[0].name)}
              </p>
            )}
          </div>
          {/* card-2 desgin */}
          <div className="cards" id="skill2">
            <img
              src={Target_icon}
              id="target_iconS1"
              className="target_icon"
              alt="Target icon"
            ></img>
            {dummy[1].skill_image ? (
              <img
                src={`${config.drupal_url}/${dummy[6].skill_image}`}
                className="skillImage"
                id="Skill2Img"
                alt={dummy[1].name}
              ></img>
            ) : (
              <p className="ProjectCustomLogo">
                {CustomSkillLogo(dummy[1].name)}
              </p>
            )}
          </div>
          {/* card-3 desgin */}
          <div className="cards" id="skill3">
            <img
              src={invisble}
              alt="active card"
              id="target_iconS2"
              className="target_icon"
            ></img>
            {dummy[2].skill_image ? (
              <img
                src={`${config.drupal_url}/${dummy[2].skill_image}`}
                className="skillImage"
                id="Skill3Img"
                alt={dummy[2].name}
              ></img>
            ) : (
              <p className="ProjectCustomLogo">
                {CustomSkillLogo(dummy[2].name)}
              </p>
            )}
          </div>
          {/* card-4 desgin */}
          <div className="cards" id="skill4">
            <img
              src={invisble}
              alt="active card"
              id="target_iconS3"
              className="target_icon"
            ></img>
            {dummy[4].skill_image ? (
              <img
                src={`${config.drupal_url}/${dummy[4].skill_image}`}
                className="skillImage"
                id="Skill4Img"
                alt={dummy[4].name}
              ></img>
            ) : (
              <p className="ProjectCustomLogo">
                {CustomSkillLogo(dummy[4].name)}
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Skills;
