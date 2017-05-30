var BarInventoryChart = function (barInventory){
  var container = document.getElementById("bar-inv-chart");

  var tempAmount = barInventory

  var chart = new Highcharts.Chart({
    chart: {
      type: "bar",
      renderTo: container,
      backgroundColor: '#453535'
    },
    title: {
      text: ""
    },
    series: [
    {
      name: "Bar Inventory",
      data: [tempAmount],
      color: "#6600cc"
    }
    ],
    xAxis: {
      categories: [""]
    },
    yAxis: {
      title: {
        text: "Bar Drinks Remaining"
      },
      min: 0
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    }
  });

};

module.exports = BarInventoryChart;