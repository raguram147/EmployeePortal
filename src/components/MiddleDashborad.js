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
  // const [state, setState] = useState({ value: 0, previous: -1 });
  // Values should be only date
  // const VALUES = ["2021-03-28", "2021-05-14", "2021-06-20"];
  // Description array corresponding to values
  // const Content = [
  //   {
  //     title: "Joined as Listerian",
  //     Sub: "A new Phase of Journey Started here",
  //     Description:
  //       "Lister Found my skills and gave me a oppertunites to show my best.",
  //   },
  //   {
  //     title: "Billable",
  //     Description: "He/She is a Billable employee",
  //   },
  //   {
  //     title: "Project",
  //     Description:
  //       "We have working on the Employee portal that try to connect our Lister across the distance. Where we can know about ourself and our team members and their experience with Lister.",
  //   },
  // ];
  return (
    <>
    {data.map((x,index)=>
      <div className="MiddleDashBoard">
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
          {/* <HorizontalTimeline
            styles={{
              background: "#f8f8f8",
              foreground: "#e16428",
              outline: "#dfdfdf",
            }}
            index={state.value}
            indexClick={(index) => {
              setState((prevState) => ({
                value: index,
                previous: prevState.value,
              }));
            }}
            values={VALUES}
            // labelWidth={}
            // linePadding={1}
            isTouchEnabled="true"
          /> */}
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
            {/* {x.date_of_joining} */}
            <p></p>
            {/* ...</>):(x.current_working_project==="")?"• Now I'm an Alumni of Lister":"• Now I'm an Alumni of Lister and had a privilege working for the "+x.current_working_project+" project under "+x.Manager} */}
          </Typist>
          </div>
          {/* <h1>{Content[state.value].title}</h1>
          {data.map((x,index)=>(<h2>{dateFormat(x.date_of_joining, "mmmm dS, yyyy")}</h2>))}
          <h3>{Content[state.value].Sub}</h3>
          <p>{Content[state.value].Description}</p>*/}
        </div>
      </div>)}
    </>
  );
};

export default MiddleDashborad;
