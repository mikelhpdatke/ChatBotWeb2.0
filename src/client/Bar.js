import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { FetchData } from "./Home";

const calData = () => {
  
  //console.log(labels);
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          userCallback: function(label, index, labels) {
            // when the floored value is the same as the value we have a whole number
            if (Math.floor(label) === label) {
              return label;
            }
          }
        }
      }
    ]
  }
};
class BarChart extends Component {
  constructor(props) {
    super(props);
    let curDate = new Date();
    let labels = [curDate.toISOString().split("T")[0]];
    //console.log(labels);
    for (let i = 1; i <= 9; i++) {
      let date = curDate;
      date.setDate(curDate.getDate() - 1);
      labels.unshift(date.toISOString().split("T")[0]);
    }
    this.state = {
      labels: labels,
      datasets: [
        {
          label: "Answered",
          backgroundColor: "rgba(228, 92, 118, 0.4)",
				  borderColor: "rgba(223, 17, 38, 0.8)",
				  borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          label: "NotAnswered",
          backgroundColor: "rgb(107, 53, 180, 0.4)",
				  borderColor: "rgb(107, 53, 180, 0.4)",
				  borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };
  }

  componentWillMount(){
    let curDate = new Date();
  let labels = [curDate.toISOString().split("T")[0]];
  //console.log(labels);
  for (let i = 1; i <= 9; i++) {
    let date = curDate;
    date.setDate(curDate.getDate() - 1);
    labels.unshift(date.toISOString().split("T")[0]);
  }
  //
  let fetch = FetchData();
  let dataAnswered = [];
  let dataNotAnswered = [];
  fetch
    .then(ans => {
      let arr = ans.rows;
      for (let i = 0; i <= 9; i++) {
        let date = labels[i];
        let countAnswered = arr.filter(x => {
          let loopDate = new Date(x.AskingTime);
          let compareDate = loopDate.toISOString().split("T")[0];
          //console.log(date, compareDate);
          return compareDate == date && x.Checked == 1;
        }).length;
        let countNotAnswered = arr.filter(x => {
          let loopDate = new Date(x.AskingTime);
          let compareDate = loopDate.toISOString().split("T")[0];
          return compareDate == date && x.Checked == 0;
        }).length;
        dataAnswered.push(countAnswered);
        dataNotAnswered.push(countNotAnswered);
      }
      //console.log(dataAnswered);
      //console.log(dataNotAnswered);
      return {dataAnswered, dataNotAnswered};
    })
    .then(({dataAnswered, dataNotAnswered}) => {
      console.log('wtf');
      console.log(dataAnswered, dataNotAnswered)
      let datasets = [
        {
          label: "Answered",
          backgroundColor: "rgba(228, 92, 118, 0.4)",
				  borderColor: "rgba(223, 17, 38, 0.8)",
				  borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: dataAnswered
        },
        {
          label: "NotAnswered",
          backgroundColor: "rgb(107, 53, 180, 0.4)",
				  borderColor: "rgb(107, 53, 180, 0.4)",
				  borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: dataNotAnswered
        }
      ];
      console.log(datasets);
      
      this.setState({
        labels: labels,
        datasets: datasets
      });
      
    });
  }
  render() {
    //console.log('wtf');
    return (
      <div>
        <div style={{fontSize:'20px', textAlign:'center', fontWeight:'bold'}}>Thống kê dữ liệu 10 ngày gần nhất</div>
        <Bar data={this.state} width={500} height={300} options={options} />
      </div>
    );
  }
}

export default BarChart;
