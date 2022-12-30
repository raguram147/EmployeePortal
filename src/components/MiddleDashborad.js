import React from "react";
import "../components/styles/style.css";
// import HorizontalTimeline from "react-horizontal-timeline";
import dateFormat from "dateformat";
import Typist from "react-typist";
// import { useState } from "react";

/*
        Component       : It is the inner component of the Employee detials page repersents the middle part.
        Author          : Created by Lister Raguram Sundaravadivel
        Child-Components: NIL
        Variables       : data[] (API JSON) ,VALUES ,Content
        Libarries       : react-horizontal-timeline

      
        Last Modified   :
        (Format "Name Date `MM-DD-YYY`")
      */
const MiddleDashborad = ({ data }) => {
  return (
    <>
    {data.map((x,index)=>
      <div className="MiddleDashBoard" key={index}>
        <div
          style={{
            width: "95%",
            height: "85%",
            margin: "0 ",
            position: "relative",
            top: "10%",
            color: "white",
          }}
        >
          
        </div>
        <div className="text-center">
          <div className="text-algin">
          <Typist>
            {"• My Journey as a Listerian started on "+ dateFormat(x.date_of_joining, "mmmm dS, yyyy")}
            <p></p>
            
            {/* {x.employment_status==="Active"?(<> */}
            <p></p>
          {(x.billable==="Yes"&x.employment_status==="Active")&& "• I became a billable asset with "+x.propotional_billability+ " propotional billability"}
            
            <p></p>
            <Typist.Delay ms={500} />
           {(x.engament_model!==""& x.reports_to!=="")&&"• I work on "+x.engagement_model.replace("&amp;","&")+" Engagement Model with guidance of " +x.reports_to}
           
            <p></p>
            {(x.current_working_project==="Proj Manager")?"• I'm currently working as a project Manager":(x.employment_status==="Active"&x.current_working_project!=="")?"• Now I am currently working in "+x.current_working_project+" Project under Project manager "+x.Manager:(x.employment_status==="Left"&x.current_working_project!=="")&&"• Now I'm an Alumni of Lister and had a privilege working for the "+x.current_working_project+" project under "+x.Manager}
           
            <p></p>
            {/* ...</>):(x.current_working_project==="")?"• Now I'm an Alumni of Lister":"• Now I'm an Alumni of Lister and had a privilege working for the "+x.current_working_project+" project under "+x.Manager} */}
          </Typist>
          </div>
        
        </div>
      </div>)}
    </>
  );
};

export default MiddleDashborad;
