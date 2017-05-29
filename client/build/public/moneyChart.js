// var player = require('../src/models/player_model.js');

var MoneyChart = function (playerWallet){
  var container = document.getElementById("money-chart");


  var chart = new Highcharts.Chart({
    chart: {
      type: "bar",
      renderTo: container
    },
    title: {
      text: ""
    },
    series: [
    {
      name: "Your Money",
      data: [playerWallet]
    }
    ],
    xAxis: {
      categories: ["£"]
    },
    yAxis: {
      title: {
        text: "Your Money"
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    }
  });

};

module.exports = MoneyChart;