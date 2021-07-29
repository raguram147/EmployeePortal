import React, { Component } from 'react'
import '../components/styles/style.css';
import config from '../config'

export default class EmployeeDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            id : this.props.match.params.Emp_id,
            Employee: []
        }
    }

    
      componentDidMount() {
        fetch(config.drupal_url+'/Employees/'+this.state.id)
          .then(x => x.json())
          .then(x => this.setState({ Employee: x }));
      }
    render() {
        let Employees = this.state.Employee;

        return (
          <div>
             
            <div className="Employee">
              {  Employees.map(x => (
             
                <div className="Employeedetails">
                     <h2>Employee Details</h2>
                  <img src={ `${config.drupal_url}/${x.Profile_photo}` }
                    height='200' alt="profilephoto"
                    className="EmpProfilephoto"/>
                  <div className="Employeedescription">

                  <table className="EmployeeDetailsTable">
                <tr>
                  <td className="title">Name: </td>
                  <td>{ x.name }</td>
                </tr>
                <tr>
                  <td className="title">Emp Id: </td>
                  <td>{ x.Emp_id }</td>
                </tr>
                <tr>
                  <td className="title">Email : </td>
                  <td>{ x.email }</td>
                </tr>
                <tr>
                  <td className="title">POD : </td>
                  <td>{ x.Pod }</td>
                </tr>
                <tr>
                  <td className="title">Designation: </td>
                  <td>{ x.role }</td>
                </tr>
                <tr>
                  <td className="title">Experience: </td>
                  <td>{ x.Experience } years</td>
                </tr>
                <tr>
                  <td className="title">Manager: </td>
                  <td>{ x.Manager }</td>
                </tr>
                <tr>
                  <td className="title">Current working project: </td>
                  <td>{ x.current_working_project }</td>
                </tr>

                <tr>
                  <td className="title">Project History: </td>
                  <td>{ x.Project_history }</td>
                </tr>
                <tr>
                  <td className="title">Previous company: </td>
                  <td>{ x.Previous_company }</td>
                </tr>
                <tr>
                  <td className="title">certifications: </td>
                  <td>{ x.certifications }</td>
                </tr>
                <tr>
                
                  <td className="title">Accomplishments: </td>
                  <td>
                  {x.accomplishments.map(y => (
                   y +'.  '
                  ))}
                  </td>
                </tr>
                <tr>
                  <td className="title">Primary skills: </td>
                  <td>{ x.primary_skills  } </td>
                </tr>
                <tr>
                  <td className="title">Secondary skills: </td>
                  <td>{ x.secndary_skills }</td>
                </tr>
                {/* <tr>
                  <td className="title">Primary skills2: </td>
                  <td>{ JSON.stringify(x.field_primary_skills) }</td>
                  <td>{ x.field_primary_skills }</td>
                </tr> */}
                <tr>
                  <td className="title">Tools familiar: </td>
                  <td>{ x.tools_familiar }</td>
                </tr>
                {/* <tr>
                  <td className="title">edit: </td>
                  <td>{ x.edit_node}</td>
                </tr>
                <tr>
                  <td className="title">node id: </td>
                  <td>{ x.id}</td>
                </tr> */}
                </table>
                <button className="Bttns"><a href={config.drupal_url+"node/"+x.nid+"/edit"}>edit</a></button>
                </div>
              </div>)) 
            }
            </div>
          </div>
        );
    }
}
