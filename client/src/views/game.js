var ModelsContainer = require('../models/models_container');

var Game = function (player, bar) {
  this.player = player;
  this.bar = bar;
//DB Querys 
  this.modelsContainer = new ModelsContainer;

};

Game.prototype = {

  addDrinkToPlayer: function(drink, callback){

    var outerStatus = this.modelsContainer.allPlayerItems(function(playerItems){
    var handsFull = false;
    var amountInHands = playerItems.length;

    if(amountInHands >= 3){
      handsFull = true
    };

    var innerStatus = "not set";
    if (drink.value <= this.player.wallet && handsFull === false){
      this.modelsContainer.addPlayerItem(drink, callback);
      innerStatus = true
    } 
    else {
      innerStatus = false
    }
    return innerStatus

    }.bind(this));

console.log('status in GAME', outerStatus)
      
    return outerStatus
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
console.log('findBarDrinkById id',id)
console.log('this is a callback? in GAME',callback)

    callback(this.modelsContainer.findSpecificBarItem(id));
  },

};

module.exports = Game;