import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../../Styles/DisplayProjectDetails.css';
import '../../Styles/CommonStylings.css';
import {totalFTEData} from '../Util/TotalEmployees';
import {totalContData} from '../Util/TotalEmployees';
import {getLatestMonthInCurrentYearFromTheEmployeeData, calculateCurrentMonthHours, calculatePreviousMonthHours} from '../Util/AppUtil';
import {projectsList,departmentList, QUARTERMAP, WEEKMAP, MONTHMAP} from '../Constants/AppConstants'
import ColumnChartEmployee from '../Charts/ColumnChartEmployee';
import {EmployeeCountByProject } from '../Util/GetEmployeeCountByProject';
import PieChartSpecificEmployee from '../Charts/PieChartSpecificEmployee';
import ReactHighcharts from 'react-highcharts';
import SelectionComponent from '../SelectionComponent/SelectionComponent';
import CompareComponent from '../CompareComponent/CompareComponent';
import DisplayComparedData from '../CompareComponent/DisplayComparedData';
import TotalEmployeeHours from "../TotalEmployeeHours/TotalEmployeeHours";
import "../../Styles/TotalEmployeeHours.css";
import ShowTableData from "../CompareComponent/ShowTableData";



export default class  DisplayProjectDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {isPeriodDataRequested:false, periodData:null, isYearToDateDataRequested:true, compareData: null, isCompareDataRequested: false };
        this.displaySpecificProject = this.displaySpecificProject.bind(this);
        this.getTotalHoursOfSpecificProject = this.getTotalHoursOfSpecificProject.bind(this);
        this.getTotalHoursOfSpecificDepartment = this.getTotalHoursOfSpecificDepartment.bind(this);
        this.displayPeriodData = this.displayPeriodData.bind(this);
        this.getPeriodData = this.getPeriodData.bind(this);
        this.displayYearToDateData = this.displayYearToDateData.bind(this);
        this.displayCompareData = this.displayCompareData.bind(this);
    }
    displayPeriodData(data){
        this.setState({isPeriodDataRequested:true,periodData:data, isYearToDateDataRequested:false, isCompareDataRequested: false })
    }
    displaySpecificProject(projectName,isProjectClicked){
        this.props.displaySpecificProject(projectName,isProjectClicked)
    }

    displayYearToDateData(){
        this.setState({isPeriodDataRequested:false,isYearToDateDataRequested:true, isCompareDataRequested: false })
    }

    displayCompareData(data){
        this.setState({isPeriodDataRequested:false,compareData:data, isYearToDateDataRequested:false, isCompareDataRequested: true })
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

        else {
            deptInfo = deptInfo.filter((emp) => emp.date_year === new Date().getFullYear()).filter((emp) => emp.month <= new Date().getMonth()  );
        }

        return deptInfo;
    }

    getTotalHoursOfSpecificProject(){

        var pieData = [];
        projectsList.map(project => {
            let pieDataForSpecificProject = {name: project};

            let projectInfo = this.props.derievedData[project];
            let totalHours = 0;
            projectInfo = this.getPeriodData(this.state.isPeriodDataRequested, this.state.isYearToDateDataRequested,projectInfo, this.state.periodData);
            projectInfo.forEach(emp => {
                totalHours += Number(emp.hours);
            })
            pieDataForSpecificProject.y = totalHours;
            pieData.push(pieDataForSpecificProject)
        });
        return pieData;

    }



    getTotalHoursOfSpecificDepartment(){

        var pieData = [];
        departmentList.map(dept => {
            let pieDataForSpecificDept = {name: dept};
            let deptInfo = this.props.derievedData[dept];
            let totalHours = 0;
            deptInfo = this.getPeriodData(this.state.isPeriodDataRequested, this.state.isYearToDateDataRequested, deptInfo, this.state.periodData);
            deptInfo.forEach(emp => {
                totalHours += Number(emp.hours);
            })
            pieDataForSpecificDept.y = totalHours;
            pieData.push(pieDataForSpecificDept)
        });
        return pieData;

    }

    removeDuplicateEmployees(data){

        data = data.reduce(function(prev, curr) {
            var inArray = prev.some(function(car) {
                return car.class === curr.class
            });
            if (!inArray) {
                prev.push(curr);
            }
            return prev;
        }, []);
    }


    render() {
        let data = null
        let label;

        if(this.props.isProjectDetailsRequested){
            label = " Projects, "
            data = projectsList.map(project => {
                return <DisplaySpecificProject key={project} isProjectClicked = {true} projectInfo={this.props.derievedData[project]} projectName = {project} displaySpecificProject = {this.displaySpecificProject}/>})
        }else{
            label = " Departments, "

            data = departmentList.map(dept => {
                return <DisplaySpecificProject key={dept} isProjectClicked = {false} projectInfo={this.props.derievedData[dept]} projectName = {dept} displaySpecificProject = {this.displaySpecificProject}/>})
        }

        let latestMonth = getLatestMonthInCurrentYearFromTheEmployeeData( this.props.derievedData ) ;
        console.log("the latest month is", latestMonth);
        if( this.state.isPeriodDataRequested){

            label = label + this.state.periodData.year  ;
            label = label + ( this.state.periodData.quarter === ""  ? "" : " / " + this.state.periodData.quarter  )
            label = label + ( this.state.periodData.month === ""  ? "" : " / " + this.state.periodData.month  )
            label = label + ( this.state.periodData.week === ""  ? "" : " / " + this.state.periodData.week  )
        }


        else{
            label = label+"Year to Date - "+"Aug 24th,"+ new Date().getFullYear();
        }


        let totalEmployeesForAllProjects, totalEmployeesForAllDepartments,fteEmployeeHours = 0,contEmployeeHours = 0, fteEmployees,contEmployees,totalEmployees = [];
        let totalEmployeesForAllProjectsAndDepartments;
        let currentMonthHours, previousMonthHours;
        currentMonthHours = calculateCurrentMonthHours(this.props.derievedData);
        previousMonthHours = calculatePreviousMonthHours(this.props.derievedData);
        console.log("currentMonthHours currentMonthHours", currentMonthHours);
        if(!this.state.isCompareDataRequested){
            if(this.props.isQTotalRequested){
                console.log("isQTotalRequested isQTotalRequested isQTotalRequested");
                totalEmployeesForAllProjects = this.getTotalHoursOfSpecificProject();
                totalEmployeesForAllDepartments = this.getTotalHoursOfSpecificDepartment();
                totalEmployeesForAllProjectsAndDepartments = totalEmployeesForAllProjects.concat(totalEmployeesForAllDepartments);
                for( let project in this.props.derievedData ){
                    totalEmployees = totalEmployees.concat(this.getPeriodData(this.state.isPeriodDataRequested, this.state.isYearToDateDataRequested, this.props.derievedData[project], this.state.periodData));
                }

                for( let dept in this.props.derievedData ){
                    totalEmployees = totalEmployees.concat(this.getPeriodData(this.state.isPeriodDataRequested, this.state.isYearToDateDataRequested, this.props.derievedData[dept], this.state.periodData));

                }
                fteEmployees = totalFTEData(totalEmployees);
                contEmployees = totalContData(totalEmployees);
                fteEmployees.forEach(emp => [ fteEmployeeHours += emp.hours  ] )
                contEmployees.forEach(emp => [ contEmployeeHours += emp.hours  ] )
            }
            else{
                if(this.props.isProjectDetailsRequested){
                    totalEmployeesForAllProjects = this.getTotalHoursOfSpecificProject();
                    for( let project in this.props.derievedData ){
                        totalEmployees = totalEmployees.concat(this.getPeriodData(this.state.isPeriodDataRequested, this.state.isYearToDateDataRequested, this.props.derievedData[project], this.state.periodData));
                    }
                    fteEmployees = totalFTEData(totalEmployees);
                    contEmployees = totalContData(totalEmployees);
                    fteEmployees.forEach(emp => [ fteEmployeeHours += emp.hours  ] )
                    contEmployees.forEach(emp => [ contEmployeeHours += emp.hours  ] )
                }
                else{
                    totalEmployeesForAllDepartments = this.getTotalHoursOfSpecificDepartment()
                    for( let dept in this.props.derievedData ){
                        totalEmployees = totalEmployees.concat(this.getPeriodData(this.state.isPeriodDataRequested, this.state.isYearToDateDataRequested, this.props.derievedData[dept], this.state.periodData));

                    }

                    fteEmployees = totalFTEData(totalEmployees);
                    contEmployees = totalContData(totalEmployees);
                    fteEmployees.forEach(emp => [ fteEmployeeHours += emp.hours  ] )
                    contEmployees.forEach(emp => [ contEmployeeHours += emp.hours  ] )
                }
            }
        }


       console.log("the state  totalEmployeesForAllProjects issss ",totalEmployeesForAllProjects);
        console.log("the state totalEmployeesForAllDepartments issss ",totalEmployeesForAllDepartments);
        return (
            <div className="container-fluid displayProjRow">
                <SelectionComponent displayPeriodData={this.displayPeriodData} displayYearToDateData = {this.displayYearToDateData} />
                <CompareComponent displayCompareData = {  this.displayCompareData } />

           <div className="flex-column flex-wrap">

               { this.state.isCompareDataRequested ? <DisplayComparedData className="displayCompareData col" isProjectDetailsRequested = { this.props.isProjectDetailsRequested }
                                                                          compareData = {this.state.compareData}  employeeData = { this.props.derievedData }/>
                   : ( this.props.isQTotalRequested
                       ? (<div className="container" ><PieChartSpecificEmployee pieData={totalEmployeesForAllProjectsAndDepartments} isPercentageRequested = { true }  label = { label } /></div>)

                          :  ( this.props.isProjectDetailsRequested? (<div className="container" ><PieChartSpecificEmployee pieData={totalEmployeesForAllProjects} isPercentageRequested = { true }  label = { label } /></div>)
                       :(<div className="container"><PieChartSpecificEmployee className="col" pieData={totalEmployeesForAllDepartments} isPercentageRequested = { true } label = { label } /></div>) )
                     )
               }

               { this.state.isCompareDataRequested ? null : <TotalEmployeeHours className="col"  fteEmployeeHours = { fteEmployeeHours }  contEmployeeHours = { contEmployeeHours } /> }

               <div className="employeeHoursDetails  d-inline-block">
                   <p> Current Month Hours : { currentMonthHours.toFixed(0) } hrs</p>
                   <p> Previous Month Hours : { previousMonthHours.toFixed(0) } hrs</p>
                   <p> Difference in Month Hours : { (currentMonthHours - previousMonthHours).toFixed(0) } hrs {(  currentMonthHours - previousMonthHours ) > 0 ? <i class="fa fa-arrow-up"></i> : <i class="fa fa-arrow-down"></i>  } </p>
               </div>

                   </div>
                <hr/>
           <div className=' scale-in-hot-center'> <AllProjOrDeptDetails  isPeriodDataRequested={this.state.isPeriodDataRequested} isYearToDateDataRequested={this.state.isYearToDateDataRequested } periodData={this.state.periodData} data = { this.props.derievedData } isProjectDetailsRequested = { this.props.isProjectDetailsRequested} /> </div>

                {data}
            </div>

        );
    }
}

