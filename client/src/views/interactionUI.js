var Game = require('./game.js');
var InventoryUI = require('./inventoryUI.js');
var StatsUI = require('./statsUI.js');

var InteractionUI = function (player, bar) {
  this.player = player;
  this.bar = bar;

  this.game = new Game(this.player, this.bar);
  this.inventoryUI = new InventoryUI(this.player, this.bar);

  console.log('inside main interactionUI', this)
};

InteractionUI.prototype = {
  askForDrink: function(){
    this.displayMessage("Would you like a drink?");
    var interactionArea = document.getElementById('middle');

    var yesButton = document.createElement('button');
    yesButton.innerHTML = "Yes";

    var noButton = document.createElement('button');
    noButton.innerHTML = "No";

    interactionArea.appendChild(yesButton);
    interactionArea.appendChild(noButton);

    yesClick = yesButton.addEventListener('click', this.orderPlaced.bind(this));
    noClick = noButton.addEventListener('click', this.orderNotPlaced.bind(this));
  },

  orderPlaced: function() {
    console.log('in order placed in interactionUI',this)
    this.game.addDrinkToPlayer({name: "test", value: 10}, function (response) {
      console.log('Drink should now be added to player')
    });

    console.log(this.player.wallet)
    this.player.subtractItemValue({name: "test", value: 10});

    // this.game.removeDrinkFromBar({name: "test", value: 10}, function (response) {
    //   console.log('Drink should now be removed from bar');
    this.inventoryUI = new InventoryUI(this.player, this.bar);
    this.statsUI = new StatsUI(this.player, this.bar);
  },

  orderNotPlaced: function() {
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = "What a loser...";
    //ADD TIMER?
  },

  displayMessage: function(message){
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = message;
  },

};

// this.game.removeDrinkFromPlayer(testItem, function (response) {
//   console.log('removeDrinkFromPlayer response data', response)
// })

module.exports = InteractionUI;