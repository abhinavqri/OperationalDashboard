import React, { Component } from 'react';
import  MainPageComponent  from '../MainPageComponent/MainPageComponent';
import  Header  from './Header';
import LoadData from "../../Actions/EmployeeDetailsAction";
import LoadStatusData from "../../Actions/EmployeeStatusDetailsAction";
import {connect} from "react-redux";

class MainApp extends Component {

    constructor(props){
        super(props)
        this.state = {
            searchedEmployee: "",
        }
        this.selectedEmployee = this.selectedEmployee.bind(this);
    }
    selectedEmployee(employeeId){
      this.setState({searchedEmployee:employeeId})
    }

    componentDidMount(){
        var {dispatch} = this.props;
        dispatch(LoadData());
        dispatch(LoadStatusData());

    }

    render() {
        return (
            <div className="App">
                <Header selectedEmployee={this.selectedEmployee} />
                <MainPageComponent selectedEmployee = { this.state.searchedEmployee } />
            </div>
        );
    }
}


export default connect()(MainApp);
