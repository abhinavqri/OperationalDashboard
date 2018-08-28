import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import {NavLink} from "react-router-dom";
import { bootstrap } from 'bootstrap';
import { Button, Collapse  } from 'reactstrap';
import '../../Styles/Header.css';
import DisplayEmployee from "../DisplayEmployee/DisplayEmployee";
import {totalFTEData,totalContData } from '../Util/TotalEmployees';
import { calculateEmployeeHours } from '../Util/CalculateIndividualEmployeeTotalHours';

export default class DisplayProjectorDepartmentEmployeeDetails extends React.Component{

    constructor(props){
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state ={

            collapse: false

        }

    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {

         let employeeHours = calculateEmployeeHours(this.props.filteredEmployees);

        let updatedEmployees =  Array.from(employeeHours).map( empArray => empArray[1] );

        let fteEmployees = totalFTEData(updatedEmployees).reverse().map(employee => <DisplayEmployee styling = { "primary" }  employee={employee}  />);
        let contEmployees = totalContData(updatedEmployees).reverse().map(employee => <DisplayEmployee styling = { "danger" }   employee={employee}   />);

        return (
            <div className="tableList">
                <p className="alert alert-warning" role="alert"> Employee Count : <span className="badge badge-info"> { fteEmployees.length + contEmployees.length  }  </span>  </p>
                <table className="table table-dark">
                    <thead >
                    <tr>
                        <th scope="col">Class</th>
                        <th scope="col">Name</th>
                        <th scope="col">Home Department </th>
                        <th scope="col"> Project </th>
                        <th scope="col"> Man Hours </th>


                        {/*<th scope="col">Percentage</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                       { fteEmployees }
                       {contEmployees }
                    </tbody>
                </table>
            </div>

        );
    }
}
