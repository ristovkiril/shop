import React from 'react';

import {Bar, Pie} from "react-chartjs-2";
import $ from 'jquery'
import 'jquery-ui'

class Charts extends React.Component{
    constructor(props) {
        super(props);
        console.log("CHART");
        console.log(props)
        
        const labels = props.labels;
        const data = props.data;
        const maxValue = Math.max(...data);


        this.state = {
            'products': props.products,
            'maxValue': maxValue,
            'chartData': {
                labels: labels,
                datasets: [
                    {
                        label: "Views",
                        data: data
                        ,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(102, 66, 232, 0.6)',
                            'rgba(255, 162, 64, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 44, 132, 0.6)',
                        ]
                    }
                ]

            }
        }
    }

    componentDidMount() {
        $("#bar").show();
        $("#pie").hide();
    }

    onChangeChart = (e) => {
        if (e.target.value === "bar") {
            $("#bar").show();
            $("#pie").hide();
        }
        else {
            $("#bar").hide();
            $("#pie").show();
        }
    }

    render() {


        return (
            <div className="row">
                <div id="tabs" className="col-md-12 mx-auto">
                    <div className="mx-auto ">
                        <ul className="nav nav-tabs mx-auto text-center">
                            <li className="nav-item mx-auto col-md-2 col-sm-6">
                                <button type="button" onClick={this.onChangeChart} className="btn btn-link border-0 p-1" value="bar">Bar</button>
                            </li>

                            <li className="nav-item mx-auto col-md-2 col-sm-6">
                                <button type="button" onClick={this.onChangeChart} className="btn btn-link border-0 p-1" value="pie">Pie</button>
                            </li>
                        </ul>
                    </div>

                    <div id="bar" className="col-md-8 col-sm-12 mx-auto ">
                        <Bar data={this.state.chartData} options={{maintainAspectRatio: false, scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        min: 0,
                                        max: this.state.maxValue,
                                        callback: function(value) {if (value % 1 === 0) {return value;}}
                                    }
                                }]
                            }}} />
                    </div>
                    <div id="pie" className="col-md-8 col-sm-12 mx-auto ">
                        <Pie data={this.state.chartData} options={{maintainAspectRatio: false }} />
                    </div>
                </div>

            </div>
        );
    }

}

export default Charts;