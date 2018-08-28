import React  from 'react';
import {data} from '../Data/dataTwo';
import {GetProjectDetails, GetDepartmentDetails} from '../Util/GetEmployeesByProjectOrDept'
import PieChartSpecificEmployee from '../Charts/PieChartSpecificEmployee';
import StackedChartSpecificEmployee from '../Charts/StackedChartSpecificEmployee';
import SelectionComponent  from '../SelectionComponent/SelectionComponent';
import {connect} from "react-redux";
import {MONTHMAP, projectsList, departmentList, QUARTERMAP, WEEKMAP} from "../Constants/AppConstants";
import CompareComponent from '../CompareComponent/CompareComponent';
import  {GetStackedData} from '../Util/StackedDataUtil';
import DisplayProjectorDepartmentList  from '../DisplayProjOrDeptButtons/DisplayProjectorDepartmentList';
import '../../Styles/EmployeeTypeDetails.css';
import '../../Styles/CommonStylings.css';
class EmployeeTypeDetails extends React.Component{
    constructor(props){
        super(props);
        this.employeeCount = this.employeeCount.bind(this);
        this.getPieData = this.getPieData.bind(this);
        this.getFTEmployees = this.getFTEmployees.bind(this);
        this.getContractorEmployees = this.getContractorEmployees.bind(this);
        this.getTotalHoursOfSpecificProject = this.getTotalHoursOfSpecificProject.bind(this);
        this.getTotalHoursOfSpecificDepartment = this.getTotalHoursOfSpecificDepartment.bind(this);
        this.getPeriodData = this.getPeriodData.bind(this);
        this.displayPeriodData = this.displayPeriodData.bind(this);
        this.displayYearToDateData = this.displayYearToDateData.bind(this)
        this.state = {
            isPeriodDataRequested:false,
            periodData:{year:2017,quarter:"",month:"",week:""},
            isYearToDateDataRequested:false
        };
    }
    employeeCount(projOrDeptDetails){
        for(let propDept in projOrDeptDetails){
            projOrDeptDetails[propDept] = projOrDeptDetails[propDept].length;
        }
        return projOrDeptDetails;
    }
    getPieData(data){
        let pieData = [];
        for(let propDept in data){
            pieData.push({name:propDept,y:data[propDept]})
        }
        return pieData;
    }
    getFTEmployees(data){
        var totalFTE = data.filter(emp => {
            if((emp.class>999 && emp.class<2000) || (emp.class>2999 && emp.class<4000)){
                return emp;
            }
        });
        return totalFTE;
    }
    getContractorEmployees(data){
        var totalCont = data.filter(emp => {
            if(!((emp.class>999 && emp.class<2000) || (emp.class>2999 && emp.class<4000))){
                return emp;
            }
        });
        return totalCont;
    }
    displayPeriodData(data){
        this.setState({isPeriodDataRequested:true,periodData:data})
    }

    displayYearToDateData(){
        this.setState({isPeriodDataRequested:false,isYearToDateDataRequested:true })
    }

    getPeriodData(isPeriodDataRequested, isYearToDateDataRequested, deptInfo, stateInfo){
        if (isPeriodDataRequested) {
            deptInfo = deptInfo.filter((emp) => emp.date_year === Number(stateInfo.year));
            if (stateInfo.quarter !== "") {
                deptInfo = deptInfo.filter((emp) => emp.quarter === QUARTERMAP[stateInfo.quarter]);
            }
            if (stateInfo.month !== "") {
                deptInfo = deptInfo.filter((emp) => emp.month === MONTHMAP[stateInfo.month]);
            }
            if (stateInfo.week !== "") {
                deptInfo = deptInfo.filter((emp) => emp.week_day === Number(WEEKMAP[stateInfo.week]));
            }

        }
        else if(isYearToDateDataRequested){
            deptInfo = deptInfo.filter((emp) => emp.date_year === new Date().getFullYear()).filter((emp) => emp.month <= new Date().getMonth()  );
        }
        else {
            deptInfo = deptInfo.filter((emp) => emp.date_year === new Date().getFullYear()).filter((emp) => emp.month <= new Date().getMonth()  )
        }

        return deptInfo;
    }

