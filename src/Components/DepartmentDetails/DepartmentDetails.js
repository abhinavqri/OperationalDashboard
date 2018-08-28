/*
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import Data from "../Data/Data";
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
    getEmployeesByName(event){
        let employeeName = event.target.value;
        let employeesFilteredData = [];
        let employeeData = this.state.employeesFilteredData.length>0 ? this.state.employeesFilteredData : Data.employeeData;
        if(employeeName){
            employeeName = employeeName.toLocaleLowerCase();
            employeeData.forEach((employee) => {
                if(employee.Employee_Name.toLocaleLowerCase().match(employeeName)!= undefined?employee.Employee_Name.toLocaleLowerCase().match(employeeName).index>=0:false){
                    employeesFilteredData.push(employee);
                }
            });
        }
        this.setState(prevState=>{
            return {...prevState,employeeName,employeesFilteredData}
        })
    }
    getEmployeesByDepartment(event){
        var selectedDepartment = event.target.value;
        var employeesFilteredData = Data.employeeData.filter( (emp) => emp.Department ==  selectedDepartment  )
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
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div><input type="button" name= "deptName" value="999"  onClick={this.getEmployeesByDepartment} /> </div>
                        <div><input type="button" name= "deptName" value="263"  onClick={this.getEmployeesByDepartment} />  </div>
                        <div><input type="button" name= "deptName" value="307"  onClick={this.getEmployeesByDepartment} />  </div>
                    </div>
                </div>
                <div className="shake-little searchEmployeesDiv">
                    <input type="text" className="searchEmployee" name ="employeeName" value = {this.state.employeeName} placeholder="Enter employee's name" onChange={this.getEmployeesByName}/>
                </div>

                <div>
                    { employeeData.map((emp)=> <DisplayEmployeeDetails key={emp.Employee_Name} employee = {emp}/>) }
                </div>
            </div>

        );
    }
}*/
