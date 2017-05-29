var ModelsContainer = require('../models/models_container')

var Game = function (player, bar) {
  this.player = player;
  this.bar = bar;

  this.modelsContainer = new ModelsContainer;


};

Game.prototype = {

  addDrinkToPlayer: function(drink, callback){
    this.modelsContainer.addPlayerItem(drink, callback);
  },

  removeDrinkFromPlayer: function(drink, callback){
    this.modelsContainer.removePlayerItem(drink, callback);
  },

};

module.exports = Game;