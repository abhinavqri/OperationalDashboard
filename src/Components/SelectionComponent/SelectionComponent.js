import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import {NavLink} from "react-router-dom";
import { bootstrap } from 'bootstrap';
import '../../Styles/SelectionComponent.css';
import {MONTHS,QUARTERS,WEEKS} from '../Util/GetMonthsByQuarter';


export default class SelectionComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = initialData;
        this.handleYear = this.handleYear.bind(this);
        this.handleQuarter = this.handleQuarter.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.handlePeriod = this.handlePeriod.bind(this);
        this.showPeriodData = this.showPeriodData.bind(this);
        this.handleWeek = this.handleWeek.bind(this);
        this.showYearToDateData = this.showYearToDateData.bind(this);
    }
    handleYear(event){
        this.setState({selectedYear:event.target.value});
    }
    handleQuarter(event){
        this.setState({selectedQuarter:event.target.value,selectedMonth:"",selectedWeek:""})
    }
    handleMonth(event){
            this.setState({selectedMonth:event.target.value,selectedQuarter:""})
    }
    handleWeek(event){
        this.setState({selectedWeek:event.target.value,selectedQuarter:""})
    }
    showPeriodData(){
        // alert(JSON.stringify(this.state));
         this.props.displayPeriodData({year:this.state.selectedYear, month:this.state.selectedMonth,
                                       quarter:this.state.selectedQuarter, week:this.state.selectedWeek})
    }

    showYearToDateData(){
      this.props.displayYearToDateData();
    }


    handlePeriod(event){
        let selectedPeriod = event.target.value;
        let periodLabel = ""
        if(selectedPeriod === "Quarterly"){
              periodLabel = "Quarter"
        }
        if(selectedPeriod === "Monthly"){
            periodLabel = "Month"
        }
        if(selectedPeriod === "Weekly"){
            periodLabel = "Week"
        }
        this.setState({selectedPeriod:selectedPeriod,periodLabel:periodLabel,selectedMonth:"",selectedQuarter:"",selectedWeek:""})
    }
    render() {
        let data;
        let func;
        let dropDefaultValue;
        if(this.state.selectedPeriod === "Quarterly"){
        data  = QUARTERS.map((quarter)=><DisplaySelectedPeriodDetails value={quarter} />);
        func = this.handleQuarter;
            }
        if(this.state.selectedPeriod === "Monthly"){
            data  = MONTHS.map((quarter)=><DisplaySelectedPeriodDetails value={quarter} />);
            func = this.handleMonth;
            }
        if(this.state.selectedPeriod === "Weekly"){
                data  = WEEKS.map((quarter)=><DisplaySelectedPeriodDetails value={quarter} />);
                func = this.handleWeek;
            }
        return (

            <div className="container-fluid  selectComponent slide-fwd-center">
                <div className="selectYear  mr-3 slide-in-left">
                    <span  class="fa fa-2x fa-calendar"></span>
                    <div class="dropdown selectOptionsByDropDown">
                        <select class="form-control h-75" onChange={this.handleYear}>
                        <option>-- Select Year --</option>
                            <option>2017</option>
                            <option>2018</option>
                        </select> 
                    </div>
                </div>

                <div className="selectPeriod mr-3 slide-in-left-duration-short">
                    <span class="fa fa-2x fa-calendar-check-o "></span>
                    <div class="dropdown selectOptionsByDropDown">
                        <select class="form-control h-75" onChange={this.handlePeriod}>
                        <option>-- Select Period --</option>
                            <option>Quarterly</option>
                            <option>Monthly</option>
                            <option>Weekly</option>
                        </select>
                    </div>
                </div>

                <div className="selectPeriod slide-in-left-duration-medium">
                    <span className="fa fa-2x fa-calendar-times-o"></span>
                    <div class="dropdown selectOptionsByDropDown">
                    <select class="form-control h-75"  onChange={func}>
                    <option>-- Select {this.state.periodLabel} --</option>
                            {data}
                        </select>
                    </div>
                </div>
                {this.state.selectedPeriod === "Weekly"?(<div className="selectYear slide-in-left-duration-long">
                    <span className="fa fa-2x fa-calendar-times-o"> </span>
                    <div class="dropdown selectOptionsByDropDown">
                        <select class="form-control h-75"  onChange={this.handleMonth}>
                        <option>--SELECT MONTH--</option>
                            {MONTHS.map((month)=> <DisplaySelectedPeriodDetails value={month} />)}
                        </select> 
                    </div>
                </div>):null}
                <div>
                    <button type="button" className="btn btn-warning fa fa-2x fa-pie-chart selectionComponentCheckResultsButtons"  onClick={this.showPeriodData}> Check Results ! </button>
                </div>

                <div>
                    <button type="button" className="btn btn-warning yearToDate fa fa-2x fa-bar-chart selectionComponentCheckResultsButtons"  onClick={this.showYearToDateData}> Year to Date  </button>
                </div>

                </div>
                

        );
    }
}
const DisplaySelectedPeriodDetails = ({value}) =>{
    return <option>{value}</option>
}

const initialData= {
    selectedYear : "",
    selectedPeriod : "",
    selectedMonth : "",
    selectedWeek : "",
    selectedQuarter : "",
    selectedPeriodDetails :"",
    periodLabel : ""
}