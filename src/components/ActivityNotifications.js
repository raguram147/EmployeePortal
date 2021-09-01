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
      // var todayDoB = month + '-' + date;
      var todayDate = month + "-" + date;
      // console.log(todayDoB + ' ' + DOB );
      // console.log(year + '-' + month + '-' + date);
      for (let i = 0; i < employees.length; i++) {
        let DOB = employees[i].DOB.slice(5, 10);
        if (DOB.includes(todayDate)) {
          count++;
          // let EmployeeBirthday = { Id: employees[i].nid, name: employees[i].name,EmployeeId: employees[i].Emp_id, pod: employees[i].Pod, event:"birthday"};

          // console.log( NotificationsAlert());
        }

        if (employees[i].revision_id !== employees[i].latest_revision_id) {
          count++;
          // let EmployeeProfileChanged = { Id: employees[i].nid, name: employees[i].name, event:"profile"};
          // event.push(EmployeeProfileChanged);
          // console.log(EmployeeProfileChanged);
        }

        if (employees[i].date_of_joining.includes(todayDate)) {
          count++;
        }
      }
    }
    // setEvents(event);
    window.sessionStorage.setItem("NotificationsCount", count);
    return count;
  };

  return (
    <div>
      {/* {events} */}
      {console.log(AllEvents())}
      {/* <ReactNotification></ReactNotification> */}
    </div>
  );
}

export default ActivityNotifications;
