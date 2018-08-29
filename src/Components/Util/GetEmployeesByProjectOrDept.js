import {projectsList, departmentList} from '../Constants/AppConstants'
const employeesByProjects = (allProjectData, data) =>{


  data.forEach(employee =>{
    projectsList.forEach(project =>{
      if ( employee.project.toLowerCase().trim().includes( project.toLowerCase()) ){
        allProjectData[project].push(employee);
      }
    })
  });
  return allProjectData;
}
export const GetProjectDetails = (data) =>{
  let allProjectData = {
    "ALPHA" : [],
    "PEMEX US Work" : [],
    "PEMEX MEXICO Work" : [],
    "LAZARD" : [],
    "HALFAYA" : [],
    "PLUSPETROL - NORTH" : [],
    "ECOPETROL" : [],
    "KOC-NK-CP":[]
  }

    return employeesByProjects(allProjectData, data);

}

const employeesByDepartment = (allProjectData, data) =>{
  data.forEach(employee =>{
    departmentList.forEach(department =>{
      if ( employee.homeDepartment.toLowerCase() === department.toLowerCase()){
        if(employee.homeDepartment.toLowerCase() === employee.department.toLowerCase()  && ( employee.project === "0" || employee.project === "Other Technical" || employee.project === "NonBillable - Other Tech") ){

            allProjectData[department].push(employee);
        }
      }
    })
  });
  return allProjectData;
}

export const GetDepartmentDetails = (data) =>{
  let allDepartmentData = {
    "CORPORATE" : [],
    "PEOPLE OPERATIONS" : [],
    "IT" : [],
    "TECHNOLOGY" : [],
    "FINANCE" : [],
    "SME" : [],
    "BUSINESS DEVELOPMENT":[],
    "Q TECH":[]
  }
    return employeesByDepartment(allDepartmentData, data);
}
