import React, { useState  , useEffect} from "react";
import classes from "./styles/Projects.module.css";
import './styles/cards.css';
import Target_icon from '../assets/target_icon.png';
import invisble from '../assets/invisible.png';
import config from '../config';

// const fetchURL = "http://localhost/lister/Taxonomy/Skills";

const TargetIconMovement = () =>{

  var targetIconTag1 = document.getElementById('target_iconS1')  
  var targetIconTag2 = document.getElementById('target_iconS2')
  var targetIconTag3 = document.getElementById('target_iconS3')
  var targetIconTag4 = document.getElementById('target_iconS4');
  if(targetIconTag1){
  if(targetIconTag1.getAttribute('src')  === Target_icon){
     targetIconTag1.setAttribute('src',invisble);
     targetIconTag2.setAttribute('src',Target_icon);
    //  targetIconTag2.style.transitionDelay = '8s';
    //  console.timeLog(targetIconTag1);
    return 'done';
  }else if(targetIconTag2.getAttribute('src')  === Target_icon){
    targetIconTag2.setAttribute('src',invisble);
    targetIconTag3.setAttribute('src',Target_icon)
    return 'done';
 }else if(targetIconTag3.getAttribute('src')  === Target_icon){
  targetIconTag3.setAttribute('src',invisble);
  targetIconTag4.setAttribute('src',Target_icon)
  return 'done';
 }else if(targetIconTag4.getAttribute('src')  === Target_icon){
  targetIconTag4.setAttribute('src',invisble);
  targetIconTag1.setAttribute('src',Target_icon) 
  return 'done';
 } 
}


}

const Skills = ({skill}) => {
  const[state , setState] = useState(false);
  // const [skillData, setskillData] = useState([]);
  console.log(state)
  const dummy = skill;



    useEffect(()=>{
      
      setInterval((()=>{
        // TargetIconMovement();
        const temp = dummy[0];
        dummy.shift();
        dummy.push(temp);
        console.log(dummy[0]);
        setState((prevstate) => !prevstate)
        console.log(TargetIconMovement());
      }),5000);
    },[dummy])
    console.log(dummy[0])


  return (
    <>
    <div className={classes.wheels} id="skills"></div>
    <img src={invisble} alt="active card" id="target_iconS4" ></img>
    <a href="/FilterPage" className={classes.btn_s}>Skills</a>
    { dummy[0] &&<> <div className={classes.cards} id="skill1">
        {dummy[0].name &&<img src={ `${config.drupal_url}/${dummy[0].skill_image}` } className={classes.skillImage}  id="Skill1Img" alt={dummy[0].name} ></img>}
        
      </div>
      <div className={classes.cards} id="skill2" >
      <img src={Target_icon}  id="target_iconS1" className={classes.target_icon} alt='Target icon'></img>
        {dummy[1].name &&<img src={ `${config.drupal_url}/${dummy[1].skill_image}` } className={classes.skillImage} id="Skill2Img" alt={dummy[1].name}></img>}
      </div>
      
      <div className={classes.cards} id="skill3">
      <img src={invisble} alt="active card" id="target_iconS2" className={classes.target_icon}></img>
        {dummy[2].name &&<img src={ `${config.drupal_url}/${dummy[2].skill_image}` } className={classes.skillImage}  id="Skill3Img" alt={dummy[2].name}></img>}
      </div>
      <div className={classes.cards} id="skill4">
      <img src={invisble} alt="active card" id="target_iconS3" className={classes.target_icon}></img>
        {dummy[3].name &&<img src={ `${config.drupal_url}/${dummy[3].skill_image}` } className={classes.skillImage} id="Skill4Img" alt={dummy[3].name}></img>}
      </div></>}
     
      {/* <p id="c_title4">{dummy[3].name}</p> */}
    </>
  );
};

export default Skills;