class DisplaySpecificProject extends React.Component{
    constructor(props){
        super(props)
        // this.displaySpecificProject = this.displaySpecificProject.bind(this);
        this.getUniqueEmployees = this.getUniqueEmployees.bind(this);
    }
    displaySpecificProject(projectName, isProjectClicked){
        this.props.displaySpecificProject(projectName,isProjectClicked)
    }
    getUniqueEmployees(data){
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
    render(){
        console.log("projectInfo projectInfo projectInfo",this.props.projectInfo);
        var fteDetails = EmployeeCountByProject(totalFTEData(this.props.projectInfo).filter( emp => emp.date_year === new Date().getFullYear() ))
        var fteWorkingHours = fteDetails.totalWorkingHours;
        var contractorsDetails = EmployeeCountByProject(totalContData(this.props.projectInfo).filter( emp => emp.date_year === new Date().getFullYear() ))
        var contractorsWorkingHours = contractorsDetails.totalWorkingHours;
        var isProjectClicked = true;

        if(!this.props.isProjectClicked){
            isProjectClicked = false
        }
        let projOrDeptName = this.props.projectName;
        if( projOrDeptName === "PEOPLE OPERATIONS" ){
            projOrDeptName = "POPS" ;
        }
        console.log("project name ", this.props.projectName);
        let categories = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
        return (
            <div className="displayProjCol slide-in-fwd-center">
                <a  onClick={()=>this.displaySpecificProject(projOrDeptName,isProjectClicked)}>
                    <table className="table table-dark">
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
                            <td> {this.getUniqueEmployees(totalFTEData(this.props.projectInfo)).length} </td>
                            <td> {this.getUniqueEmployees(totalContData(this.props.projectInfo)).length} </td>
                            <td> {this.getUniqueEmployees(this.props.projectInfo).length} </td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        <ColumnChartEmployee label = { 2018 }  fteData={fteWorkingHours} contData={contractorsWorkingHours} categories={categories} />
                    </div>
                </a>
            </div>
        );
    }
}

class AllProjOrDeptDetails extends React.Component{
    constructor(props){
        super(props);
        this.getTotalHoursByProjects = this.getTotalHoursByProjects.bind(this);
        this.getTotalHoursByDepartment = this.getTotalHoursByDepartment.bind(this);
        this.getTotalHours = this.getTotalHours.bind(this);
        this.isFTE = this.isFTE.bind(this);

        this.state= {
            isEmployeeTypeRequested:''
        }
    }


