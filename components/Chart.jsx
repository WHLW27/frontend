import React from "react";
import { render } from "react-dom";
import { useState, useEffect } from "react";
// Import Highcharts
import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highstock";
import axios from "axios";

const API_URL = "http://localhost:4000/api/v2/calculation_data";

const Chart = () => {
    const [options, setOptions] = useState({
        title: {
            text: 'Your forecast'
          },
          yAxis: {
            title: {
                text: 'Portfolio Value (£)'
              },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          xAxis: {
            type: 'datetime',
            title: {
                text: 'Investment Period'
              },
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
                pointStart: Date.UTC(2010, 0, 1),
                pointInterval: 31557600000,
                name: 'Investment',
                dataLabels: {
                  enabled: true,
                  formatter: function () {
                    return "£" + Highcharts.numberFormat(this.y, 2);
                  }
                }
            }
          },
        series: [{
            data: [1, 2, 3, 4],
         }]
    });

    useEffect(() => {

        fetch("http://localhost:4000/api/v2/calculation_data")
            .then(response => {
                return response.json();
            })
            .then(data => {
                let chartData = [];
                let seriesData = [];
                console.log(data);

                for (const [key, value] of Object.entries(data)) {
                    if (key == "created_at" || key == "updated_at" || key == "id" || key == "growthPercentage" || key == "investAmount" || key == "investPeriod" || key == "annualContribution" || key == "monthlyContribution") {
                        data[key] = null;
                    }
                    if (data[key] != null) {
                        chartData.push(data[key]);
                    }
                }
                console.log(chartData);
                for (let i = 0; i < chartData.length; i++) {
                    seriesData.push(parseFloat(chartData[i]));
                }
                console.log(parseFloat(chartData));
                setOptions({ series: [{ data: seriesData}] });
            });
    }, []);

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
