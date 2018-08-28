import {departmentsWithDummyData, projectsWithDummyData, allDepartmentsWithEmployeeCount, allProjectsWithEmployeeCount} from '../Constants/AppConstants'
export const GetStackedData = (isProjectDetailsRequested, data) =>{
    if(isProjectDetailsRequested){
        let monthlyDataWithProjects =  {1:Object.assign({  },projectsWithDummyData),2:Object.assign({  },projectsWithDummyData),3:Object.assign({  },projectsWithDummyData),4:Object.assign({  },projectsWithDummyData),5:Object.assign({  },projectsWithDummyData),6:Object.assign({  },projectsWithDummyData),7:Object.assign({  },projectsWithDummyData),8:Object.assign({  },projectsWithDummyData),9:Object.assign({  },projectsWithDummyData),10:Object.assign({  },projectsWithDummyData),11:Object.assign({  },projectsWithDummyData),12:Object.assign({  },projectsWithDummyData)}
        return deriveStackedData(monthlyDataWithProjects, allProjectsWithEmployeeCount(), data, true);
    }
    else{
        let monthlyDataWithDepartment =  {1:Object.assign({  },departmentsWithDummyData),2:Object.assign({  },departmentsWithDummyData),3:Object.assign({  },departmentsWithDummyData),4:Object.assign({  },departmentsWithDummyData),5:Object.assign({  },departmentsWithDummyData),6:Object.assign({  },departmentsWithDummyData),7:Object.assign({  },departmentsWithDummyData),8:Object.assign({  },departmentsWithDummyData),9:Object.assign({  },departmentsWithDummyData),10:Object.assign({  },departmentsWithDummyData),11:Object.assign({  },departmentsWithDummyData),12:Object.assign({  },departmentsWithDummyData)}
        return deriveStackedData(monthlyDataWithDepartment, allDepartmentsWithEmployeeCount(), data, false);
    }
}

const deriveStackedData = (depOrProjMonthlyData, depOrProjWithEmployeeCount, data, isProjectDetailsRequested) =>{

    let monthlyData = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]};
    let stackedData = [];
    for(let month in monthlyData){
        monthlyData[month] = monthlyData[month].concat(data.filter(emp => Number(emp.month) === Number(month)));
    }

    for(let month in monthlyData){
        let currentMonthData = monthlyData[month];
        for(let deptOrProjinMonth in depOrProjMonthlyData[month]){
            depOrProjMonthlyData[month][deptOrProjinMonth] = depOrProjMonthlyData[month][deptOrProjinMonth].concat(currentMonthData.filter(emp => {

              if(isProjectDetailsRequested){

                  return   emp.project.toLowerCase() === deptOrProjinMonth.toLowerCase()
              }
                else{
                  return   emp.homeDepartment.toLowerCase() === deptOrProjinMonth.toLowerCase()
              }
            }));
            }
    }

    for(let projectOrDept in depOrProjWithEmployeeCount){
        for(let month in depOrProjMonthlyData){
            (depOrProjMonthlyData[month][projectOrDept]).forEach(emp =>{
                depOrProjWithEmployeeCount[projectOrDept][month-1] = depOrProjWithEmployeeCount[projectOrDept][month-1]+ emp.hours;
            })
        }
    }
    for(let projOrDept in depOrProjWithEmployeeCount){
        stackedData.push({name:projOrDept,data:depOrProjWithEmployeeCount[projOrDept]});
    }

    return stackedData;

}