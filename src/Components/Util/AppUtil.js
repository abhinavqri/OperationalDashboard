export const getLatestMonthInCurrentYearFromTheEmployeeData = (employeeData) => {
     console.log("app util app", employeeData);
    let allEmployees = [];
    let latestMonth = 0;
    for(let projOrDept in employeeData){
        allEmployees =  allEmployees.concat( employeeData[projOrDept] );
    }
    console.log("allEmployees app util app", allEmployees);
    allEmployees = allEmployees.filter( emp => emp.date_year === new Date().getFullYear())
    allEmployees.forEach( emp => {
        latestMonth = emp.month > latestMonth ? emp.month : latestMonth ;

    })
    return latestMonth ;
}

export const calculateCurrentMonthHours = (employeeData) => {
    let currentMonth = getLatestMonthInCurrentYearFromTheEmployeeData(employeeData)
    let currentMonthHours = 0;
    for(let projOrDept in employeeData  ){
        currentMonthHours += getCurrentMonthHoursOfSepcificProjOrDept( employeeData[projOrDept], currentMonth );
    }

    console.log("currentMonthHours currentMonthHours in app util",currentMonthHours)
    return currentMonthHours;

};



export const calculatePreviousMonthHours = (employeeData) => {

    let previousMonth = getLatestMonthInCurrentYearFromTheEmployeeData(employeeData) - 1;
    let previousMonthHours = 0;
    for(let projOrDept in employeeData  ){
        previousMonthHours += getCurrentMonthHoursOfSepcificProjOrDept( employeeData[projOrDept], previousMonth );
    }
    return previousMonthHours;

};

const getCurrentMonthHoursOfSepcificProjOrDept = (employeeData, month) => {
    console.log("employeeeeeeeeeeee dataa",employeeData)
    let selectedMonthHours = 0;
    let employeesInSelectedMonth = employeeData.filter(emp => emp.date_year === new Date().getFullYear()).filter(emp => Number(emp.month) === Number(month)).forEach( emp => {

        selectedMonthHours += emp.hours;

    } );
    console.log("selectedMonthHours selectedMonthHours",selectedMonthHours);
    return selectedMonthHours;
}

const getPreviousMonthHoursOfSepcificProjOrDept = (employeeData, month) => {
    console.log("employeeeeeeeeeeee dataa",employeeData)
    let selectedMonthHours = 0;
    let employeesInSelectedMonth = employeeData.filter(emp => emp.date_year === new Date().getFullYear()).filter(emp => Number(emp.month) === Number(month)).forEach( emp => {

        selectedMonthHours += emp.hours;

    } );
    console.log("selectedMonthHours selectedMonthHours",selectedMonthHours);
    return selectedMonthHours;
}