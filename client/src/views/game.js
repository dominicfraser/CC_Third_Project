var ModelsContainer = require('../models/models_container');

var Game = function (player, bar) {
  this.player = player;
  this.bar = bar;
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
        if (drink.value > this.player.wallet){
          callback("You don't have enough money to buy another drink, sort yourself out!");
        }
        else {
          callback("Soz boo, your hands are full!");
        }
      }
    }.bind(this));    
  },

  playerDrinkId: function(id){
    this.modelsContainer.playerDrinkDrink(id);
  },
  
  removeDrinkFromPlayer: function(drink, callback){
    this.modelsContainer.removePlayerItem(drink, callback);
  },
  
  findPlayerDrinkById: function(id, callback){
    this.modelsContainer.findSpecificPlayerItem(id, callback);
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

  renderWinScreen: function(){
    var canvasPlayer = document.getElementById("player-canvas");
    var playerContext = canvasPlayer.getContext("2d");
    var canvasBar = document.getElementById("main-canvas");
    var barContext = canvasBar.getContext("2d");

    playerContext.clearRect(0, 0, 700, 500);
    barContext.clearRect(0, 0, 700, 500);

    var winScreen = document.createElement('img');
    winScreen.src = "/public/img/winscreen.png";

    winScreen.onload = function() {
      playerContext.drawImage(this, 165, 90, 360, 300);
    }


  }
};

module.exports = Game;