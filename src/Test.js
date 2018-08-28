import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import Data from "../Data/dataOne";
import {DisplayEmployeeDetails} from "../DisplayEmployeeDetails/DisplayEmployeeDetails";
export default class DepartmentDetails extends React.Component{
    constructor(props){
        super(props)
        this.getEmployeesByDepartment = this.getEmployeesByDepartment.bind(this);
        this.getEmployeesByName = this.getEmployeesByName.bind(this);
        this.state = {
            employeesFilteredData : [],
            employeeName :""
        }
    }

    getEmployeesByProject(event){
        var selectedDepartment = event.target.name;
        var employeesFilteredData = Data.employeeData.filter( (emp) => emp.projCode ==  selectedDepartment  )

        //find out fte or cont

        employeesFilteredData.forEach((emp)=> emp.class )




        this.setState( prevState => {
            return { ...prevState, employeesFilteredData }
        })
    }
    render() {
        var employeeData = [];
        if( this.state.employeesFilteredData.length > 0 ){

            employeeData = this.state.employeesFilteredData;
        }
        else {
            employeeData = Data.employeeData;
        }

        return (
            <div>
                <div className="dropdown mr-2 ml-2 selectDropDown ">
                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select Employees
                    </button>
                    <ul class="sidenav-second-level collapse" id="collapseExamplePages">
                        <li><input type="button" className=" searchEmpButton" name= "532" value="ALPHA"  onClick={this.displayEmployeeInfo} /> </li>
                        <li><input type="button" className="searchEmpButton" name= "308" value="PEMEX US WORK"  onClick={this.displayEmployeeInfo} />  </li>
                        <li><input type="button" className="searchEmpButton" name= "309" value="PEMEX MEXICO WORK"  onClick={this.displayEmployeeInfo} />  </li>
                        <li><input type="button" className="searchEmpButton" name= "32" value="LAZARD"  onClick={this.displayEmployeeInfo} />  </li>
                        <li><input type="button" className="searchEmpButton" name= "607" value="HALFAYA"  onClick={this.displayEmployeeInfo} />  </li>
                        <li><input type="button" className="searchEmpButton" name= "370" value="PLUS PETROL NORTH"  onClick={this.displayEmployeeInfo} />  </li>
                        <li><input type="button" className="searchEmpButton" name= "355" value="ECO PETROL"  onClick={this.displayEmployeeInfo} />  </li>
                    </ul>
                </div>
                <div className="shake-little searchEmployeesDiv">
                    <input type="text" className="searchEmployee" name ="employeeName" value = {this.state.employeeName} placeholder="Enter employee's name" onChange={this.getEmployeesByName}/>
                </div>

                <div>
                    { employeeData.map((emp)=> <DisplayProjectDetails key={emp.Employee_Name} employee = {emp}/>) }
                </div>
            </div>

        );
    }
}