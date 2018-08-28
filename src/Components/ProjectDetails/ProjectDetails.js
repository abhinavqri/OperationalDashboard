import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import '../../Styles/DisplayProjectDetails.css';
import DisplayProjectDetails from './DisplayProjectDetails';
import SelectionComponent from '../SelectionComponent/SelectionComponent';
import {GetProjectDetails, GetDepartmentDetails} from '../Util/GetEmployeesByProjectOrDept'
import {data} from '../Data/dataTwo';
import {connect} from "react-redux";

 class ProjectDetails extends React.Component{
constructor(props){
  super(props);
  this.displaySpecificProject = this.displaySpecificProject.bind(this);
}
displaySpecificProject(projectName, isProjectClicked){
  this.props.displaySpecificProject(projectName.replace(/ /g,''),isProjectClicked)
}
 render() {

      var allProjectData = {};
      if(this.props.isProjectDetailsRequested){
         allProjectData = GetProjectDetails(this.props.employeeData)
      }else{
          allProjectData = GetDepartmentDetails(this.props.employeeData)
      }

        return (
              <div>
               
               <DisplayProjectDetails isProjectDetailsRequested={this.props.isProjectDetailsRequested} derievedData = {allProjectData}  employeeData = { this.props.employeeData }  displaySpecificProject = {this.displaySpecificProject}/>
              </div>
            );
    }
}


const mapStateToProps = (state)=>{

    return { employeeData: state.data}

};
export default connect(mapStateToProps)(ProjectDetails);