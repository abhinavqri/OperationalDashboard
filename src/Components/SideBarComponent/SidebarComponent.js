import React, {Component} from 'react';
import Projects_SideBar from '../Projects_SideBar/Projects_SideBar';
import Department_SideBar from '../SearchEmployee_SideBar/Department_SideBar';
import EmployeeType_SideBar from '../EmployeeTypeComponent/EmployeeType_SideBar';
import '../../Styles/SideBarComponent.css';
class SideBarComponent extends Component{
    constructor(props){
        super(props)
        this.displaySpecificProjectDetails = this.displaySpecificProjectDetails.bind(this);
        this.displaySpecificDepartmentDetails = this.displaySpecificDepartmentDetails.bind(this);
        this.displayAllDepartments = this.displayAllDepartments.bind(this);
        this.displayAllProjects = this.displayAllProjects.bind(this);
        this.displaySpecificEmployeeTypeDetails = this.displaySpecificEmployeeTypeDetails.bind(this);
    }

    displaySpecificProjectDetails(projectName){
        this.props.displaySpecificProjectDetails(projectName);
    }
    displaySpecificDepartmentDetails(departmentName){
        this.props.displaySpecificDepartmentDetails(departmentName);
    }
    displayAllDepartments(){
        this.props.allDepartments();
    }
    displayAllProjects(){
        this.props.allProjects();
    }
    displaySpecificEmployeeTypeDetails(employeeType){
        this.props.displaySpecificEmployeeTypeDetails(employeeType);
    }
    shouldComponentUpdate(){
        return false;
    }
    render(){

        return (
            <aside className="nav-item navbar-nav navbar-sidenav navbar-dark  sideBarComponent d-none d-lg-block" data-toggle="tooltip" data-placement="right" title="" >
                <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" data-target="#qtProjects" >

                    <p className="nav-link-text animated slideInRight qriTotal"> QRI TOTAL  <span class = "caret"></span></p>
                </a>
                <ul className="sidenav-third-level collapse" id="qtProjects">
                    <li> <Projects_SideBar  specificProject = {this.displaySpecificProjectDetails} allProjects = {this.displayAllProjects} /> </li>
                    <li> <Department_SideBar specificDepartment = { this.displaySpecificDepartmentDetails } allDepartments = {this.displayAllDepartments}/> </li>
                    <li> <EmployeeType_SideBar specificEmployeeType = { this.displaySpecificEmployeeTypeDetails } /> </li>
                    
                </ul>
            </aside>
        );
    }
}

export default SideBarComponent;
