var BarInventoryChart = function (barInventory){
  var container = document.getElementById("bar-inv-chart");

  var tempAmount = barInventory

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
      name: "Bar Inventory",
      data: [tempAmount]
    }
    ],
    xAxis: {
      categories: ["£"]
    }
  });

};

module.exports = MoneyChart;