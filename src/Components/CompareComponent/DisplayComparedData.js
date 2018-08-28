import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import {NavLink} from "react-router-dom";
import { bootstrap } from 'bootstrap';
import PieChartSpecificEmployee from '../Charts/PieChartSpecificEmployee';
import {departmentList, MONTHMAP, projectsList, QUARTERMAP, WEEKMAP, DYNAMICMONTHSMAP} from "../Constants/AppConstants";
import {totalFTEData, totalContData} from "../Util/TotalEmployees";
import "../../Styles/DisplayComparedData.css";
import  TotalEmployeeHours from "../TotalEmployeeHours/TotalEmployeeHours" ;
import {buildCompareDataForProjOrDept} from './BuildCompareData'
import { getLatestMonthInCurrentYearFromTheEmployeeData } from "../Util/AppUtil";
import ShowTableData from './ShowTableData';


class DisplayComparedData extends React.Component{

    constructor(props){
        super(props)

        this.getPieData = this.getPieData.bind(this);
        this.getTotalHoursOfSpecificDepartment = this.getTotalHoursOfSpecificDepartment.bind(this);
        this.getTotalHoursOfSpecificProject = this.getTotalHoursOfSpecificProject.bind(this);
        this.getPeriodData = this.getPeriodData.bind(this);
        this.getPieDataForSelectedComparePeriod = this.getPieDataForSelectedComparePeriod.bind(this);


    }

    getPieData(isProjectDetailsRequested, compareData, employeeData){
        let data ;

        if(isProjectDetailsRequested){

            data =   this.getTotalHoursOfSpecificProject(compareData, employeeData);
        }

        else{

            data =   this.getTotalHoursOfSpecificDepartment(compareData, employeeData);

        }

        return data ;

    }
    getPieDataForSelectedComparePeriod(isProjectDetailsRequested, compareData, employeeData){

        let compareDataForTwentySeveteen, compareDataForTwentyEighteen;
        if( compareData.selectedYear !== "" && compareData.selectedQuarter =="" && compareData.selectedMonth =="" && compareData.selectedWeek ==""){
            let latestMonthInCurrentYear = getLatestMonthInCurrentYearFromTheEmployeeData(employeeData) ;
            latestMonthInCurrentYear = 1;
            compareDataForTwentySeveteen  = { year:2017, months: DYNAMICMONTHSMAP[latestMonthInCurrentYear], weeks: compareData.selectedWeek, quarters: compareData.selectedQuarter }
            compareDataForTwentyEighteen = { year:2018, months: DYNAMICMONTHSMAP[latestMonthInCurrentYear], weeks: compareData.selectedWeek, quarters: compareData.selectedQuarter }
        }
        else{
            compareDataForTwentySeveteen  = { year:2017, months: compareData.selectedMonth, weeks: compareData.selectedWeek, quarters: compareData.selectedQuarter }
            compareDataForTwentyEighteen = { year:2018, months: compareData.selectedMonth, weeks: compareData.selectedWeek, quarters: compareData.selectedQuarter }
        }
        let twentySeventeenData = this.getPieData( isProjectDetailsRequested, compareDataForTwentySeveteen, employeeData );
        let twentyEighteenData = this.getPieData( isProjectDetailsRequested, compareDataForTwentyEighteen, employeeData);


        return { 2017:twentySeventeenData,  2018:twentyEighteenData  }
    }

    getTotalHoursOfSpecificProject(compareData, employeeData){
        let pieData = [];
        let totalEmployees = [];
        let fteEmployeeHours = 0, contEmployeeHours = 0;
        projectsList.map(project => {
            let pieDataForSpecificProject = {name: project};
            let projectInfo = employeeData[project];
            let totalHours = 0;
            projectInfo = this.getPeriodData(projectInfo, compareData);
            projectInfo.forEach(emp => {
                totalHours += Number(emp.hours);
            })
            pieDataForSpecificProject.y = totalHours;
            pieData.push(pieDataForSpecificProject)
            totalEmployees = totalEmployees.concat(projectInfo);
        });
        totalFTEData(totalEmployees).forEach( emp => { fteEmployeeHours += emp.hours   } );
        totalContData(totalEmployees).forEach( emp => { contEmployeeHours += emp.hours   } );
        return { pieData, fteEmployeeHours, contEmployeeHours } ;

    }

