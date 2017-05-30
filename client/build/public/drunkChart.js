var DrunkChart = function(drunkLevel){
  var container = document.getElementById("player-drunk-level");

  var chart = new Highcharts.Chart({
      chart: {
        type: "pie",
        renderTo: container,
        backgroundColor: '#453535'
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
              color: "#ff0000"
            },
            {
              name: "Sober",
              y: 100 - drunkLevel,
              color: "#00cc00"
            },
          ]
        }
      ],
      credits: {
        enabled: false
      }
    });
}
  module.exports = DrunkChart;