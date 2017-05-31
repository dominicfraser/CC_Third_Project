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
  askForDrink: function(){
    this.displayMessage("Would you like a drink?");
    var interactionArea = document.getElementById('middle');
    console.log('in askForDrink in interactionUI')
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
    this.displayMessage("Please select your drink from the bar inventory");
 //set on click listeners for bar
    var orderedDrinkId = null;
    this.inventoryUI.addEventListenersBarButtons(function(id){
console.log('callback id', id)
      orderedDrinkId = id;
console.log('orderedDrinkId after callback',orderedDrinkId)

      if(orderedDrinkId !== null){
        this.game.findBarDrinkById(orderedDrinkId, function(itemOrdered){
console.log('item ordered in interactionUI in findBarDrinkById', itemOrdered)
        
          this.game.addDrinkToPlayer(itemOrdered, function (errorMessage, updatedData) {
  console.log('Drink should now be added to player')

            if(errorMessage){
              this.displayMessage(errorMessage);
            }
            else {
              this.player.subtractItemValue(itemOrdered);
              this.player.increaseDrunkLevel(itemOrdered);

              this.game.removeDrinkFromBar(itemOrdered, function (newBarList) {
                console.log('Drink should now be removed from bar'); 

                // this.bar.addMoney(itemOrdered)
                //this.bar.inventoryLevel = newBarList.length

                this.inventoryUI = new InventoryUI(this.player, this.bar);
                this.statsUI = new StatsUI(this.player, this.bar);

                this.displayMessage("You bought a drink!");
              }.bind(this))

              
            }
            this.yesButton.remove();
            this.noButton.remove();
            this.flag = false;
          }.bind(this))
        }.bind(this))
        
      }
    }.bind(this)); 
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

  displayMessage: function(message){
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = message;
  },

};


module.exports = InteractionUI;