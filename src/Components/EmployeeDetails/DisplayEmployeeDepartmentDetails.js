import React from 'react';
import '../../Styles/DisplayEmployeeDetails.css';
import '../../Styles/DisplayEmployeeDepartmentDetails.css';
import '../../Styles/CommonStylings.css';

import {data} from '../Data/dataTwo';
import ReactHighcharts from 'react-highcharts'
import PieChartSpecificEmployee from '../Charts/PieChartSpecificEmployee';
import {EmployeesByProject, EmployeesByDepartment } from '../Util/GetEmployeesByProject';
import {totalFTEData,totalContData,getFteTotalHoursForSpecificMonth, getContTotalHoursForSpecificMonth } from '../Util/TotalEmployees';
import SelectionComponent from '../SelectionComponent/SelectionComponent';
import {QUARTERMAP, WEEKMAP, MONTHMAP} from '../Constants/AppConstants';
import {connect} from "react-redux";
import DisplayEmployee from '../DisplayEmployee/DisplayEmployee';
import {calculateEmployeeHours} from "../Util/CalculateIndividualEmployeeTotalHours";


 class DisplayEmployeeDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedWeek : "jan",
          isSpecificEmployeeRequested:false,
          isPeriodDataRequested:false, 
          periodData:{year:2018,quarter:"",month:"",week:""}
        };
        this.handleData = this.handleData.bind(this);
        this.displaySpecificEmployeeDetails = this.displaySpecificEmployeeDetails.bind(this);
        this.getTotalHoursForSpecificYear = this.getTotalHoursForSpecificYear.bind(this);
        this.displayPeriodData = this.displayPeriodData.bind(this);
        this.displayYearToDateData = this.displayYearToDateData.bind(this);
    }
    handleData(event){

        var selectedWeek = event.target.name;
        this.setState(prevState =>{
            return {...prevState, selectedWeek:selectedWeek}
        })
    }
    displaySpecificEmployeeDetails(employeeId){
      this.props.displaySpecificEmployeeDetails(employeeId)
    }
    getTotalHoursForSpecificYear(year, employees){
      var totalFTEHours = 0;
      var totalContHours = 0;

      employees.forEach(emp =>{
        if((emp.class>999 && emp.class<2000) || (emp.class>2999 && emp.class<4000)){
          totalFTEHours += Number(emp.hours);

        }
        else if(!(emp.class>999 && emp.class<2000) || (emp.class>2999 && emp.class<4000)){
          totalContHours += Number(emp.hours);

        }
      })
      return {totalFTEHours, totalContHours}
    }
     displayYearToDateData(){
         this.setState({isPeriodDataRequested:false,isYearToDateDataRequested:true, isCompareDataRequested: false })
     }
    displayPeriodData(data){

        this.setState({isPeriodDataRequested:true,periodData:data})
      }
      render() {
          var employees = null;
          let employeesByProject, employeesByDepartment, label, fteEmployees, contEmployees;




          //var fteCount, contractorsCount,fteTotalHours, contTotalHours = 0;
          var totalEmployeesforSpecificYear;
          if(this.props.isProjectDetailsRequested){

              label = "  Project ";
            employeesByProject = EmployeesByProject(this.props.projectName,this.props.employeeData);
              //employeesByProject = employeesByProject.filter((emp)=> { return emp[this.state.selectedWeek] > 0  })
              if(this.state.isPeriodDataRequested){
                employeesByProject = employeesByProject.filter((emp)=> emp.date_year === Number(this.state.periodData.year));
                if(this.state.periodData.quarter !== ""){
                    employeesByProject = employeesByProject.filter((emp)=> emp.quarter === QUARTERMAP[this.state.periodData.quarter]);
                }
                if(this.state.periodData.month !== ""){
                    employeesByProject = employeesByProject.filter((emp)=> emp.month === MONTHMAP[this.state.periodData.month]);
                    }
                if(this.state.periodData.week !== ""){
                    employeesByProject = employeesByProject.filter((emp)=> emp.week_day === Number(WEEKMAP[this.state.periodData.week]));
                    }
                
            }
              else if(this.props.isYearToDateDataRequested){
                  employeesByProject = employeesByProject.filter((emp) => emp.date_year === new Date().getFullYear()).filter((emp) => emp.month <= new Date().getMonth()  );
              }
              else{

                  employeesByProject = employeesByProject.filter((emp) => emp.date_year === new Date().getFullYear()).filter((emp) => emp.month <= new Date().getMonth()  )

              }
              totalEmployeesforSpecificYear = this.getTotalHoursForSpecificYear(null, employeesByProject);
              let employeeHours = calculateEmployeeHours(employeesByProject);
              employees = Array.from(employeeHours);

          }
          else{
              label = " Department ";
            employeesByDepartment = EmployeesByDepartment(this.props.departmentName,this.props.employeeData);
              //employeesByDepartment = employeesByDepartment.filter((emp)=> { return emp[this.state.selectedWeek] > 0  })
              if(this.state.isPeriodDataRequested){
                employeesByDepartment = employeesByDepartment.filter((emp)=> emp.date_year === Number(this.state.periodData.year));
                if(this.state.periodData.quarter !== ""){
                    employeesByDepartment = employeesByDepartment.filter((emp)=> emp.quarter === QUARTERMAP[this.state.periodData.quarter]);
                }
                if(this.state.periodData.month !== ""){
                    employeesByDepartment = employeesByDepartment.filter((emp)=> emp.month === MONTHMAP[this.state.periodData.month]);
                    }
                if(this.state.periodData.week !== ""){
                    employeesByDepartment = employeesByDepartment.filter((emp)=> emp.week_day === Number(WEEKMAP[this.state.periodData.week]));
                    }
                
            }

              console.log("employees by department is", employeesByDepartment);
              totalEmployeesforSpecificYear = this.getTotalHoursForSpecificYear(null, employeesByDepartment);
             // fteTotalHours = getFteTotalHoursForSpecificMonth(this.state.selectedWeek,employeesByDepartment)
              //contTotalHours = getContTotalHoursForSpecificMonth(this.state.selectedWeek,employeesByDepartment)


              let employeeHours = calculateEmployeeHours(employeesByDepartment);
              employees = Array.from(employeeHours);
              console.log("the employee hours is",employeeHours);
                //.map(employee => <DisplayEmployee   employee={employee} selectedWeek={this.state.selectedWeek} displaySpecificEmployeeDetails = {this.displaySpecificEmployeeDetails } />)

          }

          let updatedEmployees = employees.map( empArray => empArray[1] );

          /*let updatedEmployees = [];
          console.log("the updated employees empty  is",updatedEmployees);
          employees.forEach( empArray =>  {  updatedEmployees.push(empArray[1]) } );*/

          console.log("the updated employees is",updatedEmployees);
          console.log("the list employees is",updatedEmployees);

           fteEmployees = totalFTEData(updatedEmployees).reverse().map(employee => <DisplayEmployee styling = { "primary" }  employee={employee}  displaySpecificEmployeeDetails = {this.displaySpecificEmployeeDetails } />);
           contEmployees = totalContData(updatedEmployees).reverse().map(employee => <DisplayEmployee styling = { "danger" }   employee={employee}  displaySpecificEmployeeDetails = {this.displaySpecificEmployeeDetails } />);

           if( this.state.isPeriodDataRequested){

              label = label + this.state.periodData.year  ;
              label = label + ( this.state.periodData.quarter === ""  ? "" : " / " + this.state.periodData.quarter  )
              label = label + ( this.state.periodData.month === ""  ? "" : " / " + this.state.periodData.month  )
              label = label + ( this.state.periodData.week === ""  ? "" : " / " + this.state.periodData.week  )
          }

           else if(this.state.isYearToDateDataRequested){
               label = label+"Year to date - "+"Aug 24th,"+ new Date().getFullYear();
           }

          else{
              label = label+ "Aug 24th,"+2018
          }

         // var fteLabel = `FTE COUNT :   ${fteCount} employee(s)  ||  HOURS :  ${fteTotalHours}hrs `;
          //var contLabel = `CONTRACTORS COUNT : ${contractorsCount} employee(s)  ||  HOURS :  ${contTotalHours}hrs `
          let periodData = this.state.periodData;
          let searchedCriteLabel = periodData.year;
          if(periodData.quarter!==""){
              searchedCriteLabel+=" / "+periodData.quarter;
          }
          if(periodData.month!==""){
            searchedCriteLabel+= " / "+periodData.month;
        }
        if(periodData.week!==""){
            searchedCriteLabel+= " / "+periodData.week;
        }
          return (
              <div>
                  <div>
                  <SelectionComponent displayPeriodData={this.displayPeriodData} displayYearToDateData = {this.displayYearToDateData} />
                  </div>
              <h2 className="projectName alert alert-success alert-heading  m-3">
                  Project Name :  <span className="badge text-underline badge-info mr-4"> { updatedEmployees[0] != undefined ? updatedEmployees[0].project : null } </span>
                  Department Name :  <span className="badge text-underline badge-info "> {  updatedEmployees[0] != undefined ? updatedEmployees[0].department : null } </span>   </h2>
                  <p className="underline"></p>
              <div>
               <PieChartSpecificEmployee label = { label } pieData = { [{name:"FTE",y:totalEmployeesforSpecificYear.totalFTEHours},{name:"cont",y:totalEmployeesforSpecificYear.totalContHours}] } isPercentageRequested = { true } />
               <div><EmployeeGraph fteHours= {totalEmployeesforSpecificYear.totalFTEHours} contHours={totalEmployeesforSpecificYear.totalContHours} /></div>
                  <div className="employeeHoursDetails">

                      <p> FTE Hours : { totalEmployeesforSpecificYear.totalFTEHours.toLocaleString() } hrs  (OR) { (( totalEmployeesforSpecificYear.totalFTEHours / (totalEmployeesforSpecificYear.totalFTEHours + totalEmployeesforSpecificYear.totalContHours ))*100 ).toFixed(0)} % </p>
                      <p> Cont Hours : { totalEmployeesforSpecificYear.totalContHours.toLocaleString() } hrs (OR) { (( totalEmployeesforSpecificYear.totalContHours / (totalEmployeesforSpecificYear.totalFTEHours + totalEmployeesforSpecificYear.totalContHours ))*100 ).toFixed(0) }%  </p>
                      <p> Total Hours : { (totalEmployeesforSpecificYear.totalFTEHours + totalEmployeesforSpecificYear.totalContHours).toLocaleString()  } hrs </p>

                  </div>
              </div>

                  <div className="tableList">
                      <table className="table table-dark">
                          <thead >
                          <tr>
                              <th scope="col">Class</th>
                              <th scope="col">Name</th>
                              <th scope="col">Home Department </th>
                              <th scope="col"> Project </th>
                              <th scope="col">{ searchedCriteLabel } (hrs)</th>
                              {/*<th scope="col">Percentage</th>*/}
                          </tr>
                          </thead>
                          <tbody>
                          {fteEmployees}
                          {contEmployees}
                          </tbody>
                      </table>
                  </div>
              </div>
          );
    }
}


class EmployeeGraph extends React.Component {
  constructor(props) {
    super(props);
    this.setConfig = this.setConfig.bind(this);
    }
    setConfig(fteData, contData) {
    const config = {
      chart: {
      type: 'column'
  },
  title: {
      text: 'FTE-Contractors Data'
  },
  xAxis: {
      categories: [
          'MONTH'
      ],
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Hours'
      }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} hours</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: [{
      name: 'FTE',
      data: [this.props.fteHours]

  }, {
      name: 'Contractors',
      data: [this.props.contHours]

  }]
    }
    return config;

    }

    render() {
    return(
        <div className={'chart'}>
            <ReactHighcharts  config={ this.setConfig(this.props.fteData, this.props.contData) }/>
        </div>
    )
    }
    }


const mapStateToProps = (state)=>{
    return { employeeData: state.data}

};
export default connect(mapStateToProps)(DisplayEmployeeDetails);