import React from "react";


class  DisplayEmployee extends React.Component {
    constructor(props) {
        super(props);
    }
    displaySpecificEmployeeDetails(employeeId){
        this.props.displaySpecificEmployeeDetails(employeeId)
    }
    render(){



        return (
            <tr className="slide-in-elliptic-top-fwd ">
                <button className={"employeeClassButton  btn btn-" + this.props.styling}  scope="row" onClick = {()=> this.displaySpecificEmployeeDetails(this.props.employee.class)} >{this.props.employee.class}</button>
                <td> {this.props.employee.employeeName} </td>
                <td> {this.props.employee.homeDepartment}    </td>
                <td> { this.props.employee.project } </td>
                <td> {this.props.employee.hours.toFixed(0)} </td>
                {/*<td> { (this.props.employee.hours / 160).toFixed(2) } </td>*/}
            </tr>

        );
    }
}

export default DisplayEmployee;