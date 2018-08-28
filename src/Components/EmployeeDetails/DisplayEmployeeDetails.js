import React from 'react';
import '../../Styles/DisplayEmployeeDetails.css';
import {Animated} from "react-animated-css";
import {data} from '../Data/dataOne';
import {EmployeesByProject, EmployeesByDepartment } from '../Util/GetEmployeesByProject';
export default class DisplayEmployeeDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedWeek : "Week 1",
          isSpecificEmployeeRequested:false
        };
        this.handleData = this.handleData.bind(this);
        this.displaySpecificEmployeeDetails = this.displaySpecificEmployeeDetails.bind(this);
    }
    handleData(event){

        var selectedWeek = event.target.name;
        this.setState(prevState =>{
            return {...prevState, selectedWeek:selectedWeek}
        })
    }
    displaySpecificEmployeeDetails(employeeId){
      this.props.displaySpecificEmployeeDetails(employeeId)
    }
      render() {
          var employees = null;
          if(this.props.isProjectDetailsRequested){
              employees = EmployeesByProject(this.props.projectName,data.employeeData).map(employee => <DisplayEmployee employee={employee} selectedWeek={this.state.selectedWeek} displaySpecificEmployeeDetails = {this.displaySpecificEmployeeDetails } />)
          }
          else{
              employees = EmployeesByDepartment(this.props.departmentName,data.employeeData).map(employee => <DisplayEmployee employee={employee} selectedWeek={this.state.selectedWeek} displaySpecificEmployeeDetails = {this.displaySpecificEmployeeDetails } />)
          }
          return (
              <div>
                  <div className="buttonsList">
                      <input type="button" className="btn btn-primary  weekButtonsList" name="Week 1" value="Week1" onClick={this.handleData}/>
                      <input  type="button" className="btn btn-primary weekButtonsList" name="Week 2" value="Week2"  onClick={this.handleData} />
                      <input  type="button" className="btn btn-primary weekButtonsList" name="Week 3" value="Week3" onClick={this.handleData}/>
                      <input  type="button" className="btn btn-primary weekButtonsList" name="Week 4" value="Week4"  onClick={this.handleData}/>
                      <input  type="button" className="btn btn-primary weekButtonsList" name="Week 5" value="Week5" onClick={this.handleData} />
                      <input  type="button" className="btn btn-primary weekButtonsList"  name="Week 6" value="Week6" onClick={this.handleData} />
                  </div>
                  <div className="tableList">
                      <table className="table table-dark">
                          <thead className="table table-primary">
                          <tr>
                              <th scope="col">Class</th>
                              <th scope="col">Name</th>
                              <th scope="col">Home Department </th>
                              <th scope="col">  Project   </th>
                              <th scope="col">{ this.state.selectedWeek } (hrs)</th>
                              <th scope="col">Percentage</th>
                          </tr>
                          </thead>
                          <tbody>
                          {employees}
                          </tbody>
                      </table>
                  </div>
              </div>
          );
    }
}
class  DisplayEmployee extends React.Component {
  constructor(props) {
    super(props);
  }
  displaySpecificEmployeeDetails(employeeId){
    this.props.displaySpecificEmployeeDetails(employeeId)
  }
  render(){
    return (
        <tr>
            <button className="btn btn-primary"  scope="row" onClick = {()=> this.displaySpecificEmployeeDetails(this.props.employee.class)} >{this.props.employee.class}</button>
            <td> {this.props.employee.employeeName} </td>
            <td> {this.props.employee.homeDepartment} </td>
            <td> { this.props.employee.project } </td>
            <td> {this.props.employee[this.props.selectedWeek]} </td>
            <td> { (this.props.employee[this.props.selectedWeek] / 160).toFixed(2) } </td>
        </tr>

    );
  }
}
