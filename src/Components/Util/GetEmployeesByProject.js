export const EmployeesByProject  = (projectName, data) =>{
    console.log("the project name is ",projectName)
   // projectName = "ECOPETROL - Work-Order # 1";
    return data.filter(employee => employee.project.toLowerCase().includes(projectName.toLowerCase()) )
}

export const EmployeesByDepartment  = (departmentName, data) =>{
    return data.filter(employee => (employee.department.toLowerCase()  === departmentName.toLowerCase()  && ( employee.project === "0" || employee.project === "Other Technical"  || employee.project === "NonBillable - Other Tech") ))
}
export const EmployeesById = (employeeId,data) =>{
    return data.filter(employee => employee.class == employeeId)
}
