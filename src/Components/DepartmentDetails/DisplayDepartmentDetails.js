import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import '../../Styles/DisplayProjectDetails.css';
import {totalFTEData} from '../Util/TotalEmployees';
import {totalContData} from '../Util/TotalEmployees';
import {projectsList} from '../Constants/AppConstants'
import ColumnChartEmployee from '../Charts/ColumnChartEmployee';
import {EmployeeCountByProject } from '../Util/GetEmployeeCountByProject';
export default class DisplayProjectDetails extends React.Component{
    constructor(props){
        super(props);
        this.displaySpecificProject = this.displaySpecificProject.bind(this);
    }
    displaySpecificProject(projectName){
        this.props.displaySpecificProject(projectName)
    }
    render() {


        let data = projectsList.map(project =>{
            return <DisplayDepartmentDetails projectInfo={this.props.derievedData[project]} projectName = {project} displaySpecificProject = {this.displaySpecificProject}/>
        })
        return (

            <div className="container-fluid displayProjRow">

                <div><h2> {this.props.projectName ? "specific project details are under construction" : null} </h2></div>
                {data}
            </div>

        );
    }
}

class DisplayDepartmentDetails extends React.Component{
    constructor(props){
        super(props)
        // this.displaySpecificProject = this.displaySpecificProject.bind(this);
    }
    displaySpecificProject(projectName){
        this.props.displaySpecificProject(projectName)
    }
    render(){
        var fteDetails = EmployeeCountByProject(totalFTEData(this.props.projectInfo))
        var fteWorkingHours = fteDetails.totalWorkingHours;
        var fteLabel = "FTE -- ";
        var contractorsDetails = EmployeeCountByProject(totalContData(this.props.projectInfo))
        var contractorsWorkingHours = contractorsDetails.totalWorkingHours;
        var contractorsLabel = "Contractors -- "
        for (const [key, value] of fteDetails.totalEmployees.entries()) {
            fteLabel = fteLabel+(key.replace(" ","")+"-"+value+"  ")
        }
        for (const [key, value] of contractorsDetails.totalEmployees.entries()) {
            contractorsLabel = contractorsLabel+(key.replace(" ","")+"-"+value+"  ")
        }
let categories = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec",]
        return (
            <div className="displayProjCol">
                <a  onClick={()=>this.displaySpecificProject(this.props.projectName)}>
                    <table class="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Project Name</th>
                            <th scope="col">FTE</th>
                            <th scope="col">Contractors</th>
                            <th scope="col">Total Employees</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">{this.props.projectName}</th>
                            <td> {totalFTEData(this.props.projectInfo).length} </td>
                            <td> {totalContData(this.props.projectInfo).length} </td>
                            <td> {this.props.projectInfo.length} </td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        <ColumnChartEmployee fteData={fteWorkingHours} contData={contractorsWorkingHours} categories={categories} />
                    </div>
                </a>
            </div>
        );
    }
}
