var MoneyChart = function (playerWallet){
  var container = document.getElementById("money-chart");


  var chart = new Highcharts.Chart({
    chart: {
      type: "bar",
      renderTo: container,
      backgroundColor: "rgba(69, 53, 53, 0.3)",
    },
    title: {
      text: ""
    },
    series: [
    {
      name: "Your Money",
      data: [playerWallet],
      color: "#ffd24d"
    }
    ],
    xAxis: {
      categories: ["£"],
      labels: {
          style:{
            color: "white"
        }
      }
    },
    yAxis: {
      title: {
        text: "Your Money",
        style: {
          color: "white"
        }
      },
      min: 0,
      max: 100,
      labels: {
          style:{
            color: "white"
        }
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