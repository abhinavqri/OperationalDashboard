import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'

 class PieChartSpecificEmployee extends Component {
    constructor(props) {
        super(props)
        this.setConfig = this.setConfig.bind(this);
    }
    setConfig(pieData, isPercentageRequested) {
        let label = ' Man Hour Distribution by ' + this.props.label;
        let format = isPercentageRequested ? '<b>{point.name}</b>: {point.percentage:.1f}%   ,,   {point.y:.0f} hrs'  : '<b>{point.name}</b>: {point.y:.1f} ';
        const config = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: label,
                style :  { "color": "#D92EE4  ", "fontSize": "22px", "text-decoration":"underline", "text-decoration-color":"red","border":"2px solid black"  }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    borderColor: '#ffffff',
                    borderBottomWidth: 3,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: format,
                    },
                    animation: {
                        duration: 2000
                    }
                }
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            enabled: false
                        }
                    }
                }]
            },
            series:[{
                name: 'Employees',
                colorByPoint: true,
                data: pieData
            }]
        }
        return config;

    }

    render() {

        return(
            <div className={'chart'}>
                <ReactHighcharts  config={ this.setConfig(this.props.pieData, this.props.isPercentageRequested) }/>
            </div>
        )
    }
}
export default PieChartSpecificEmployee;

//SELECT SUM(hours) FROM Employee_1 WHERE date_year=2017 AND project = 'ALPHA' AND month = 3 ;