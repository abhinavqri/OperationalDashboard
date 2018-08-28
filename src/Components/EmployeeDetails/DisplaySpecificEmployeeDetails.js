import React from 'react';
import {data} from '../Data/dataTwo';
import {EmployeesById} from '../Util/GetEmployeesByProject';
import '../../Styles/DisplaySpecificEmployeeDetails.css';
import '../../Styles/CommonStylings.css';
import PieChartSpecificEmployee from '../Charts/PieChartSpecificEmployee';
import StackedChartSpecificEmployee from '../Charts/StackedChartSpecificEmployee';
import  {GetStackedData} from '../Util/StackedDataUtil';
import {connect} from "react-redux";
import LoadData  from '../../Actions/EmployeeStatusDetailsAction';
import { GET_EMPLOYEE_STATUS_DETAILS_URL } from '../../Constants/Constants';


class DisplaySpecificEmployeeDetails extends React.Component{
  constructor(props){
    super(props)
    this.allEmployees = this.allEmployees.bind(this);
    this.getFinalData =  this.getFinalData.bind(this);
  }
  allEmployees(){
    this.props.allEmployees();
  }



     shouldComponentUpdate(){

      return true;

     }


    getFinalData(employeeListForStackedData){
        let empHours = 0;
        let finalData =[] ;
        let obj1 = {};
        employeeListForStackedData[this.props.employeeId].forEach(employee =>{
            let emp = Object.assign({},employee)
            if(!obj1[emp.department.trim()+emp.project.trim()]){
                obj1[emp.department.trim()+emp.project.trim()] = emp;

            }
            else{
                let emp1 = obj1[emp.department.trim()+emp.project.trim()];
                emp1.hours = emp1.hours+emp.hours;
                obj1[emp.department.trim()+emp.project.trim()] = emp1;
            }
        })
        console.log("the obj 1 is", obj1);
        for(let emp in obj1){
            finalData.push(obj1[emp]);
        }

     return finalData;
    }

  render(){


    let label = "a Specific Employee"
    let pieData = [];
    let stackedData = [],employeeStatusDetails,empStatusColor;
    let empStatusDetails = {};
      if(this.props.employeeStatus){
          for(let user of this.props.employeeStatus){
              if( Number(user.class) === Number(this.props.employeeId)){
                  empStatusDetails = user;
              }
          }
      }
    if(empStatusDetails.empStatus === "Active"){
        empStatusColor = "success"
    }
    else if(empStatusDetails.empStatus === "Inactive"){
        empStatusColor = "info"
    }
    else{
        empStatusColor = "danger"
    }


    let specificEmployeesList = EmployeesById(Number(this.props.employeeId),this.props.employeeData).filter(emp => emp.date_year === new Date().getFullYear());




      let employeeList =  { [this.props.employeeId] : specificEmployeesList };

      let employeeListForStackedData =  Object.assign({},employeeList);
       let finalData = this.getFinalData( employeeListForStackedData );
       let totalHours = 0, employeetitle;
       let employees = finalData.map(employee => {
          let data = {name : "", y: 0}
          data.name = employee.project;
          data.y = employee.hours;
          employeetitle = employee.title;


          pieData.push(data);
         // stackedData.push(stackData);
          totalHours = totalHours+employee.hours;
          return  <DisplayEmployee employee={employee}  />
      })
        stackedData = GetStackedData(false,employeeListForStackedData[this.props.employeeId]);
    return(
      <div>
         <div>
              <input className="btn btn-primary m-3 backButton" type="button" value="Back" disabled={ this.props.isBackButtonDisabled } onClick={this.allEmployees} />
        </div>

          <div className="specificEmployee alert alert-primary">
              <p>  ID : <span className="badge badge-pill badge-primary" > {  this.props.employeeId  } </span>  </p>
              <p>  Name : <span className="badge badge-pill badge-primary" > {  empStatusDetails.empName  } </span>  </p>
              <p> Title : <span className="badge badge-pill badge-info"> { employeetitle }  </span>   </p>
              <p> Status : <span className="badge badge-pill badge-{empStatusColor }"> { empStatusDetails.empStatus } </span> </p>
              <p> Hire Date : <span className="badge badge-pill badge-success"> { empStatusDetails.hireDate } </span> </p>
              <p> Re-hire Date : <span className="badge badge-pill badge-success"> { empStatusDetails.reHireDate } </span> </p>
              <p> Last Date : <span className="badge badge-pill badge-success"> { empStatusDetails.terminationDate } </span> </p>

          </div>

         {/*<div className="employeeStatusDetails flex-column">
              <div className=" m-2 employeeStatusDetailsImg"><img src={ bufferBase64 } alt=""/></div>
              <div className="employeeStatusDetailsTable">
                  <table>
                      <tr>
                          <td> Employee ID </td>
                          <td> {  } </td>
                      </tr>
                      <tr>
                          <td> Title </td>
                          <td></td>
                      </tr>
                      <tr>
                          <td> Status </td>
                          <td></td>
                      </tr>
                      <tr>
                          <td> Hire Date </td>
                          <td></td>
                      </tr>
                      <tr>
                          <td> Re-hire Date </td>
                          <td></td>
                      </tr>
                      <tr>
                          <td> Last Date </td>
                          <td></td>
                      </tr>
                      <tr>
                          <td></td>
                          <td></td>
                      </tr>
                      <tr>
                          <td></td>
                          <td></td>
                      </tr>
                  </table>
              </div>
          </div>*/}
        <div>
        <div className="tableList">
            <table class="table table-dark">
                <thead>
                <tr>

                    <th scope="col"> HomeDepartment </th>
                    <th scope="col"> Department </th>
                    <th scope="col"> Project </th>
                    <th scope="col"> Man Hours </th>

                </tr>
                </thead>
                <tbody>

                {employees}

                </tbody>

            </table>
            <p className="displayTotalHours">   Total Hours : { totalHours.toFixed(0) } hrs </p>
        </div>
            <div> <PieChartSpecificEmployee pieData = { pieData }  label = { label } /> </div>
            <div> <StackedChartSpecificEmployee stackedData = { stackedData }  /> </div>
        </div>

      </div>
    );
  }
}
class  DisplayEmployee extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){

    return (
        <tr>
            <td> { this.props.employee.homeDepartment } </td>
            <td> { this.props.employee.department } </td>
            <td> { this.props.employee.project }  </td>
            <td> { this.props.employee.hours.toFixed(0)  } </td>
        </tr>

    );
  }
}

const mapStateToProps = (state)=>{
    return { employeeData: state.data, employeeStatus: state.employeeStatus}
};
export default connect(mapStateToProps)(DisplaySpecificEmployeeDetails);
