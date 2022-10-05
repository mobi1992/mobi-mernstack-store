import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
// import "./styles.css";
import moment from "moment";

const LineChart = ({ totalAmount }) => {
    const data = {
        datasets: [
            {
                label: "Dataset 1 (linear interpolation)",
                backgroundColor: 'white',
                borderColor: 'red',
                fill: false,
                lineTension: 0,
                borderDash: [8, 4],
                data: []
            }
        ]
    };

    var today = new Date();
    var year = today.getFullYear();
    var mes = today.getMonth() + 1;
    var dia = today.getDate();
    var fecha = dia + "-" + mes + "-" + year;
    const options = {
        elements: {
            line: {
                tension: 0.5
            }
        },
        scales: {
            xAxes: {
              type: "realtime",
              realtime: {
                onRefresh: function() {
                  data.datasets[0].data.push({
                    x: Date.now(),
                    y: totalAmount
                  });
                },
                delay: 300,
                refresh: 300
              }
            },
            yAxes: {
              max: totalAmount + 100,
              min: 0
            }
          }
    };
    return (
        <div className="App">
            <Line data={data} options={options} />
        </div>
    );
}

export default LineChart;
