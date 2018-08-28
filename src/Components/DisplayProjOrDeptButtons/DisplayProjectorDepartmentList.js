import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import {NavLink} from "react-router-dom";
import { bootstrap } from 'bootstrap';
import '../../Styles/CommonStylings.css';
import {departmentList, projectsList} from '../Constants/AppConstants';


import DisplayProjectorDepartmentEmployeeDetails from "../EmployeeDetails/DisplayProjectorDepartmentEmployeeDetails";




export default class DisplayProjectorDepartmentList extends React.Component{
    constructor(props){
        super(props)

        this.state = {

            isEmployeeDetailsHidden: true,
            isHideDetailsButtonDisabled: true,
            selectedProjorDepartment : ''
        }

        this.hideDetails = this.hideDetails.bind(this);
        this.displayProjectsorDepartmentEmployees = this.displayProjectsorDepartmentEmployees.bind(this);

    }

    hideDetails(){

        this.setState({ isEmployeeDetailsHidden: true,isHideDetailsButtonDisabled: true  });

    }

    displayProjectsorDepartmentEmployees( projOrDeptName ){
        console.log("the displayProjectsorDepartmentEmployees",projOrDeptName)
        this.setState({
                        selectedProjorDepartment: projOrDeptName,
                        isEmployeeDetailsHidden: false,
                        isHideDetailsButtonDisabled: false  })
    }



    render() {
        let projOrDepartmentListButtons;
        let empData = this.props.employeesData;



        console.log("emp data is", empData);
        let employeesOfSpecificProjectorDept = [];
       if(this.props.isProjectDetailsRequested){

            projOrDepartmentListButtons = projectsList.map( proj => { return <button onClick={ ()=> { this.displayProjectsorDepartmentEmployees(proj)  }} className="btn btn-success btn-lg  m-4"> {proj} </button> } )

           if( !this.state.isEmployeeDetailsHidden ){
               employeesOfSpecificProjectorDept = empData.filter( data => data.name.toLowerCase() === this.state.selectedProjorDepartment.toLowerCase()  )[0].employees;
           }
       }

       else {
            projOrDepartmentListButtons = departmentList.map( dept => { return <button onClick={ ()=> { this.displayProjectsorDepartmentEmployees(dept)  }} className="btn btn-primary m-4"> {dept} </button> } )
           if( !this.state.isEmployeeDetailsHidden ){
               employeesOfSpecificProjectorDept = empData.filter( data => data.name.toLowerCase() === this.state.selectedProjorDepartment.toLowerCase()  )[0].employees;
           }

       }



       console.log("employeesOfSpecificProjectorDept employeesOfSpecificProjectorDept",employeesOfSpecificProjectorDept);


        return (
            <div className="container-fluid d-table">
               <div>  { projOrDepartmentListButtons } </div>
                <button className="btn  btn-warning btn-lg "  onClick={ this.hideDetails }  disabled={this.state.isHideDetailsButtonDisabled} >Hide Employee Details</button>
                { this.state.isEmployeeDetailsHidden  ?  null :  <DisplayProjectorDepartmentEmployeeDetails  filteredEmployees={ employeesOfSpecificProjectorDept } />  }
            </div>

        );
    }
}
