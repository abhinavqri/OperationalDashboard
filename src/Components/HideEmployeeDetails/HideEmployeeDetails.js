import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import {NavLink} from "react-router-dom";
import { bootstrap } from 'bootstrap';
import { Button, Collapse  } from 'reactstrap';
import '../../Styles/Header.css';

export default class HideEmployeeDetails extends React.Component{

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
        return (
            <div>

                <Button className="collapseToggleButton" color="primary" style={{ fontSize: '1.4rem' }} onClick={this.toggle} >Hide Employee Details</Button>
                <Collapse isOpen={this.state.collapse}>
                    <div className="container-fluid compareComponent col-md-12" isOpen={this.state.collapse}>

                        <div>
                            <table>
                                <tr>
                                    <td>what is happening</td>
                                    <td>what is happening</td>
                                    <td>what is happening</td>
                                    <td>what is happening</td>
                                </tr>
                            </table>
                        </div>

                    </div>
                </Collapse>
            </div>

        );
    }
}
