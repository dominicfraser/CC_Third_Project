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
  renderPlayerItems: function(playerItems){
    var select = document.getElementById("player-inventory");
    select.innerHTML = "";

    for (var item of playerItems){
      var option = document.createElement('option');
      option.innerText = item.name;
    }

    select.appendChild(option);
  },

  renderBarItems: function(barItems){
    var select = document.getElementById("bar-inventory");
    select.innerHTML = "";

    for (var item of barItems){
      var option = document.createElement("option");
      option.innerText = item.name;
    }
  }
};

module.exports = Game;
