var ModelsContainer = require('../models/models_container');

var Game = function (player, bar) {
  this.player = player;
  this.bar = bar;
//DB Querys 
  this.modelsContainer = new ModelsContainer;

};

Game.prototype = {

  addDrinkToPlayer: function(drink, callback){

    this.modelsContainer.allPlayerItems(function(playerItems){
      var handsFull = false;
      var amountInHands = playerItems.length;

      if(amountInHands >= 3){
        handsFull = true;
      };

      if (drink.value <= this.player.wallet && handsFull === false){
        this.modelsContainer.addPlayerItem(drink, function(updatedData){
          callback(null, updatedData);
        });
      } 
      else {
        callback("You don't have enough money to buy another drink, sort yourself out! // or hands are full");
      }
    }.bind(this));     
  },
  
  removeDrinkFromPlayer: function(drink, callback){
    this.modelsContainer.removePlayerItem(drink, callback);
  },

  addDrinkToBar: function(drink, callback){
    this.modelsContainer.addBarItem(drink, callback);
  },
  removeDrinkFromBar: function(drink, callback){
    this.modelsContainer.removeBarItem(drink, callback);
  },

  findBarDrinkById: function(id, callback){

      this.modelsContainer.findSpecificBarItem(id, callback);
  },

};

module.exports = Game;