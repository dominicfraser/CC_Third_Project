var Game = require('./game.js');
var InventoryUI = require('./inventoryUI.js');
var StatsUI = require('./statsUI.js');

var InteractionUI = function (player, bar) {
  this.player = player;
  this.bar = bar;

  this.flag = false;

  this.game = new Game(this.player, this.bar);
  this.inventoryUI = new InventoryUI(this.player, this.bar);

  this.yesButton = document.createElement('button');
  this.yesButton.innerHTML = "Yes";

  this.noButton = document.createElement('button');
  this.noButton.innerHTML = "No";
};

InteractionUI.prototype = {

  askToPlayPiano: function(){
    this.displayMessage("Let's turn up the funk in here");
    var interactionArea = document.getElementById('middle');

    if(this.flag == false){
      interactionArea.appendChild(this.yesButton);
      interactionArea.appendChild(this.noButton);

      yesClick = this.yesButton.addEventListener('click', this.playMusic.bind(this));
      noClick = this.noButton.addEventListener('click', function(){
        this.dontPlayMusic(this.yesButton, this.noButton)
      }.bind(this));

      this.flag = true;
    }

  },

  askForDrink: function(){
    this.displayMessage("Would you like a drink?");
    var interactionArea = document.getElementById('middle');

    if(this.flag == false){
      interactionArea.appendChild(this.yesButton);
      interactionArea.appendChild(this.noButton);

      yesClick = this.yesButton.addEventListener('click', this.orderPlaced.bind(this));
      noClick = this.noButton.addEventListener('click', function(){
        this.orderNotPlaced(this.yesButton, this.noButton)
      }.bind(this));

      this.flag = true;
    }
  },

  orderPlaced: function() {
    var status = this.game.addDrinkToPlayer({name: "test", value: 10, alcoholLevel: 4}, function (response) {
        console.log('Drink should now be added to player')
      })

    setTimeout(function(){
      if (status === true ){
        console.log('in order placed in interactionUI',this)

        console.log(this.player.wallet)
        this.player.subtractItemValue({name: "test", value: 10, alcoholLevel: 4});
        this.player.increaseDrunkLevel({name: "test", value: 10, alcoholLevel: 4});

        // this.game.removeDrinkFromBar({name: "test", value: 10}, function (response) {
        //   console.log('Drink should now be removed from bar');
        this.inventoryUI = new InventoryUI(this.player, this.bar);
        this.statsUI = new StatsUI(this.player, this.bar);

        this.displayMessage("You bought a drink!");
      } 
      else {
        this.displayMessage("You don't have enough money to buy another drink, sort yourself out!");
      };

      this.yesButton.remove();
      this.noButton.remove();
      this.flag = false;

      }.bind(this), 2000, this.yesButton, this.noButton);
  },

  orderNotPlaced: function(yesButton, noButton) {
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = "What a loser...";

    setTimeout(function(){
      this.displayMessage("");
      this.yesButton.remove();
      this.noButton.remove();
      this.flag = false;
    }.bind(this), 2000, yesButton, noButton);
  },

  speakToMan: function(){
    this.displayMessage("Hello there, would you like some money?");
    var interactionArea = document.getElementById('middle');

    if(this.flag == false){
      interactionArea.appendChild(this.yesButton);
      interactionArea.appendChild(this.noButton);
    }

    yesClick = this.yesButton.addEventListener('click', this.acceptMan.bind(this));
    noClick = this.noButton.addEventListener('click', function(){
      this.rejectMan(this.yesButton, this.noButton)
    }.bind(this));

    this.flag = true;
  },

  rejectMan: function(yesButton, noButton){
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = "What an idiot...";

    setTimeout(function(){
      this.displayMessage("");
      this.yesButton.remove();
      this.noButton.remove();
      this.flag = false;
    }.bind(this), 2000, yesButton, noButton);
  },

  acceptMan: function(){
    this.player.acceptMoneyFromMan(20);

    messageDisplay = document.getElementById("interaction-message");
    this.displayMessage("Aha! Here's 20 big ones! Go forth and quench thy thirst.")
    this.statsUI = new StatsUI(this.player, this.bar);


    setTimeout(function(){
      this.displayMessage("");
      this.yesButton.remove();
      this.noButton.remove();
      this.flag = false;
    }.bind(this), 2000, yesButton, noButton);
  },

  displayMessage: function(message){
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = message;
  },


};


module.exports = InteractionUI;