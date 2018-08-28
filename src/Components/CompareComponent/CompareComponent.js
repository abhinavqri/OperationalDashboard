import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Animated } from 'react-animated-css';
import { PropTypes } from 'prop-types';
import {NavLink} from "react-router-dom";
import { bootstrap } from 'bootstrap';
import '../../Styles/CompareComponent.css';
import { Button, Collapse  } from 'reactstrap'
import { initialPeriodData } from '../Util/SetUpInitialState';
import {getMonthlyDataDefaultValues,getMonthlyCheckBoxDisabled, getWeeklyDataDefaultValues,getQuarterlyDataDefaultValues, getQuarterlyCheckBoxDisabled} from '../Constants/AppConstants'



export default class CompareComponent extends React.Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { isError:false,collapse: false, selectedYear:"",selectedQuarter:"",selectedMonth:"",selectedWeek:"", isChecked:false, initialPeriodData ,
            weeklyCheckboxDisabled : false,
            quarterlyCheckBoxDisabled : getQuarterlyCheckBoxDisabled(),
            monthlyCheckBoxDisabled : getMonthlyCheckBoxDisabled()
        };
        // this.handleChange = this.handleChange.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.handleQuarter = this.handleQuarter.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleWeek = this.handleWeek.bind(this);
        this.showCompareData = this.showCompareData.bind(this);
    }

    /*  handleChange(event){
          this.setState({isChecked: !this.state.isChecked});


      }*/

    handleYear(event){

        let updatedSelectedYears = "";
        let selectedYearFromState = this.state.selectedYear;
        if(selectedYearFromState.includes(event.target.value)){
            updatedSelectedYears  = selectedYearFromState.replace(event.target.value,"").replace("-","");
        }else{
            updatedSelectedYears = this.state.selectedYear !== "" ? this.state.selectedYear + "-" + event.target.value : event.target.value ;
        }
        let initialPeriodData = this.state.initialPeriodData;
        initialPeriodData.quarterlyInfo = getQuarterlyDataDefaultValues();
        initialPeriodData.monthlyInfo = getMonthlyDataDefaultValues();
        initialPeriodData.weeklyInfo = getWeeklyDataDefaultValues();


        this.setState({selectedWeek:"",selectedQuarter:"",selectedMonth:"",initialPeriodData : initialPeriodData, selectedYear:updatedSelectedYears,quarterlyCheckBoxDisabled : getQuarterlyCheckBoxDisabled(),monthlyCheckBoxDisabled : getMonthlyCheckBoxDisabled(),weeklyCheckboxDisabled : false});

    }
    handleQuarter(event){

        let updatedSelectedQuarters ="" ;

        let monthlyData = getMonthlyDataDefaultValues();
        let weeklyData = getWeeklyDataDefaultValues();
        let initialPeriodDataFromState = this.state.initialPeriodData;
        initialPeriodDataFromState.monthlyInfo = monthlyData;
        initialPeriodDataFromState.weeklyInfo = weeklyData;
        let quarterData = initialPeriodDataFromState.quarterlyInfo;
        if( event.target.value === "q1" ){

            if(  initialPeriodDataFromState.quarterlyInfo.isQuarterOneChecked  ){
                initialPeriodDataFromState.quarterlyInfo.isQuarterOneChecked = false;
            }

            else{
                initialPeriodDataFromState.quarterlyInfo.isQuarterOneChecked = true;
            }


        }
        else if(event.target.value === "q2" ){

            if(  initialPeriodDataFromState.quarterlyInfo.isQuarterTwoChecked  ){
                initialPeriodDataFromState.quarterlyInfo.isQuarterTwoChecked = false;
            }

            else{
                initialPeriodDataFromState.quarterlyInfo.isQuarterTwoChecked = true;
            }


        }
        else if(event.target.value === "q3" ){

            if(  initialPeriodDataFromState.quarterlyInfo.isQuarterThreeChecked  ){
                initialPeriodDataFromState.quarterlyInfo.isQuarterThreeChecked = false;
            }

            else{
                initialPeriodDataFromState.quarterlyInfo.isQuarterThreeChecked = true;
            }



        }
        else if(event.target.value === "q4" ){

            if(  initialPeriodDataFromState.quarterlyInfo.isQuarterFourChecked  ){
                initialPeriodDataFromState.quarterlyInfo.isQuarterFourChecked = false;
            }

            else{
                initialPeriodDataFromState.quarterlyInfo.isQuarterFourChecked = true;
            }
        }
        else{

        }

        let quarterlyInfo = initialPeriodDataFromState.quarterlyInfo;
        let quarterlyCheckBoxDisabled = getQuarterlyCheckBoxDisabled();
        if(this.state.selectedYear.split("-").length  == 1){
            let count = 0;
            count += quarterlyInfo.isQuarterOneChecked ? 1 :0;
            count += quarterlyInfo.isQuarterTwoChecked ? 1 :0;
            count += quarterlyInfo.isQuarterThreeChecked ? 1 :0;
            count += quarterlyInfo.isQuarterFourChecked ? 1 :0;
            if(count == 3){
                quarterlyCheckBoxDisabled.isQuarterOneDisabled = quarterlyInfo.isQuarterOneChecked ? false : true;
                quarterlyCheckBoxDisabled.isQuarterTwoDisabled = quarterlyInfo.isQuarterTwoChecked ? false : true;
                quarterlyCheckBoxDisabled.isQuarterThreeDisabled = quarterlyInfo.isQuarterThreeChecked ? false : true;
                quarterlyCheckBoxDisabled.isQuarterFourDisabled = quarterlyInfo.isQuarterFourChecked ? false : true;
            }

        }

        if(quarterlyInfo.isQuarterOneChecked){
            updatedSelectedQuarters += updatedSelectedQuarters + "Q1";
        }
        if(quarterlyInfo.isQuarterTwoChecked){
            updatedSelectedQuarters += updatedSelectedQuarters == "" ? "Q2" : "-" + "Q2";
        }
        if(quarterlyInfo.isQuarterThreeChecked){
            updatedSelectedQuarters += updatedSelectedQuarters == "" ? "Q3" : "-" + "Q3";
        }
        if(quarterlyInfo.isQuarterFourChecked){
            updatedSelectedQuarters += updatedSelectedQuarters == "" ? "Q4" : "-" + "Q4";
        }

        // updatedSelectedQuarters = updatedSelectedQuarters.startsWith("-") ? updatedSelectedQuarters.substring(1,updatedSelectedQuarters.length): updatedSelectedQuarters;
        this.setState({quarterlyCheckBoxDisabled: quarterlyCheckBoxDisabled, selectedQuarter:updatedSelectedQuarters,selectedMonth:"",selectedWeek:"",initialPeriodData:initialPeriodDataFromState})
    }
    handleMonth(event){

        //let updatedSelectedMonths = this.state.selectedMonth !== "" ? this.state.selectedMonth + "-" + event.target.value : event.target.value ;
        let updatedSelectedMonths = "";
        let quarterlyData = getQuarterlyDataDefaultValues();
        let initialPeriodDataFromState = this.state.initialPeriodData;
        initialPeriodDataFromState.quarterlyInfo = quarterlyData;
        if( event.target.value === "jan" ){
            if(  initialPeriodDataFromState.monthlyInfo.isJanMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isJanMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isJanMonthChecked = true;
            }

        }
        else if(event.target.value === "feb" ){

            if(  initialPeriodDataFromState.monthlyInfo.isFebMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isFebMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isFebMonthChecked = true;
            }



        }
        else if(event.target.value === "mar" ){
            if(  initialPeriodDataFromState.monthlyInfo.isMarMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isMarMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isMarMonthChecked = true;
            }

        }
        else if(event.target.value === "apr" ){
            if(  initialPeriodDataFromState.monthlyInfo.isAprMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isAprMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isAprMonthChecked = true;
            }

        }
        else if(event.target.value === "may" ){
            if(  initialPeriodDataFromState.monthlyInfo.isMayMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isMayMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isMayMonthChecked = true;
            }

        }
        else if(event.target.value === "jun" ){
            if(  initialPeriodDataFromState.monthlyInfo.isJunMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isJunMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isJunMonthChecked = true;
            }

        }
        else if(event.target.value === "jul" ){
            if(  initialPeriodDataFromState.monthlyInfo.isJulMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isJulMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isJulMonthChecked = true;
            }

        }
        else if(event.target.value === "aug" ){
            if(  initialPeriodDataFromState.monthlyInfo.isAugMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isAugMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isAugMonthChecked = true;
            }

        }
        else if(event.target.value === "sep" ){
            if(  initialPeriodDataFromState.monthlyInfo.isSepMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isSepMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isSepMonthChecked = true;
            }

        }
        else if(event.target.value === "oct" ){
            if(  initialPeriodDataFromState.monthlyInfo.isOctMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isOctMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isOctMonthChecked = true;
            }

        }
        else if(event.target.value === "nov" ){
            if(  initialPeriodDataFromState.monthlyInfo.isNovMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isNovMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isNovMonthChecked = true;
            }

        }
        else if(event.target.value === "dec" ){
            if(  initialPeriodDataFromState.monthlyInfo.isDecMonthChecked  ){
                initialPeriodDataFromState.monthlyInfo.isDecMonthChecked = false;
            }

            else{
                initialPeriodDataFromState.monthlyInfo.isDecMonthChecked = true;
            }
        }
        else{

        }


        let monthlyInfo = initialPeriodDataFromState.monthlyInfo;
        let monthlyCheckBoxDisabled = getMonthlyCheckBoxDisabled();
        if(this.state.selectedYear.split("-").length  == 1){
            let count = 0;
            count += monthlyInfo.isJanMonthChecked ? 1 :0;
            count += monthlyInfo.isFebMonthChecked ? 1 :0;
            count += monthlyInfo.isMarMonthChecked ? 1 :0;
            count += monthlyInfo.isAprMonthChecked ? 1 :0;
            count += monthlyInfo.isMayMonthChecked ? 1 :0;
            count += monthlyInfo.isJunMonthChecked ? 1 :0;
            count += monthlyInfo.isJulMonthChecked ? 1 :0;
            count += monthlyInfo.isAugMonthChecked ? 1 :0;
            count += monthlyInfo.isSepMonthChecked ? 1 :0;
            count += monthlyInfo.isOctMonthChecked ? 1 :0;
            count += monthlyInfo.isNovMonthChecked ? 1 :0;
            count += monthlyInfo.isDecMonthChecked ? 1 :0;
            if(count == 3){
                monthlyCheckBoxDisabled.isJanMonDisabled = monthlyInfo.isJanMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isFebMonDisabled = monthlyInfo.isFebMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isMarMonDisabled = monthlyInfo.isMarMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isAprMonDisabled = monthlyInfo.isAprMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isMayMonDisabled = monthlyInfo.isMayMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isJunMonDisabled = monthlyInfo.isJunMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isJulMonDisabled = monthlyInfo.isJulMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isAugMonDisabled = monthlyInfo.isAugMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isSepMonDisabled = monthlyInfo.isSepMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isOctMonDisabled = monthlyInfo.isOctMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isNovMonDisabled = monthlyInfo.isNovMonthChecked ? false : true;
                monthlyCheckBoxDisabled.isDecMonDisabled = monthlyInfo.isDecMonthChecked ? false : true;
            }

        }

        if(monthlyInfo.isJanMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths + "Jan";
        }
        if(monthlyInfo.isFebMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "Feb" : "-" + "Feb";
        }
        if(monthlyInfo.isMarMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "Mar" : "-" + "Mar";
        }
        if(monthlyInfo.isAprMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "Apr" : "-" + "Apr";
        }
        if(monthlyInfo.isMayMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "May" : "-" + "May";
        }
        if(monthlyInfo.isJunMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "Jun" : "-" + "Jun";
        }
        if(monthlyInfo.isJulMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "Jul" : "-" + "Jul";
        }
        if(monthlyInfo.isAugMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "Aug" : "-" + "Aug";
        }
        if(monthlyInfo.isSepMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "Sep" : "-" + "Sep";
        }
        if(monthlyInfo.isOctMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "Oct" : "-" + "Oct";
        }
        if(monthlyInfo.isNovMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "Nov" : "-" + "Nov";
        }
        if(monthlyInfo.isDecMonthChecked){
            updatedSelectedMonths += updatedSelectedMonths == "" ? "Dec" : "-" + "Dec" ;
        }

        let numberOfMonthsSelected = 0;
        let selectedWeek = this.state.selectedWeek;
        if (updatedSelectedMonths.split('-').length >=2){
            numberOfMonthsSelected=  updatedSelectedMonths.split('-').length
            selectedWeek = "";
            let weeklyData = getWeeklyDataDefaultValues();
            initialPeriodDataFromState.weeklyInfo = weeklyData;
        }

        let isWeeklyCheckboxDisabled = numberOfMonthsSelected > 1 ? true : false ;
        updatedSelectedMonths = updatedSelectedMonths.startsWith("-") ? updatedSelectedMonths.substring(1,updatedSelectedMonths.length): updatedSelectedMonths;
        //let monthlyCheckBoxData =
        this.setState({
            quarterlyCheckBoxDisabled: getQuarterlyCheckBoxDisabled(),
            monthlyCheckBoxDisabled: monthlyCheckBoxDisabled,
            selectedMonth:updatedSelectedMonths,
            selectedQuarter:"",
            selectedWeek:selectedWeek,
            initialPeriodData:initialPeriodDataFromState,
            weeklyCheckboxDisabled: isWeeklyCheckboxDisabled
        })

        console.log("the monthly satte is",this.state);
    }
    handleWeek(event){

        let quarterlyData = getQuarterlyDataDefaultValues();
        let updatedSelectedWeeks ="" ;
        let initialPeriodDataFromState = this.state.initialPeriodData;
        initialPeriodDataFromState.quarterlyInfo = quarterlyData;
        if( event.target.value === "week1" ){

            if(  initialPeriodDataFromState.weeklyInfo.isWeekOneChecked  ){

                initialPeriodDataFromState.weeklyInfo.isWeekOneChecked = false;
            }

            else{

                initialPeriodDataFromState.weeklyInfo.isWeekOneChecked = true;
            }

        }
        else if(event.target.value === "week2" ){
            if(  initialPeriodDataFromState.weeklyInfo.isWeekTwoChecked  ){
                initialPeriodDataFromState.weeklyInfo.isWeekTwoChecked = false;
            }

            else{
                initialPeriodDataFromState.weeklyInfo.isWeekTwoChecked = true;
            }

        }
        else if(event.target.value === "week3" ){
            if(  initialPeriodDataFromState.weeklyInfo.isWeekThreeChecked  ){
                initialPeriodDataFromState.weeklyInfo.isWeekThreeChecked = false;
            }

            else{
                initialPeriodDataFromState.weeklyInfo.isWeekThreeChecked = true;
            }

        }
        else if(event.target.value === "week4" ){
            if(  initialPeriodDataFromState.weeklyInfo.isWeekFourChecked  ){
                initialPeriodDataFromState.weeklyInfo.isWeekFourChecked = false;
            }

            else{
                initialPeriodDataFromState.weeklyInfo.isWeekFourChecked = true;
            }

        }
        else  if(event.target.value === "week5" ){
            if(  initialPeriodDataFromState.weeklyInfo.isWeekFiveChecked  ){
                initialPeriodDataFromState.weeklyInfo.isWeekFiveChecked = false;
            }

            else{
                initialPeriodDataFromState.weeklyInfo.isWeekFiveChecked = true;
            }

        }
        else{

        }

        let weeklyInfo = initialPeriodDataFromState.weeklyInfo;

        if(weeklyInfo.isWeekOneChecked){
            updatedSelectedWeeks = updatedSelectedWeeks + "week1";
        }
        if(weeklyInfo.isWeekTwoChecked){
            updatedSelectedWeeks += updatedSelectedWeeks == "" ? "week2" : "-" + "week2";
        }
        if(weeklyInfo.isWeekThreeChecked){
            updatedSelectedWeeks += updatedSelectedWeeks == ""? "week3" : "-" + "week3";
        }
        if(weeklyInfo.isWeekFourChecked){
            updatedSelectedWeeks += updatedSelectedWeeks == ""  ? "week4" : "-" + "week4";
        }
        if(weeklyInfo.isWeekFiveChecked){
            updatedSelectedWeeks += updatedSelectedWeeks == "" ? "week5" : "-" + "week5";
        }

        updatedSelectedWeeks = updatedSelectedWeeks.startsWith("-") ? updatedSelectedWeeks.substring(1,updatedSelectedWeeks.length): updatedSelectedWeeks;
        // this.setState({initialData:{selectedWeek:event.target.value,selectedQuarter:""},initialPeriodData:initialPeriodDataFromState})
        let selectedWeeklyData = event.target.value;

        this.setState((prevState) => {
            return {...prevState,quarterlyCheckBoxDisabled: getQuarterlyCheckBoxDisabled(), selectedWeek:updatedSelectedWeeks,selectedQuarter:"",initialPeriodData:initialPeriodDataFromState }
        })


    }
    showCompareData(e){

        this.props.displayCompareData({  selectedYear: this.state.selectedYear,
            selectedQuarter: this.state.selectedQuarter,
            selectedMonth: this.state.selectedMonth,
            selectedWeek: this.state.selectedWeek,
        })


    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    render() {

        let isQuarterOneChecked = this.state.initialPeriodData.quarterlyInfo.isQuarterOneChecked;

        console.log("the expec state is", this.state);

        return (

            <div className="container-fluid ">

                <Button className="collapseToggleButton" color="primary" style={{ fontSize: '1.4rem' }} onClick={this.toggle} >Compare Periods</Button>
                <Collapse isOpen={this.state.collapse}>
                    <div className="container-fluid compareComponent col-md-12" isOpen={this.state.collapse}>
                        <div>
                            {this.state.isError ? "Please selecte Year" : null}
                        </div>
                        <div className="quarterlyYearlyDivision">
                            <div className="compareComponentDate yearlyDivision">
                                <p className="dateLabel">Yearly</p>
                                <div className="compareComponentDataWrapper">
                                    <input type="checkbox" name="yearlyData" onChange={this.handleYear} value="2017" /><label className="labelsForCheckboxes " for="2017"> 2017 </label>
                                    <input type="checkbox" name="yearlyData" onChange={this.handleYear} value="2018"/><label className="labelsForCheckboxes " for="2018"> 2018 </label>
                                </div>
                            </div>

                            <hr/>
                            <div className="compareComponentDate quarterlyDivision">
                                <p className="dateLabel">Quarterly</p>
                                <div className="compareComponentDataWrapper">
                                    <input type="checkbox" disabled ={this.state.quarterlyCheckBoxDisabled.isQuarterOneDisabled} name="quarterlyData" onChange={this.handleQuarter} value="q1"  checked={ this.state.initialPeriodData.quarterlyInfo.isQuarterOneChecked  } /><label className="labelsForCheckboxes " for="q1">Q1</label>
                                    <input type="checkbox" disabled ={this.state.quarterlyCheckBoxDisabled.isQuarterTwoDisabled} name="quarterlyData" onChange={this.handleQuarter} value="q2" checked={ this.state.initialPeriodData.quarterlyInfo.isQuarterTwoChecked }/><label className="labelsForCheckboxes " for="q2">Q2</label>
                                    <input type="checkbox" disabled ={this.state.quarterlyCheckBoxDisabled.isQuarterThreeDisabled} name="quarterlyData" onChange={this.handleQuarter} value="q3" checked={ this.state.initialPeriodData.quarterlyInfo.isQuarterThreeChecked }/><label className="labelsForCheckboxes " for="q3">Q3</label>
                                    <input type="checkbox" disabled ={this.state.quarterlyCheckBoxDisabled.isQuarterFourDisabled}  name="quarterlyData" onChange={this.handleQuarter} value="q4"  checked={ this.state.initialPeriodData.quarterlyInfo.isQuarterFourChecked }/><label className="labelsForCheckboxes " for="q4">Q4</label>
                                </div>
                            </div>
                        </div>
                        <div className="monthlyWeeklyDivision">
                            <div className="compareComponentDate monthlyDivision">
                                <p className="dateLabel">Monthly</p>
                                <div className="compareComponentDataWrapper">
                                    <div>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isJanMonDisabled} name="monthlyData" onChange={this.handleMonth} value="jan" checked={ this.state.initialPeriodData.monthlyInfo.isJanMonthChecked } /><label className="labelsForCheckboxes " for="jan">Jan</label>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isFebMonDisabled} name="monthlyData" onChange={this.handleMonth} value="feb" checked={ this.state.initialPeriodData.monthlyInfo.isFebMonthChecked }/><label className="labelsForCheckboxes " for="feb">Feb</label>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isMarMonDisabled} name="monthlyData" onChange={this.handleMonth} value="mar" checked={ this.state.initialPeriodData.monthlyInfo.isMarMonthChecked }/><label className="labelsForCheckboxes " for="mar">Mar</label>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isAprMonDisabled} name="monthlyData" onChange={this.handleMonth} value="apr" checked={ this.state.initialPeriodData.monthlyInfo.isAprMonthChecked }/><label className="labelsForCheckboxes " for="apr">Apr</label>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isMayMonDisabled} name="monthlyData" onChange={this.handleMonth} value="may" checked={ this.state.initialPeriodData.monthlyInfo.isMayMonthChecked }/><label className="labelsForCheckboxes " for="may">May</label>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isJunMonDisabled} name="monthlyData" onChange={this.handleMonth} value="jun" checked={ this.state.initialPeriodData.monthlyInfo.isJunMonthChecked }/><label className="labelsForCheckboxes " for="jun">Jun</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isJulMonDisabled} name="monthlyData" onChange={this.handleMonth} value="jul" checked={ this.state.initialPeriodData.monthlyInfo.isJulMonthChecked }/><label className="labelsForCheckboxes " for="jul">Jul</label>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isAugMonDisabled} name="monthlyData" onChange={this.handleMonth} value="aug" checked={ this.state.initialPeriodData.monthlyInfo.isAugMonthChecked }/><label className="labelsForCheckboxes " for="aug">Aug</label>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isSepMonDisabled} name="monthlyData" onChange={this.handleMonth} value="sep" checked={ this.state.initialPeriodData.monthlyInfo.isSepMonthChecked }/><label className="labelsForCheckboxes " for="sep">Sep</label>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isOctMonDisabled} name="monthlyData" onChange={this.handleMonth} value="oct" checked={ this.state.initialPeriodData.monthlyInfo.isOctMonthChecked }/><label className="labelsForCheckboxes " for="oct">Oct</label>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isNovMonDisabled} name="monthlyData" onChange={this.handleMonth} value="nov" checked={ this.state.initialPeriodData.monthlyInfo.isNovMonthChecked }/><label className="labelsForCheckboxes " for="nov">Nov</label>
                                        <input type="checkbox" disabled ={this.state.monthlyCheckBoxDisabled.isDecMonDisabled} name="monthlyData" onChange={this.handleMonth} value="dec" checked={ this.state.initialPeriodData.monthlyInfo.isDecMonthChecked }/><label className="labelsForCheckboxes " for="dec">Dec</label>
                                    </div>

                                </div>
                            </div>
                            <hr/>
                            <div className="compareComponentDate weeklyDivision">
                                <p className="dateLabel">Weekly</p>
                                <div className="compareComponentDataWrapper">
                                    <input type="checkbox" disabled={this.state.weeklyCheckboxDisabled} name="yearlyData" onChange={this.handleWeek} value="week1" checked={ this.state.initialPeriodData.weeklyInfo.isWeekOneChecked }  /><label className="labelsForCheckboxes " for="week1">Week1</label>
                                    <input type="checkbox" disabled={this.state.weeklyCheckboxDisabled} name="yearlyData" onChange={this.handleWeek} value="week2" checked={ this.state.initialPeriodData.weeklyInfo.isWeekTwoChecked } /><label className="labelsForCheckboxes "  for="week2">Week2</label>
                                    <input type="checkbox" disabled={this.state.weeklyCheckboxDisabled} name="yearlyData" onChange={this.handleWeek} value="week3" checked={ this.state.initialPeriodData.weeklyInfo.isWeekThreeChecked } /><label className="labelsForCheckboxes "  for="week3">Week3</label>
                                    <input type="checkbox" disabled={this.state.weeklyCheckboxDisabled} name="yearlyData" onChange={this.handleWeek} value="week4" checked={ this.state.initialPeriodData.weeklyInfo.isWeekFourChecked } /><label className="labelsForCheckboxes "  for="week4">Week4</label>
                                    <input type="checkbox" disabled={this.state.weeklyCheckboxDisabled} name="yearlyData" onChange={this.handleWeek} value="week5" checked={ this.state.initialPeriodData.weeklyInfo.isWeekFiveChecked } /><label className="labelsForCheckboxes "  for="week5">Week5</label>
                                </div>
                            </div>
                        </div>

                        <button disabled={!this.state.selectedYear} className="btn btn-primary compareButton " onClick={this.showCompareData}> Compare </button>
                    </div>
                </Collapse>
            </div>
        );
    }
}

const initialData= {
    selectedYear: "",
    selectedPeriod: "",
    selectedMonth: "",
    selectedWeek: "",
    selectedQuarter: "",
    selectedPeriodDetails: "",
    periodLabel: ""
}