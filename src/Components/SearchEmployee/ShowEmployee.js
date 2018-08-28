import React from 'react';
import '../../Styles/ShowEmployees.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import {NavLink} from "react-router-dom";


var ShowEmployees = (props)=>{

    return (
        <div className="shake-little showEmployeesDiv" animationIn="bounceInTop" animationInDelay={0.4}  isVisible={true}>
            <a className="showEmployees"> Showing Employees </a>
        </div>
    );
}

ShowEmployees.propTypes = {

    emp: PropTypes.object.isRequired
};

export default ShowEmployees;