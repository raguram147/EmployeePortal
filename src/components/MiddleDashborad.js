import React from "react";
import '../components/styles/style.css';
import HorizontalTimeline from "react-horizontal-timeline";
import dateFormat from "dateformat";
import { useState } from "react";
// Values should be only date
const VALUES = ["2021-03-28", "2021-05-14", "2021-06-20"];
// Description array corresponding to values
const Content = [
  {
    title: "Joined as Intern",
    Description:
      "Lister Found my skills and gave me a oppertunites to show my best.",
  },
  {
    title: "ASE -full time Employee",
    Description:
      "I always did something I was a little not ready to do. I think that's how you grow. When there's that moment of Wow, I'm not really sure I can do this, and you push through those moments, that's when you have a breakthrough.",
  },
  {
    title: "Internal Project",
    Description:
      "We have working on the Employee portal that try to connect our Lister across the distance. Where we can know about ourself and our team members and their experience with Lister.",
  },
];
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
  const [state, setState] = useState({ value: 0, previous: -1 });

  return (
    <>
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
          <HorizontalTimeline
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
          />
        </div>
        <div className="text-center">
          <h1>{Content[state.value].title}</h1>
          <h2>{dateFormat(VALUES[state.value], "mmmm dS, yyyy")}</h2>
          <h3>Enter subtitle here</h3>
          <p>{Content[state.value].Description}</p>
        </div>
      </div>
    </>
  );
};

export default MiddleDashborad;