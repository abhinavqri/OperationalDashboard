

export const calculateEmployeeHours = (employeeData) => {

    let employeeHours = new Map();
    employeeData.forEach((emp2)=>{
        let emp = Object.assign({}, emp2);
        if(employeeHours.has(emp.class)){
            let emp1 = employeeHours.get(emp.class)
            emp1.hours+= emp.hours;
            employeeHours.set(emp.class,emp1);
        }
        else{
            employeeHours.set(emp.class,emp);
        }
    });
    return employeeHours;
}
