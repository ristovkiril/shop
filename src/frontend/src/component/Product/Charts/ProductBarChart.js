import React from 'react';

import {Bar} from "react-chartjs-2";

class ProductBarChart extends React.Component{
    constructor(props) {
        super(props);
        console.log("CHART");
        console.log(props)

        const labels = props.products.map(p => p.name);
        const data = props.products.map(p => p.views);
        console.log(labels);
        console.log(data);

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


    render() {
        return (
            <div className="row">
                <div className="col-md-8 col-sm-12 mx-auto">
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
            </div>
        );
    }

}

export default ProductBarChart;