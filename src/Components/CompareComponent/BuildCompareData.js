import {departmentList, MONTHMAP, projectsList, QUARTERMAP, WEEKMAP, DYNAMICMONTHSMAP} from "../Constants/AppConstants";
import {totalFTEData, totalContData} from "../Util/TotalEmployees";

export const buildCompareDataForProjOrDept = (isProjectDetailsRequested, compareData, employeeData) =>{
    let totalSelectedYears = compareData.selectedYear.split("-").length;
    let totalSelectedQuarters = compareData.selectedQuarter.split("-").length;
    let totalSelectedMonth = compareData.selectedMonth.split("-").length;
    let totalSelectedWeek = compareData.selectedWeek.split("-").length;
    let dataToBeDisplay = [] ;
    if(totalSelectedYears === 1){
        if(compareData.selectedQuarter !== ""){
            let noOfChartToBeDisplayed = totalSelectedQuarters;
            for(let index = 0;index <noOfChartToBeDisplayed; index++){
                let selectedQurter = compareData.selectedQuarter.split("-")[index];
                let updatedCompareData = {year:compareData.selectedYear.split("-")[0],quarters:selectedQurter,months:"",weeks:""}
                dataToBeDisplay.push(getPieData(isProjectDetailsRequested,updatedCompareData,employeeData))
            }

        }else{
            if(compareData.selectedMonth.split("-").length >= 2){
                let noOfChartToBeDisplayed = compareData.selectedMonth.split("-").length;
                console.log("the 111111111111111 ",noOfChartToBeDisplayed)
                for(let index = 0;index <noOfChartToBeDisplayed; index++){
                    let selectedMonth = compareData.selectedMonth.split("-")[index];
                    let updatedCompareData = {year:compareData.selectedYear.split("-")[0],quarters:"",months:selectedMonth,weeks:""}
                    dataToBeDisplay.push(getPieData(isProjectDetailsRequested,updatedCompareData,employeeData))
                }

            }else{
                // one month selected and multiple weeks selected
                let noOfChartToBeDisplayed = compareData.selectedWeek.split("-").length;
                for(let index = 0;index <noOfChartToBeDisplayed; index++){
                    let selectedWeek = compareData.selectedWeek.split("-")[index];
                    let updatedCompareData = {year:compareData.selectedYear.split("-")[0],quarters:"",months:compareData.selectedMonth.split("-")[0],weeks:selectedWeek}
                    dataToBeDisplay.push(getPieData(isProjectDetailsRequested,updatedCompareData,employeeData))
                }
            }

        }
    }
    else{
        let noOfChartToBeDisplayed = totalSelectedYears;
        if( compareData.selectedYear !== "" && compareData.selectedQuarter =="" && compareData.selectedMonth =="" && compareData.selectedWeek ==""){
            let latestMonthInCurrentYear = "";
            latestMonthInCurrentYear = getLatestMonthInCurrentYearFromTheEmployeeData(employeeData) ;
            //console.log("t6666666666666666666666 ", latestMonthInCurrentYear+)
            //latestMonthInCurrentYear = 1;
            for(let index = 0;index <noOfChartToBeDisplayed; index++){
                let selectedYear = compareData.selectedYear.split("-")[index];
                let updatedCompareData  = { year:selectedYear, months: DYNAMICMONTHSMAP[latestMonthInCurrentYear], weeks: compareData.selectedWeek, quarters: compareData.selectedQuarter }
                console.log("t6666666666666666666666 ", updatedCompareData)
                dataToBeDisplay.push(getPieData(isProjectDetailsRequested,updatedCompareData,employeeData))
            }
        }
        else{
            for(let index = 0;index <noOfChartToBeDisplayed; index++){
                let selectedYear = compareData.selectedYear.split("-")[index];
                let updatedCompareData = {year:selectedYear,quarters:compareData.selectedQuarter,months:compareData.selectedMonth,weeks:compareData.selectedWeek}
                dataToBeDisplay.push(getPieData(isProjectDetailsRequested,updatedCompareData,employeeData))
            }
        }
    }
    console.log("the data to be display ", dataToBeDisplay)
    return dataToBeDisplay;
}

const getPieData = (isProjectDetailsRequested, compareData, employeeData)=>{
    let data ;
    if(isProjectDetailsRequested){
        data =   getTotalHoursOfSpecificProject(compareData, employeeData);
    }
    else{
        data =   getTotalHoursOfSpecificDepartment(compareData, employeeData);
    }
    let labelInfo = getLabelInfo(compareData);
    return {data:data, labelInfo: labelInfo} ;
}
const getTotalHoursOfSpecificProject = (compareData, employeeData) => {
    let pieData = [];
    let totalEmployees = [];
    let fteEmployeeHours = 0, contEmployeeHours = 0;
    projectsList.map(project => {
        let pieDataForSpecificProject = {name: project};
        let projectInfo = employeeData[project];
        let totalHours = 0;
        projectInfo = getPeriodData(projectInfo, compareData);
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
const getTotalHoursOfSpecificDepartment = (compareData, employeeData) =>{
    var pieData = [];
    let totalEmployees = [];
    let fteEmployeeHours = 0, contEmployeeHours = 0;
    departmentList.map(dept => {
        let pieDataForSpecificDept = {name: dept};
        let deptInfo = employeeData[dept];
        let totalHours = 0;
        deptInfo = getPeriodData( deptInfo, compareData);
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
const  getPeriodData = ( deptInfo, compareDataInfo)=>{

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
            if(updatedInfoForWeeks.length > 0){
                updatedDeptInfo = updatedInfoForWeeks;
            }

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

const getLabelInfo = (compareData)=>{
    let labelInfo = "";

    if(compareData.year !== "")
    {
        compareData.year.split("-").forEach(year =>{ labelInfo += year +"/"})
    }
    console.log("the label info is ", labelInfo);
    if(compareData.quarters !== "")
    {
        compareData.quarters.split("-").forEach(quarter =>{ labelInfo += quarter +"/"})
    }
    console.log("the label info is ", labelInfo);
    if(compareData.months !== "")
    {
        compareData.months.split("-").forEach(month =>{ labelInfo += month +"/"})
    }
    console.log("the label info is ", labelInfo);
    if(compareData.weeks !== "")
    {
        compareData.weeks.split("-").forEach(week =>{ labelInfo += week +"/"})
    }
    console.log("the label info is ", labelInfo);
    return labelInfo;
}
const  getLatestMonthInCurrentYearFromTheEmployeeData = (employeeData) => {

    let allEmployees = [];
    let latestMonth = 0;
    for(let projOrDept in employeeData){
        allEmployees =  allEmployees.concat( employeeData[projOrDept] );
    }
    allEmployees = allEmployees.filter( emp => emp.date_year === new Date().getFullYear())
    allEmployees.forEach( emp => {
        latestMonth = emp.month > latestMonth ? emp.month : latestMonth ;

    })
    return latestMonth ;
}