    getTotalHoursOfSpecificProject(data){
        if(data) {
            var pieData = [];
            var empData = [];
            projectsList.map(project => {
                let pieDataForSpecificProject = {name: project};
                let employeesOfSpecificProject = {name: project};
                let projectInfo = data[project];
                let totalHours = 0;
                projectInfo = this.getPeriodData(this.state.isPeriodDataRequested, this.state.isYearToDateDataRequested, projectInfo, this.state.periodData);
                projectInfo.forEach(emp => {
                    totalHours += Number(emp.hours);
                })
                pieDataForSpecificProject.y = totalHours;
                employeesOfSpecificProject.employees = projectInfo;
                pieData.push(pieDataForSpecificProject)
                empData.push(employeesOfSpecificProject)
            });
            return { pieData, empData} ;
        }
    }

    getTotalHoursOfSpecificDepartment(data){
        if(data) {
            var pieData = [];
            var empData = [];
            departmentList.map(dept => {
                let pieDataForSpecificDept = {name: dept};
                let employeesOfSpecificDept = {name: dept};
                let deptInfo = data[dept];
                let totalHours = 0;
                deptInfo = this.getPeriodData(this.state.isPeriodDataRequested, this.state.isYearToDateDataRequested, deptInfo, this.state.periodData);
                deptInfo.forEach(emp => {
                    totalHours += Number(emp.hours);
                })
                pieDataForSpecificDept.y = totalHours;
                employeesOfSpecificDept.employees = deptInfo;
                pieData.push(pieDataForSpecificDept);
                empData.push(employeesOfSpecificDept);
            });
            return { pieData, empData};
        }
    }
    render(){

        //let currentYearData = this.props.employeeData.filter((emp)=> emp.date_year === 2017);
        let employeesByDept ;
        let employeesByProj ;
        let pieDataForProject,  pieDataForDept;
        let label = "";
        let fteOrContEmployees;
        let fteOrContData, employeesDataForProjects, employeesDataForDepartments;
        if(this.props.employeeType === "FTE"){
            label = " FTE until Aug,17th "
            fteOrContData = this.getFTEmployees(this.props.employeeData)
            employeesByProj = GetProjectDetails(fteOrContData);
            employeesByDept = GetDepartmentDetails(fteOrContData);
            let pieDataAndEmpData = this.getTotalHoursOfSpecificProject(employeesByProj)
            console.log("the p[}data is", pieDataAndEmpData);
            pieDataForProject = pieDataAndEmpData.pieData;
            employeesDataForProjects = pieDataAndEmpData.empData;
            let pieDataAndEmpDataForDept = this.getTotalHoursOfSpecificDepartment(employeesByDept);
            console.log("the p[}data for dept is", pieDataAndEmpDataForDept);
            pieDataForDept= pieDataAndEmpDataForDept.pieData;
            employeesDataForDepartments =  pieDataAndEmpDataForDept.empData;
        }
        else if(this.props.employeeType === "CONTRACTOR"){
            label = " CONTRACTOR until Aug,17th "
            fteOrContData = this.getContractorEmployees(this.props.employeeData)
            employeesByProj = GetProjectDetails(fteOrContData);
            employeesByDept = GetDepartmentDetails(fteOrContData);
            let pieDataAndEmpData = this.getTotalHoursOfSpecificProject(employeesByProj);
            pieDataForProject = pieDataAndEmpData.pieData;
            employeesDataForProjects = pieDataAndEmpData.empData;
            let pieDataAndEmpDataForDept = this.getTotalHoursOfSpecificDepartment(employeesByDept);
            pieDataForDept= pieDataAndEmpDataForDept.pieData;
            employeesDataForDepartments =  pieDataAndEmpDataForDept.empData;


        }
        else{
            label = " Total Employees until Aug,17th "
            fteOrContData = this.props.employeeData;
            employeesByProj = GetProjectDetails(fteOrContData);
            employeesByDept = GetDepartmentDetails(fteOrContData);
            let pieDataAndEmpData = this.getTotalHoursOfSpecificProject(employeesByProj);
            pieDataForProject = pieDataAndEmpData.pieData;
            employeesDataForProjects = pieDataAndEmpData.empData;
            let pieDataAndEmpDataForDept = this.getTotalHoursOfSpecificDepartment(employeesByDept);
            pieDataForDept= pieDataAndEmpDataForDept.pieData;
            employeesDataForDepartments =  pieDataAndEmpDataForDept.empData;
        }

        if( this.state.isPeriodDataRequested){

            label = label + this.state.periodData.year  ;
            label = label + ( this.state.periodData.quarter === ""  ? "" : " / " + this.state.periodData.quarter  )
            label = label + ( this.state.periodData.month === ""  ? "" : " / " + this.state.periodData.month  )
            label = label + ( this.state.periodData.week === ""  ? "" : " / " + this.state.periodData.week  )

        }
        else if(this.state.isYearToDateDataRequested){
            label = "Year to date of "+ new Date().getFullYear();
        }
        else{
            label = label+ new Date().getFullYear();
        }

        console.log("pieDataForProject pieDataForProject",pieDataForProject);
        console.log("pieDataForDept pieDataForDept", pieDataForDept);

        let billableEmployeeHoursSum = pieDataForProject.map(emp => emp.y).reduce( (a,b) => a+b );
        let nonBillableEmployeeHoursSum = pieDataForDept.map(emp => emp.y).reduce( (a,b) => a+b );
        return(
            <div>
                <SelectionComponent displayPeriodData={this.displayPeriodData} displayYearToDateData = {this.displayYearToDateData}/>

                <div><PieChartSpecificEmployee pieData={pieDataForProject} isPercentageRequested = { true }  label = {"Billable "+ label } /> </div> <span className="displayProjName"> Billable Hours : { billableEmployeeHoursSum.toLocaleString() } hrs</span>
                <DisplayProjectorDepartmentList  isProjectDetailsRequested = {true} employeesData = { employeesDataForProjects } />
                <hr/>
                <div><PieChartSpecificEmployee pieData={pieDataForDept} isPercentageRequested = { false }  label = {"Non-Billable "+ label } />  </div> <span className="displayProjName"> Non - Billable Hours : { nonBillableEmployeeHoursSum.toLocaleString() }hrs</span>
                <DisplayProjectorDepartmentList isProjectDetailsRequested = {false} employeesData = { employeesDataForDepartments } />
                <hr/>
                <div className="stackedAreaGraphs"><StackedChartSpecificEmployee stackedData={getEmployeesByDeptorProj(true, fteOrContData)} /></div>
                <hr/>
                <div className="stackedAreaGraphs"><StackedChartSpecificEmployee stackedData={getEmployeesByDeptorProj(false, fteOrContData)} /></div>
            </div>
        )
    }
}
const getEmployeesByDeptorProj=(isProjectRequested, data)=>{
    data = data.filter(emp => emp.date_year === 2018);
    return GetStackedData(isProjectRequested, data);
}

const getUniqueEmployees=(data)=>{
    var uniqueEmployees = [];
    var unique = {};
    data.forEach((emp)=> {
        if (!unique[emp.class]) {
            uniqueEmployees.push(emp);
            unique[emp.class] = emp;
        }
    });
    return uniqueEmployees;
}

const mapStateToProps = (state)=>{
    return { employeeData: state.data}
};
export default connect(mapStateToProps)(EmployeeTypeDetails);