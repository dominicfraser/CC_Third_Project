var ModelsContainer = require('../models/models_container');
var MoneyChart = require('../../build/public/moneyChart.js');
var BarInventoryChart = require('../../build/public/barInventoryChart.js');
var DrunkLevelChart = require('../../build/public/drunkChart.js');


var StatsUI = function(player, bar){
  this.player = player;
  this.bar = bar;

  var modelsContainer = new ModelsContainer;
  
  var moneyChart = new MoneyChart(this.player.wallet);
  
  var drunkLevelChart = new DrunkLevelChart(this.player.drunkLevel);
  
  var barInventoryCount = modelsContainer.allBarItems(function(barInventory){
     var barInventoryChart = new BarInventoryChart(barInventory.length)
    });

};

  StatsUI.prototype = {
  
};

module.exports = StatsUI;