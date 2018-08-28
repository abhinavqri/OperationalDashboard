import React, { Component } from 'react';
import '../../App.css';

import  SideBarComponent  from '../SideBarComponent/SidebarComponent';
import  MainContent  from '../MainContent/MainContent';
import DisplaySpecificEmployeeDetails from '../EmployeeDetails/DisplaySpecificEmployeeDetails'
import {AppInitialState} from  '../Util/SetUpInitialState';
import {AppInitialStateWithDefaultValues} from  '../Util/SetUpInitialState';
class MainPageComponent extends Component {
    constructor(props){
        super(props)
        this.state = AppInitialState;
        this.displaySpecificProjectDetails = this.displaySpecificProjectDetails.bind(this);
        this.getUpdatedStateForProjects = this.getUpdatedStateForProjects.bind(this);
        this.displaySpecificDepartmentDetails = this.displaySpecificDepartmentDetails.bind(this);
        this.getUpdatedStateForDepartment = this.getUpdatedStateForDepartment.bind(this);
        this.displayAllDepartments = this.displayAllDepartments.bind(this);
        this.specificProjectsOrDepartmentsCheck = this.specificProjectsOrDepartmentsCheck.bind(this);
        this.displaySpecificEmployeeTypeDetails = this.displaySpecificEmployeeTypeDetails.bind(this);
    }
    componentWillReceiveProps(prevProps, nextProps){
      if(prevProps.selectedEmployee){
      let requiredInfo = AppInitialStateWithDefaultValues.requiredInformation;
      setProjectsWithDefault(requiredInfo);
      setDepartmentsWithDefault(requiredInfo);
      setEmployeeTypeWithDefault(requiredInfo);
      requiredInfo.isSearchEmployeeRequested = true;
      this.setState((prevState)=> { return { ...prevState, requiredInformation:requiredInfo}  })
    }
    }
    getUpdatedStateForProjects(projectName){
        let specificProject = projectName
        let requiredInfo = AppInitialStateWithDefaultValues.requiredInformation;
        requiredInfo.isQTotalRequested = false;
        setDepartmentsWithDefault(requiredInfo);
        setEmployeeTypeWithDefault(requiredInfo);
        requiredInfo.projectDetails.isRequested = true;
        requiredInfo.projectDetails.projects.isAlphaDetailsRequested = false;
        requiredInfo.projectDetails.projects.isPemexusWorkDetailsRequested = false;
        requiredInfo.projectDetails.projects.isPemexMexicoWorkDetailsRequested = false;
        requiredInfo.projectDetails.projects.isLadardDetailsRequested = false;
        requiredInfo.projectDetails.projects.isHalfayaDetailsRequested = false;
        requiredInfo.projectDetails.projects.isPlusPetrolNorthDetailsRequested = false;
        requiredInfo.projectDetails.projects.isEcoNorthDetailsRequested = false;
        requiredInfo.projectDetails.projects.isKocnkcpDetailsRequested = false;
        if(specificProject === "alpha"){
            requiredInfo.projectDetails.projects.isAlphaDetailsRequested = true;
        }else if (specificProject === "pemexuswork") {
            requiredInfo.projectDetails.projects.isPemexusWorkDetailsRequested = true;
        }else if (specificProject === "pemexmexicowork") {
            requiredInfo.projectDetails.projects.isPemexMexicoWorkDetailsRequested = true;
        }else if (specificProject === "lazard") {
            requiredInfo.projectDetails.projects.isLadardDetailsRequested = true;
        }else if (specificProject === "halfaya") {
            requiredInfo.projectDetails.projects.isHalfayaDetailsRequested = true;
        }else if (specificProject === "pluspetrol-north") {
            requiredInfo.projectDetails.projects.isPlusPetrolNorthDetailsRequested = true;
        }else if (specificProject === "ecopetrol") {
            requiredInfo.projectDetails.projects.isEcoNorthDetailsRequested = true;
        }else if (specificProject === "koc-nk-cp") {
            requiredInfo.projectDetails.projects.isKocnkcpDetailsRequested = true;
        }else{
            requiredInfo.projectDetails.projects.all = true;
        }
        return requiredInfo
    }

