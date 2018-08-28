import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../../Styles/ProjectDepartmentDetails.css';
import DisplayEmployeeDepartmentDetails from '../EmployeeDetails/DisplayEmployeeDepartmentDetails';
import DisplaySpecificEmployeeDetails from '../EmployeeDetails/DisplaySpecificEmployeeDetails'
export default class ProjectDepartmentDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          employeeId : null,
          isSpecificEmployeeRequested:false
        };
        this.displaySpecificEmployeeDetails  =this.displaySpecificEmployeeDetails.bind(this);
        this.allEmployees  =this.allEmployees.bind(this);
    }
    displaySpecificEmployeeDetails(employeeId){

       this.setState(prevState =>{
         return {...prevState,employeeId:employeeId,isSpecificEmployeeRequested:true}
       })
    }
    allEmployees(){
      this.setState(prevState =>{
        return {...prevState,isSpecificEmployeeRequested:false}
      })
    }
    render() {


        return (
            <div>
                  {this.state.isSpecificEmployeeRequested ? <DisplaySpecificEmployeeDetails employeeId = {this.state.employeeId} allEmployees = {this.allEmployees} />
                     : <DisplayEmployeeDepartmentDetails departmentName={this.props.departmentName} projectName={this.props.projectName}  isProjectDetailsRequested = {this.props.isProjectDetailsRequested} displaySpecificEmployeeDetails = {this.displaySpecificEmployeeDetails } /> }
            </div>
        );
    }
}
