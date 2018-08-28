
export const EmployeeCountByProject = (data) =>{



    var weekDetails = {};
    var employeeWorkingHours = WeekDataInMap();
    var employeeCount = WeekDataInMap();
     data.forEach(employee=>{

       if(employee.month===1 && employee["hours"]>0){
         employeeWorkingHours.set("jan",employeeWorkingHours.get("jan")+employee["hours"])
         employeeCount.set("jan",employeeCount.get("jan")+1);
       }
        if(employee.month===2 && employee["hours"]>0){
         employeeWorkingHours.set("feb",employeeWorkingHours.get("feb")+employee["hours"])
         employeeCount.set("feb",employeeCount.get("feb")+1);
       }
        if(employee.month===3 && employee["hours"]>0){
         employeeWorkingHours.set("mar",employeeWorkingHours.get("mar")+employee["hours"])
         employeeCount.set("mar",employeeCount.get("mar")+1);
       }
        if(employee.month===4 && employee["hours"]>0){
         employeeWorkingHours.set("apr",employeeWorkingHours.get("apr")+employee["hours"])
         employeeCount.set("apr",employeeCount.get("apr")+1);
       }
        if(employee.month===5 && employee["hours"]>0){
         employeeWorkingHours.set("may",employeeWorkingHours.get("may")+employee["hours"])
         employeeCount.set("may",employeeCount.get("may")+1);
       }
        if(employee.month===6 && employee["hours"]>0){
         employeeWorkingHours.set("jun",employeeWorkingHours.get("jun")+employee["hours"])
         employeeCount.set("jun",employeeCount.get("jun")+1);
       }
         if(employee.month===7 && employee["hours"]>0){
             employeeWorkingHours.set("jul",employeeWorkingHours.get("jul")+employee["hours"])
             employeeCount.set("jul",employeeCount.get("jul")+1);
         }
         if(employee.month===8 && employee["hours"]>0){

             employeeWorkingHours.set("aug",employeeWorkingHours.get("aug")+employee["hours"])
             employeeCount.set("aug",employeeCount.get("aug")+1);
         }
         if(employee.month===9 && employee["hours"]>0){
             employeeWorkingHours.set("sep",employeeWorkingHours.get("sep")+employee["hours"])
             employeeCount.set("sep",employeeCount.get("sep")+1);
         }
         if(employee.month===10 && employee["hours"]>0){
             employeeWorkingHours.set("oct",employeeWorkingHours.get("oct")+employee["hours"])
             employeeCount.set("oct",employeeCount.get("oct")+1);
         }
         if(employee.month===11 && employee["hours"]>0){
             employeeWorkingHours.set("nov",employeeWorkingHours.get("nov")+employee["hours"])
             employeeCount.set("nov",employeeCount.get("nov")+1);
         }
         if(employee.month===12 && employee["hours"]>0){
             employeeWorkingHours.set("dec",employeeWorkingHours.get("dec")+employee["hours"])
             employeeCount.set("dec",employeeCount.get("dec")+1);
         }
     })


     var totalWorkingHours = [];
     for (var value of employeeWorkingHours.values()) {
       totalWorkingHours.push(value);
     }
     weekDetails.totalWorkingHours = totalWorkingHours;
     weekDetails.totalEmployees = employeeCount;
     return weekDetails
}

const WeekDataInMap =()=>{
  let map = new Map([["jan",0],["feb",0],["mar",0],["apr",0],["may",0],["jun",0],["jul",0],["aug",0],["sep",0],["oct",0],["nov",0],["dec",0]]);
  return map;
}