    getUpdatedStateForDepartment(departmentName){
        let specificDepartment = departmentName ;
        let requiredInfo = AppInitialStateWithDefaultValues.requiredInformation;
        requiredInfo.isQTotalRequested = false;
        setProjectsWithDefault(requiredInfo);
        setEmployeeTypeWithDefault(requiredInfo);
        requiredInfo.departmentDetails.isRequested = true;
        requiredInfo.departmentDetails.departments.all = false;
        requiredInfo.departmentDetails.departments.isCorporateDetailsRequested = false;
        requiredInfo.departmentDetails.departments.isPopsDetailsRequested = false;
        requiredInfo.departmentDetails.departments.isITDetailsRequested = false;
        requiredInfo.departmentDetails.departments.isTechnologyDetailsRequested = false;
        requiredInfo.departmentDetails.departments.isFinanceDetailsRequested = false;
        requiredInfo.departmentDetails.departments.isBusinessDevDetailsRequested = false;
        requiredInfo.departmentDetails.departments.isQTECHDetailsRequested = false;

        if(specificDepartment === "corporate"){
            requiredInfo.departmentDetails.departments.isCorporateDetailsRequested = true;
        }else if (specificDepartment === "pops") {
            requiredInfo.departmentDetails.departments.isPopsDetailsRequested = true;
        }else if (specificDepartment === "it") {
            requiredInfo.departmentDetails.departments.isITDetailsRequested = true;
        }else if (specificDepartment === "technology") {
            requiredInfo.departmentDetails.departments.isTechnologyDetailsRequested = true;
        }else if (specificDepartment === "finance") {
            requiredInfo.departmentDetails.departments.isFinanceDetailsRequested = true;
        }else if(specificDepartment === "businessdevelopement") {
            requiredInfo.departmentDetails.departments.isBusinessDevDetailsRequested = true;
        }else if(specificDepartment === "qtech") {
            requiredInfo.departmentDetails.departments.isQTECHDetailsRequested = true;
        }
        return requiredInfo
    }
    displaySpecificProjectDetails(projectName){
        var requiredInformation = this.getUpdatedStateForProjects(projectName);
        this.setState((prevState)=> { return { ...prevState, requiredInformation:requiredInformation}  })
    }

    displaySpecificDepartmentDetails(departmentName){
        var requiredInformation = this.getUpdatedStateForDepartment(departmentName);
        this.setState((prevState)=> { return { ...prevState, requiredInformation:requiredInformation}  })
    }

    specificProjectsOrDepartmentsCheck(projOrDeptName,isProjectClicked){
        if(isProjectClicked){
            this.displaySpecificProjectDetails(projOrDeptName)
        }
        else{
            this.displaySpecificDepartmentDetails(projOrDeptName)
        }
    }

