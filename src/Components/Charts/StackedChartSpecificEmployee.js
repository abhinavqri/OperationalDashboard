import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'

class StackedChartSpecificEmployee extends Component {
    constructor(props) {
        super(props)
        this.setConfig = this.setConfig.bind(this);
    }


    setConfig(stackedData) {

        const config = {
            chart: {
                type: 'column',
                shadow: true


            },
            title: {
                text: 'Stacked Column Distribution of Employee Hours Per Month by Project / Department of the year '+new Date().getFullYear(),
                floating: false,
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false,
                style :  { "color": "#67C8FF  ", "fontSize": "18px", "text-decoration":"underline", "text-decoration-color":"red"  }
            },
            xAxis: {
                categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -50,
                verticalAlign: 'top',
                y: -5,
                floating: false,
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series:stackedData
        }
        return config;

    }

    render() {
        return(
            <div className={'chart'}>
                <ReactHighcharts  config={ this.setConfig(this.props.stackedData) }/>
            </div>
        )
    }
}
export default StackedChartSpecificEmployee;