    getTotalHoursOfSpecificDepartment(compareData, employeeData){

        var pieData = [];
        let totalEmployees = [];
        let fteEmployeeHours = 0, contEmployeeHours = 0;
        departmentList.map(dept => {
            let pieDataForSpecificDept = {name: dept};
            let deptInfo = employeeData[dept];
            let totalHours = 0;
            deptInfo = this.getPeriodData( deptInfo, compareData);
            deptInfo.forEach(emp => {
                totalHours += Number(emp.hours);
            })
            pieDataForSpecificDept.y = totalHours;
            pieData.push(pieDataForSpecificDept);
            totalEmployees = totalEmployees.concat(deptInfo);
        });
        totalFTEData(totalEmployees).forEach( emp => { fteEmployeeHours += emp.hours   } );
        totalContData(totalEmployees).forEach( emp => { contEmployeeHours += emp.hours   } );
        return { pieData, fteEmployeeHours, contEmployeeHours } ;

    }

    getPeriodData( deptInfo, compareDataInfo){

        let updatedDeptInfo = [];
        deptInfo = deptInfo.filter((emp) => emp.date_year === Number(compareDataInfo.year));
        if( compareDataInfo.months !==  "" ){

            compareDataInfo.months.split('-').forEach( month => {

                if( month !== "" ){
                    updatedDeptInfo = updatedDeptInfo.concat(deptInfo.filter((emp) => emp.month === MONTHMAP[month.toUpperCase()]));
                }

            })
            if(compareDataInfo.months.split('-').length === 1){
                let updatedInfoForWeeks = [];
                compareDataInfo.weeks.split('-').forEach( week => {
                    if( week !== "" ){
                        updatedInfoForWeeks = updatedInfoForWeeks.concat(updatedDeptInfo.filter((emp) => emp.week_day === WEEKMAP[week.toUpperCase()]));
                    }
                })
                updatedDeptInfo = updatedInfoForWeeks;
            }
        }

        if( compareDataInfo.quarters !==  "" ){

            compareDataInfo.quarters.split('-').forEach( quarter => {

                if( quarter !== "" ){
                    updatedDeptInfo = updatedDeptInfo.concat(deptInfo.filter((emp) => emp.quarter === QUARTERMAP[quarter.toUpperCase()]));
                }

            })
        }

        return updatedDeptInfo;
    }

    render() {

        let pieChartData = buildCompareDataForProjOrDept(this.props.isProjectDetailsRequested, this.props.compareData, this.props.employeeData);

        let pieCharts = pieChartData.map(data => <DisplayPieChartForComparedData pieData ={data.data.pieData} fteHours={data.data.fteEmployeeHours} contHours={data.data.contEmployeeHours} labelInfo={data.labelInfo} />);
        return (

            <div>
                {pieCharts}
                <div>
                    { pieChartData.length == 2 ? <ShowTableData pieChartData = { pieChartData }/> : null }
                </div>
            </div>


        );
    }
}


class DisplayPieChartForComparedData extends React.Component{

    constructor(props){
        super(props)

    }


    render() {
        //let label = " Selected Period"
        return (

            <div >
                <PieChartSpecificEmployee pieData={this.props.pieData} isPercentageRequested = { true }  label = { this.props.labelInfo } className=" w-50 " />
                <TotalEmployeeHours  fteEmployeeHours = { this.props.fteHours }  contEmployeeHours = { this.props.contHours } />
            </div>

        );
    }
}





export default DisplayComparedData;