   displayAllDepartments(){
     let requiredInfo = AppInitialStateWithDefaultValues.requiredInformation;
     setProjectsWithDefault(requiredInfo);
     setDepartmentsWithDefault(requiredInfo);
     setEmployeeTypeWithDefault(requiredInfo);
     requiredInfo.departmentDetails.isRequested = true;
     requiredInfo.departmentDetails.departments.all = true;
     this.setState((prevState)=> { return { ...prevState, requiredInformation:requiredInfo}  })

   }
   displaySpecificEmployeeTypeDetails(employeeType){
    let requiredInfo = AppInitialStateWithDefaultValues.requiredInformation;
     setProjectsWithDefault(requiredInfo);
     setDepartmentsWithDefault(requiredInfo);
     requiredInfo.employeeTypeDetails.isRequested = true;
     if(employeeType === "fte"){
        requiredInfo.employeeTypeDetails.employeeTypes.isFTETypeRequested = true;
        requiredInfo.employeeTypeDetails.employeeTypes.isContTypeRequested = false;
         requiredInfo.employeeTypeDetails.employeeTypes.isBothTypeRequested = false;
     }
     else if(employeeType === "contractor"){
        requiredInfo.employeeTypeDetails.employeeTypes.isContTypeRequested = true;
        requiredInfo.employeeTypeDetails.employeeTypes.isFTETypeRequested = false;
         requiredInfo.employeeTypeDetails.employeeTypes.isBothTypeRequested = false;
     }
     else {
         requiredInfo.employeeTypeDetails.employeeTypes.isContTypeRequested = false;
         requiredInfo.employeeTypeDetails.employeeTypes.isFTETypeRequested = false;
         requiredInfo.employeeTypeDetails.employeeTypes.isBothTypeRequested = true;
     }
     this.setState((prevState)=> { return { ...prevState, requiredInformation:requiredInfo}  })
   }
    render() {
        return (
            <div className="mainPageComponent">
                <div className="appSectionHolder flex-column">
                   <SideBarComponent displaySpecificProjectDetails = { this.displaySpecificProjectDetails}
                                     displaySpecificDepartmentDetails = { this.displaySpecificDepartmentDetails}
                                     allDepartments = {this.displayAllDepartments}
                                     displaySpecificEmployeeTypeDetails={this.displaySpecificEmployeeTypeDetails}/>
                   {this.state.requiredInformation.isSearchEmployeeRequested ?
                     <DisplaySpecificEmployeeDetails employeeId = {this.props.selectedEmployee} allEmployees = {null}  isBackButtonDisabled = { true} />
                      :
                      <MainContent  requiredInfo = {this.state.requiredInformation } displaySpecificProject = {this.specificProjectsOrDepartmentsCheck}/>
                  }
                </div>
            </div>
        );
    }
}
const setDepartmentsWithDefault =(requiredInfo)=>{
  requiredInfo.isSearchEmployeeRequested = false;
  requiredInfo.departmentDetails.isRequested = false;
  requiredInfo.departmentDetails.departments.all = false;
  requiredInfo.departmentDetails.departments.isCorporateDetailsRequested = false;
  requiredInfo.departmentDetails.departments.isPopsDetailsRequested = false;
  requiredInfo.departmentDetails.departments.isITDetailsRequested = false;
  requiredInfo.departmentDetails.departments.isTechnologyDetailsRequested = false;
  requiredInfo.departmentDetails.departments.isFinanceDetailsRequested = false;
  requiredInfo.departmentDetails.departments.isBusinessDevDetailsRequested = false;
  requiredInfo.departmentDetails.departments.isQTechDetailsRequested = false;

}
const setProjectsWithDefault =(requiredInfo)=>{
  requiredInfo.isSearchEmployeeRequested = false;
  requiredInfo.projectDetails.isRequested = false;
  requiredInfo.projectDetails.projects.isAlphaDetailsRequested = false;
  requiredInfo.projectDetails.projects.isPemexusWorkDetailsRequested = false;
  requiredInfo.projectDetails.projects.isPemexMexicoWorkDetailsRequested = false;
  requiredInfo.projectDetails.projects.isLadardDetailsRequested = false;
  requiredInfo.projectDetails.projects.isHalfayaDetailsRequested = false;
  requiredInfo.projectDetails.projects.isPlusPetrolNorthDetailsRequested = false;
  requiredInfo.projectDetails.projects.isEcoNorthDetailsRequested = false;
  requiredInfo.projectDetails.projects.isKocnkcpRequested = false;

}
const setEmployeeTypeWithDefault =(requiredInfo)=>{
    requiredInfo.isSearchEmployeeRequested = false;
    requiredInfo.employeeTypeDetails.isRequested = false;
    requiredInfo.employeeTypeDetails.employeeTypes.isFTETypeRequested = false;
    requiredInfo.employeeTypeDetails.employeeTypes.isContTypeRequested = false;

  
  }

export default MainPageComponent;
