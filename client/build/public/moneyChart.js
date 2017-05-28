var MoneyChart = function (){
  var container = document.getElementById("money-chart");

  var chart = new Highcharts.Chart({
    chart: {
      type: "column",
      renderTo: container
    },
    title: {
      text: "Our Favourite Programming Languages"
    },
    series: [
    {
      name: "Cohort 11",
      data: [8, 8, 6, 1]
    },
    {
      name: "Cohort 12",
      data: [17, 1, 0, 0]
    }
    ],
    xAxis: {
      categories: ["Ruby", "Java", "JavaScript", "COBOL"]
    }
  });

};

module.exports = MoneyChart;