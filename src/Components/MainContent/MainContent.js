import React  from 'react';
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import '../../Styles/MainContent.css';
import DepartmentDetails from "../DepartmentDetails/DisplayDepartmentDetails";
import ProjectDepartmentDetails from '../ProjectDepartmentDetails/ProjectDepartmentDetails'
import EmployeeTypeDetails from '../EmployeeTypeDetails/EmployeeTypeDetails';

export default class MainContent extends React.Component {
    constructor(props){
        super(props)
        this.displaySpecificProject = this.displaySpecificProject.bind(this);
    }
    displaySpecificProject(projectName,isProjectClicked){
      this.props.displaySpecificProject(projectName.toLowerCase(),isProjectClicked)

    }
    render() {
         let checkComponentRender = this.props.requiredInfo;
         console.log("checkComponentRender checkComponentRender ", checkComponentRender);
        return (
            <div className="mainContent">

                { checkComponentRender.isQTotalRequested ? <ProjectDetails displaySpecificProject={this.displaySpecificProject} isQTotalRequested={true}/>
                  : ( checkComponentRender.projectDetails.isRequested ? ( checkComponentRender.projectDetails.projects.all ? <ProjectDetails displaySpecificProject={this.displaySpecificProject} isProjectDetailsRequested={true}/> :
                    (checkComponentRender.projectDetails.projects.isAlphaDetailsRequested ? <ProjectDepartmentDetails projectName={"Alpha"} isProjectDetailsRequested = {true} /> :
                    (checkComponentRender.projectDetails.projects.isPemexusWorkDetailsRequested ? <ProjectDepartmentDetails projectName={"PEMEX US Work"} isProjectDetailsRequested = {true} /> :
                    (checkComponentRender.projectDetails.projects.isPemexMexicoWorkDetailsRequested ? <ProjectDepartmentDetails projectName={"PEMEX MEXICO Work"} isProjectDetailsRequested = {true} /> :
                    (checkComponentRender.projectDetails.projects.isLadardDetailsRequested ? <ProjectDepartmentDetails projectName={"LAZARD"} isProjectDetailsRequested = {true} /> :
                    (checkComponentRender.projectDetails.projects.isHalfayaDetailsRequested ? <ProjectDepartmentDetails projectName={"HALFAYA"} isProjectDetailsRequested = {true} /> :
                    (checkComponentRender.projectDetails.projects.isPlusPetrolNorthDetailsRequested ? <ProjectDepartmentDetails projectName={"PLUSPETROL - NORTH"} isProjectDetailsRequested = {true} /> :
                    (checkComponentRender.projectDetails.projects.isEcoNorthDetailsRequested ? <ProjectDepartmentDetails projectName={"ECOPETROL"} isProjectDetailsRequested = {true} /> :
                    (checkComponentRender.projectDetails.projects.isKocnkcpDetailsRequested ? <ProjectDepartmentDetails projectName={"KOC-NK-CP"} isProjectDetailsRequested = {true} /> :null)))))))) )
                  :   checkComponentRender.departmentDetails.isRequested ? ( checkComponentRender.departmentDetails.departments.all ? <ProjectDetails displaySpecificProject={this.displaySpecificProject} isAllDepartmentReq={true}/> :
                         (checkComponentRender.departmentDetails.departments.isCorporateDetailsRequested ? <ProjectDepartmentDetails departmentName={"Corporate"} isDepartmentDetailsRequested = {true} /> :
                         (checkComponentRender.departmentDetails.departments.isPopsDetailsRequested ? <ProjectDepartmentDetails departmentName={"People Operations"} isDepartmentDetailsRequested = {true} /> :
                         (checkComponentRender.departmentDetails.departments.isITDetailsRequested ? <ProjectDepartmentDetails departmentName={"it"} isDepartmentDetailsRequested = {true} /> :
                         (checkComponentRender.departmentDetails.departments.isTechnologyDetailsRequested ? <ProjectDepartmentDetails departmentName={"Technology"} isDepartmentDetailsRequested = {true} /> :
                         (checkComponentRender.departmentDetails.departments.isFinanceDetailsRequested ? <ProjectDepartmentDetails departmentName={"Finance"} isDepartmentDetailsRequested = {true} /> :
                         (checkComponentRender.departmentDetails.departments.isBusinessDevDetailsRequested ? <ProjectDepartmentDetails departmentName={"Business Development"} isDepartmentDetailsRequested = {true} /> :
                         (checkComponentRender.departmentDetails.departments.isQTECHDetailsRequested ? <ProjectDepartmentDetails departmentName={"Q Tech"} isDepartmentDetailsRequested = {true} /> :null))))))) )
                  :   checkComponentRender.QTechDetails.isRequested ? ( checkComponentRender.QTechDetails.qtech.all ? <DepartmentDetails /> :
                         null)
                  :   checkComponentRender.employeeTypeDetails.isRequested ? ( (checkComponentRender.employeeTypeDetails.employeeTypes.isFTETypeRequested ? <EmployeeTypeDetails isEmployeeTypeResquested = { checkComponentRender.employeeTypeDetails.employeeTypes } employeeType={"FTE"} /> :
                                        (checkComponentRender.employeeTypeDetails.employeeTypes.isContTypeRequested ? <EmployeeTypeDetails employeeType={"CONTRACTOR"} />:checkComponentRender.employeeTypeDetails.employeeTypes.isBothTypeRequested ? <EmployeeTypeDetails employeeType={"BOTH"} />: null)))
                  : null
                    )
               }
            </div>
        );
    }
}
