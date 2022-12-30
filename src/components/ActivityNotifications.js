import React from "react";
import { EmployeeApi } from "../utility";
import "react-notifications-component/dist/theme.css";

function ActivityNotifications() {
  const AllEvents = () => {
    let employees = EmployeeApi();
    let count = 0;
    if (employees) {
      var date = new Date().getDate();
      if (date < 10) {
        date = "0" + date;
      }
      var month = new Date().getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }

      var todayDate = month + "-" + date;
      for (let i = 0; i < employees.length; i++) {
        let DOB = employees[i].DOB.slice(5, 10);
        if (DOB.includes(todayDate)) {
          count++;
        }

        if (employees[i].revision_id !== employees[i].latest_revision_id) {
          count++;
        }

        if (employees[i].date_of_joining.includes(todayDate)) {
          count++;
        }
      }
    }
    // setEvents(event);
    window.sessionStorage.setItem("NotificationsCount", count);
    // return count;
  };

  return <div>{AllEvents()}</div>;
}

export default ActivityNotifications;
