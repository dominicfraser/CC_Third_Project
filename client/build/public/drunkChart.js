var DrunkChart = function(drunkLevel){
  var container = document.getElementById("player-drunk-level");

  var chart = new Highcharts.Chart({
      chart: {
        type: "pie",
        renderTo: container
      },
      title: {
        text: ""
      },
      series: [
        {
          name: "Drunk Level",
          data: [
            {
              name: "Drunk",
              y: drunkLevel,
              color: "#ffc700"
            },
            {
              name: "Sober",
              y: 100 - drunkLevel,
              color: "#6bc4ea"
            },
          ]
        }
      ]
    });
}
  module.exports = DrunkChart;