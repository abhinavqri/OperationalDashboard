import React  from 'react';

import '../../Styles/QuantumTech.css';




export default class QT extends React.Component {

    render() {
        return (
            <div className="nav-item" data-toggle="tooltip" data-placement="right" title="" >
                <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" data-target="#qtProjects" >
                    <i className="fa fa-fw fa-file"></i>
                    <span className="nav-link-text">Quantum Technologies</span>
                </a>
                <ul className="sidenav-third-level collapse" id="qtProjects">
                    <li><input type="button" className=" searchEmpButton" name= "searchEmp_dept" value="QT Automation"  onClick={this.displayEmployeeInfo} /> </li>
                    <li><input type="button" className="searchEmpButton" name= "searchEmp_proj" value="Quantum Technologies"  onClick={this.displayEmployeeInfo} />  </li>
                    <li><input type="button" className="searchEmpButton" name= "searchEmp_jobType" value="QT Innovations"  onClick={this.displayEmployeeInfo} />  </li>
                    <li><input type="button" className="searchEmpButton" name= "searchEmp_jobType" value="QT Execution"  onClick={this.displayEmployeeInfo} />  </li>
                    <li><input type="button" className="searchEmpButton" name= "searchEmp_jobType" value="QT Development"  onClick={this.displayEmployeeInfo} />  </li>
                </ul>
            </div>

        );
    }
}
