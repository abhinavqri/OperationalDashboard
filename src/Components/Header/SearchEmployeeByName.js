import React,{Component} from "react";
import { data } from '../Data/dataTwo';
import { connect } from 'react-redux';
import '../../Styles/SearchEmployeeByName.css'


class SearchEmployeeByName extends Component {

    constructor(props){
        super(props)

        this.state = {
            searchEmployeeName : "",
            matchedEmployees : [],
            isBackButtonDisabled:true
        }

        this.UpdateName = this.UpdateName.bind(this);
        this.getDetails = this.getDetails.bind(this);

    }



    UpdateName(event) {
        let searchEmployeeName = event.target.value;
        let matchedEmployeeNames = [];
        let employeeData = this.props.employeeData;
        let isEmployeeAvailable = false;
        if (searchEmployeeName) {
            searchEmployeeName = searchEmployeeName.toLocaleLowerCase();
            employeeData.forEach((employee) => {
                if (employee.employeeName.toLocaleLowerCase().match(searchEmployeeName) != undefined ? employee.employeeName.toLocaleLowerCase().match(searchEmployeeName).index >= 0 : false) {
                    matchedEmployeeNames.forEach( matchedEmp => {

                        if(matchedEmp.class === employee.class){
                            isEmployeeAvailable = true;
                        }
                        else{
                            isEmployeeAvailable = false;
                        }

                    } )
                    if(!isEmployeeAvailable)
                    {
                        matchedEmployeeNames.push(employee);
                    }

                }
            });
        }
        this.setState( { searchEmployeeName: searchEmployeeName, matchedEmployees: matchedEmployeeNames, isBackButtonEnabled:true } )
    }

    getDetails(event){
        this.setState( { searchEmployeeName: "", matchedEmployees: [], isBackButtonEnabled:true } )
        this.props.selectedEmployee(event.target.value);
    }
    render() {


        var matchedEmployees = this.state.matchedEmployees.map( emp => {
            return <div> <button className="btn btn-primary btn-outline-warning font-weight-normal empAfterSearchEmployeeButton" value={emp.class} onClick={this.getDetails} isBackButtonEnabled = {this.state.isBackButtonEnabled } > { emp.employeeName}  </button> </div>
        } )
        return (
            <div className="searchEmployeeByName">
                <div>
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" value={this.state.searchEmployeeName} onChange={this.UpdateName}/>
                </div>
                { matchedEmployees }
            </div>
        );
    }
}

const mapStateToProps = (state)=>{

    return { employeeData: state.data}

};
export default connect(mapStateToProps)(SearchEmployeeByName);