    getTotalHoursByProjects(data){
        let fteHours = [];
        let contHours = [];
        projectsList.map(project => {

            let projectInfo = data[project];
            let  fteTotalHoursForSpecificProject = 0;
            let  contTotalHoursForSpecificProject = 0;
            if(this.props.isPeriodDataRequested){
                projectInfo = projectInfo.filter((emp)=> emp.date_year === Number(this.props.periodData.year));
                if(this.props.periodData.quarter !== ""){
                    projectInfo = projectInfo.filter((emp)=> emp.quarter === QUARTERMAP[this.props.periodData.quarter]);
                }
                if(this.props.periodData.month !== ""){
                    projectInfo = projectInfo.filter((emp)=> emp.month === MONTHMAP[this.props.periodData.month]);
                }
                if(this.props.periodData.week !== ""){
                    projectInfo = projectInfo.filter((emp)=> emp.week_day === Number(WEEKMAP[this.props.periodData.week]));
                }

            }
            else{

                projectInfo = projectInfo.filter((emp) => emp.date_year === new Date().getFullYear()).filter((emp) => emp.month <= new Date().getMonth()  )

            }


            projectInfo.forEach(emp =>{
                if(this.isFTE(emp)){
                    fteTotalHoursForSpecificProject += this.getTotalHours(emp);
                }
                else if(!this.isFTE(emp)){
                    contTotalHoursForSpecificProject += this.getTotalHours(emp)
                }
            })
            fteHours.push(fteTotalHoursForSpecificProject);
            contHours.push(contTotalHoursForSpecificProject);
        });
        return { fteHours, contHours };
    }
    getTotalHours(emp){
        return (Number(emp.hours));
    }
    isFTE(emp){
        if((emp.class>999 && emp.class<2000) || (emp.class>2999 && emp.class<4000)){
            return true;
        }
    }
    getTotalHoursByDepartment(data){
        let fteHours = [];
        let contHours = [];
        departmentList.map(dept => {
            let deptInfo = data[dept];
            let  fteTotalHoursForSpecificDept = 0;
            let  contTotalHoursForSpecificDept = 0;
            if(this.props.isPeriodDataRequested){
                deptInfo = deptInfo.filter((emp)=> emp.date_year === Number(this.props.periodData.year));
                if(this.props.periodData.quarter !== ""){
                    deptInfo = deptInfo.filter((emp)=> emp.quarter === QUARTERMAP[this.props.periodData.quarter]);
                }
                if(this.props.periodData.month !== ""){
                    deptInfo = deptInfo.filter((emp)=> emp.month === MONTHMAP[this.props.periodData.month]);
                }
                if(this.props.periodData.week !== ""){
                    deptInfo = deptInfo.filter((emp)=> emp.week_day === Number(WEEKMAP[this.props.periodData.week]));
                }

            }
            else{

                deptInfo = deptInfo.filter((emp) => emp.date_year === new Date().getFullYear()).filter((emp) => emp.month <= new Date().getMonth()  );

            }
            deptInfo.forEach(emp =>{
                if(this.isFTE(emp)){
                    fteTotalHoursForSpecificDept += this.getTotalHours(emp);
                }
                else if(!this.isFTE(emp) ){
                    contTotalHoursForSpecificDept += this.getTotalHours(emp);
                }
            })
            fteHours.push(fteTotalHoursForSpecificDept);
            contHours.push(contTotalHoursForSpecificDept);
        });
        return { fteHours, contHours };
    }




    render(){
        let label = "", latestMonth;
        if( this.props.isPeriodDataRequested ){
            label = label + this.props.periodData.year  ;
            label = label + ( this.props.periodData.quarter === ""  ? "" : " / " + this.props.periodData.quarter  )
            label = label + ( this.props.periodData.month === ""  ? "" : " / " + this.props.periodData.month  )
            label = label + ( this.props.periodData.week === ""  ? "" : " / " + this.props.periodData.week  )
        }
        else{
            label = label+"Year to Date - "+"Aug 24th,"+ new Date().getFullYear();
        }
        let employeeHours;
        let projectOrDeptList;
        if(this.props.isProjectDetailsRequested) {
            employeeHours = this.getTotalHoursByProjects(this.props.data);
            projectOrDeptList = projectsList;
            label = label+" - Projects";
        }else{
            employeeHours = this.getTotalHoursByDepartment(this.props.data);
            projectOrDeptList = departmentList;
            label =label+ " - Departments";
        }
        return (
            <div>
                <ColumnChartEmployee fteData={employeeHours.fteHours} contData={employeeHours.contHours} categories={projectOrDeptList} label = { label } />
            </div>
        );
    }
}
