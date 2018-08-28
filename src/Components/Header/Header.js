import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import {NavLink} from "react-router-dom";
import { bootstrap } from 'bootstrap';
import '../../Styles/Header.css';
import SearchEmployeeByName from './SearchEmployeeByName';



export default class Header extends React.Component{

    constructor(props){
        super(props)
        this.selectedEmployee = this.selectedEmployee.bind(this);
    }
    selectedEmployee(employeeId){
        this.props.selectedEmployee(employeeId);
    }

    render() {
        return (
            <div>
                <nav className="navbar  sticky-top  navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand qriBrand mr-auto"  href="/">
                            <img alt="Brand" src={require('../../Images/QRI-Brand.png')} width="100px" height="50px"/>
                        </a>

                        <Animated className=" animated navbar-header mx-auto  slide-in-elliptic-right-bck">
                            <h2> QRI - OPERATIONAL DASHBOARD</h2>
                        </Animated>
                        <SearchEmployeeByName selectedEmployee = {this.selectedEmployee} />
                    </div>
                </nav>
            </div>

        );
    }
}
