import React from 'react';
import ReactHighcharts from 'react-highcharts'


class ColumnChartEmployee extends React.Component {
  constructor(props) {
    super(props);
    super(props)
    this.setConfig = this.setConfig.bind(this);
    }
    setConfig(fteData, contData, totaldata, categories) {

        let label = ' Man Hour Distribution for  FTE-CONT - '+this.props.label ;
        let totalData = [];
        for( let index in fteData ){

            totalData.push(fteData[index] + contData[index])
        }

    const config = {
      chart: {
      type: 'column'
  },
  title: {
      text: label,
      style :  { "color": "#0099FF", "fontSize": "22px", "text-decoration":"underline", "text-decoration-color":"red"  }
  },
  xAxis: {
      categories: categories,
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Hours'
      }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} hours</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: [{
      name: 'FTE',
      data: fteData

  }, {
      name: 'Contractors',
      data: contData

  },
      {
          name: 'Total',
          data: totalData

      }]
    }
    return config;

    }

    render() {
    return(
        <div className={'chart'}>
            <ReactHighcharts  config={ this.setConfig(this.props.fteData, this.props.contData, (this.props.fteData+this.props.contData), this.props.categories) }/>
        </div>
    )
    }
    }
export default ColumnChartEmployee;
