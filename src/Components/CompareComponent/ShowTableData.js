import React from "react";
import {totalContData, totalFTEData} from "../Util/TotalEmployees";
import '../../Styles/ShowTableData.css'



export class  ShowTableData extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let pieChartData = this.props.pieChartData;
        let projectsOrDeptInfo = [];


        pieChartData[0].data.pieData.forEach(projeOrDep =>{
            let projOrDeptInfo = {projectOrDept:projeOrDep.name, currentYearInfo:projeOrDep.y};
            pieChartData[1].data.pieData.forEach(projeOrDep1 =>{
                if(projeOrDep1.name === projeOrDep.name){
                    projOrDeptInfo.previousYearInfo = projeOrDep1.y
                }
            })
            projectsOrDeptInfo.push(projOrDeptInfo);
        })

        console.log("12121212222222222222222222222 ", projectsOrDeptInfo)
        let displayData = projectsOrDeptInfo.map( data => <DisplayProjectOrDeptHours data={data} /> );

        return (
            <div className=" slide-in-fwd-center">
                <p className="alert alert-info alert-heading"> Man Hours and the Difference between the Selected Periods</p>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">Project Name</th>
                        <th scope="col">{pieChartData[0].labelInfo}</th>
                        <th scope="col">{pieChartData[1].labelInfo}</th>
                        <th scope="col"> Difference </th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayData}
                    </tbody>
                </table>
            </div>

        );
    }
}

export default ShowTableData;

const DisplayProjectOrDeptHours = ({data}) =>{
    return (
        <tr>
            <th scope="row">{data.projectOrDept}</th>
            <td> {data.currentYearInfo.toFixed(0)} hrs  </td>
            <td> {data.previousYearInfo.toFixed(0)} hrs</td>
            <td className="hoursDifference">  {(data.previousYearInfo - data.currentYearInfo).toFixed(0)} </td>
            <td> {(  data.previousYearInfo - data.currentYearInfo ) > 0 ? <i class="fa fa-arrow-up mr-2"></i> : <i class="fa fa-arrow-down mr-2"></i>  } </td>
        </tr>
    )
}