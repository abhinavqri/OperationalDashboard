import React  from 'react';
import '../../Styles/SearchEmployee_SideBar.css';

export default class Department_SideBar extends React.Component {
    constructor(props){
        super(props);
        this.displaySpecificDepartmentDetails = this.displaySpecificDepartmentDetails.bind(this);
        this.displayAllDepartments = this.displayAllDepartments.bind(this);

    }
    displaySpecificDepartmentDetails(event){

        this.props.specificDepartment(event.target.name);
    }

    displayAllDepartments(event){
        this.props.allDepartments();
    }
    render() {
        return (
            <div className="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Example Pages">
                <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse"  data-target="#collapseDepartments">
                    <i className="fa fa-fw fa-quora"></i>
                    <span  className="nav-link-text departmentsMainHeading" name="allDepartments"  onClick={ this.displayAllDepartments} value="Departments" > Non - Billable </span>
                </a>
                <ul className="sidenav-second-level collapse" id="collapseDepartments">
                    <li><input type="button" className="searchDepButton" name= "corporate" value="CORPORATE"  onClick={this.displaySpecificDepartmentDetails} /> </li>
                    <li><input type="button" className="searchDepButton" name= "pops" value="POPS" onClick={this.displaySpecificDepartmentDetails} />  </li>
                    <li><input type="button" className="searchDepButton" name= "it" value="IT"  onClick={this.displaySpecificDepartmentDetails} />  </li>
                    <li><input type="button" className="searchDepButton" name= "technology" value="TECHNICAL"  onClick={this.displaySpecificDepartmentDetails} />  </li>
                    <li><input type="button" className="searchDepButton" name= "finance" value="FINANCE"  onClick={this.displaySpecificDepartmentDetails} />  </li>
                    <li><input type="button" className="searchDepButton" name= "qanal" value="Q ANALYTICS"  onClick={this.displaySpecificDepartmentDetails} />  </li>
                    <li><input type="button" className="searchDepButton" name= "businessdevelopement" value="BUSINESS DEVELOPMENT"  onClick={this.displaySpecificDepartmentDetails} />  </li>
                    <li><input type="button" className="searchDepButton" name= "qtech" value="Q TECH"  onClick={this.displaySpecificDepartmentDetails} />  </li>
                </ul>
            </div>

        );
    }
}
