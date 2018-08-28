import React from 'react';
import {NavItem, NavLink } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../../Styles/SearchEmployee.css';


export default class SearchEmployee extends React.Component{

    render() {
        return (
            <div className="shake-little searchEmployeesDiv">
                <input type="text" className="searchEmployee" placeholder="Enter employee's name"/>
            </div>
        );
    }
}