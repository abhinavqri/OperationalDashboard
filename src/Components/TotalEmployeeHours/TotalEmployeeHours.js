import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import {NavLink} from "react-router-dom";
import { bootstrap } from 'bootstrap';
import "../../Styles/TotalEmployeeHours.css";




export default class TotalEmployeeHours extends React.Component{

    constructor(props){
        super(props)

    }


    render() {

        let { fteEmployeeHours, contEmployeeHours }  =  this.props ;


        return (
            <div className=' scale-in-hot-center employeeHoursDetails scale-in-center'>
                <p> FTE Employee Hours : { fteEmployeeHours.toLocaleString() } hrs -- {((fteEmployeeHours/(fteEmployeeHours + contEmployeeHours))*100).toFixed(2)}% </p>
                <p> Cont Employee Hours : { contEmployeeHours.toLocaleString() } hrs -- {((contEmployeeHours/(fteEmployeeHours + contEmployeeHours))*100).toFixed(2)}%  </p>
                <p> Total Employee Hours : { (fteEmployeeHours + contEmployeeHours).toLocaleString() } hrs</p>
            </div>

        );
    }
}
