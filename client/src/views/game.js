var ModelsContainer = require('../models/models_container')

var Game = function (player, bar) {
  this.player = player;
  this.bar = bar;

  var modelsContainer = new ModelsContainer;

  modelsContainer.allPlayerItems(function(playerItems){
    this.renderPlayerItems(playerItems);
  }.bind(this));

  modelsContainer.allBarItems(function(barItems){
    this.renderBarItems(barItems);
  }.bind(this));

};

Game.prototype = {

  countItems: function (allItems, item) {
    counter = 0
    for (var i = 0; i < allItems.length; i++){
      if (allItems[i].name == item.name)
        counter += 1
    }
    return counter
  },

  renderPlayerItems: function(playerItems){
    var select = document.getElementById("player-inventory");
    select.innerHTML = "";

    for (var item of playerItems){
      var count = this.countItems(playerItems, item)
      var option = document.createElement('option');
      option.innerText = item.name + " (" + count + ")" 
      select.appendChild(option);
    }
  },

  renderBarItems: function(barItems){
    var select = document.getElementById("bar-inventory");
    select.innerHTML = "";

    for (var item of barItems){
      var count = this.countItems(barItems, item)
      var option = document.createElement("option");
      option.innerText = item.name + " (" + count + ")";
      select.appendChild(option);
    }
  }
};

module.exports = Game;
