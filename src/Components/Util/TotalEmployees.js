
export const totalFTEData = (data) =>{
  var totalFTE = data.filter(emp => {
    if((emp.class>999 && emp.class<2000) || (emp.class>2999 && emp.class<4000)){
      return emp;
    }
  });
  return totalFTE;
}


export const totalContData = (data) =>{
  var totalCont = data.filter(emp => {
    if(!((emp.class>999 && emp.class<2000) || (emp.class>2999 && emp.class<4000))){
      return emp;
    }
  });
  return totalCont;
}
export const getFteTotalHoursForSpecificMonth=(month, empData)=>{
  let fteEmployees = totalFTEData(empData);
  let totalHours = 0;
  fteEmployees.forEach(emp =>{
    totalHours+=emp[month];
  })
  return totalHours;
}
export const getContTotalHoursForSpecificMonth=(month,empData)=>{
  let contEmployees = totalContData(empData);
  let totalHours = 0;
  contEmployees.forEach(emp =>{
    totalHours+=emp[month];
  })
  return totalHours;
}
