import React from 'react';

import 'font-awesome/css/font-awesome.min.css';

import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import '../../Styles/WelcomeDetails.css';



export default class WelcomeDetails extends React.Component{

    render() {
        return (
            <div className="welcomeDetails  ">
               <h1>  WELCOME TO QRI </h1>
                <h5> QRI’s Number 1 principle is to create the maximum value for our clients. The estimated value generated to
                    date for our clients has been in excess of $75 billion USD. The prevailing part of this value stems from savings
                    in CAPEX/OPEX, reserves additions, and most importantly, helping our clients achieve higher production levels
                    relative to their expectations. </h5>
            </div>

        );
    }
}