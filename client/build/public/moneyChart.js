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
    }
  });

};

module.exports = MoneyChart;