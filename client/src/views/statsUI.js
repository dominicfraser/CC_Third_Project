var ModelsContainer = require('../models/models_container');
var MoneyChart = require('../../build/public/moneyChart.js');

var StatsUI = function(player, bar){
  this.player = player;
  this.bar = bar;

  console.log(this.player.wallet);
  var modelsContainer = new ModelsContainer;
    var moneyChart = new MoneyChart(this.player.wallet);
    

  };

  StatsUI.prototype = {

  };

  module.exports = StatsUI;