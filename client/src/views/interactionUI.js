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

  this.inventoryUI.renderAll(this.playerDrinkDrinkSetUp.bind(this), this.barButtonDefaultSetup.bind(this));
};

InteractionUI.prototype = {

  barButtonDefaultSetup: function(){
      this.inventoryUI.addOnClickBarButtonsTellGoToBar(function(message){
    console.log("added GTB, message: ", message)
        this.displayMessage(message);
      }.bind(this));
    },

//try to go behind bar   
  cantGoBehindBar:function(){
    this.displayMessage("Hey! Customers can't come behind the bar. You better scram before I get the bouncer, punk. Do you REALLY want me to..?")
    var interactionArea = document.getElementById('middle-interaction');

      if(this.flag == false){
        interactionArea.appendChild(this.noButton);
        this.noButton.innerText = "NO!!!";
        noClick = this.noButton.addEventListener('click', function(){
          this.noBehindBar(this.noButton);
        }.bind(this));
  
        this.flag = true;
      }
    },  
  noBehindBar: function(noButton){
      this.displayMessage("Last chance, punk...");
  
      setTimeout(function(){
        this.displayMessage("");
        this.noButton.remove();
        this.flag = false;
      }.bind(this), 2000, this.noButton);
    },
  cantGoBehindBar:function(){
    this.displayMessage("Hey! Customers can't come behind the bar. You better scram before I get the bouncer, punk. Do you REALLY want me to..?");
    var interactionArea = document.getElementById('middle-interaction');

    if(this.flag == false){
      interactionArea.appendChild(this.noButton);
      this.noButton.innerText = "NO!!!"
      noClick = this.noButton.addEventListener('click', function(){
        this.noBehindBar(this.noButton);
      }.bind(this));

      this.flag = true;
    }
  },

//interact at the piano
  askToPlayPiano: function(){
    this.yesButton = document.createElement('button');
    this.yesButton.innerHTML = "Yes";

    this.noButton = document.createElement('button');
    this.noButton.innerHTML = "No";

    this.displayMessage("Shall we turn up the funk in here?");
    var interactionArea = document.getElementById('middle-interaction');

    if(this.flag == false){
      interactionArea.appendChild(this.yesButton);
      interactionArea.appendChild(this.noButton);

      yesClick = this.yesButton.addEventListener('click', this.playTheMusic.bind(this));
      noClick = this.noButton.addEventListener('click', function(){
        this.dontPlayTheMusic(this.yesButton, this.noButton);
      }.bind(this));

      this.flag = true;
    }
  },
  dontPlayTheMusic: function(yesButton, noButton){
    this.displayMessage("*Silence...*");
    this.yesButton.remove();
    this.noButton.remove();
    this.flag = false;

    setTimeout(function(){
      this.displayMessage("");
    }.bind(this), 4000);
  },
  playTheMusic: function(){
    this.displayMessage("Let's get it poppin'");
    document.getElementById("audio").play();
    this.yesButton.remove();
    this.noButton.remove();
    this.flag = false;

    setTimeout(function(){
      this.displayMessage("");
    }.bind(this), 5000);

  },

//drink a drink
  playerDrinkDrinkSetUp: function(id){
    this.inventoryUI.addOnClickPlayerButtonsToDrink(function(id){
      this.game.findPlayerDrinkById(id, function(itemOrdered){
        this.game.removeDrinkFromPlayer(itemOrdered, function(updatedPlayerInventory){
                this.player.increaseDrunkLevel(itemOrdered);
                this.inventoryUI.renderAll(this.playerDrinkDrinkSetUp.bind(this), this.barButtonDefaultSetup.bind(this));
                this.statsUI = new StatsUI(this.player, this.bar);
                this.displayMessage("You drank a drink!");

                setTimeout(function(){
                  this.displayMessage("");
                }.bind(this), 3000);
        }.bind(this))

      }.bind(this))
    }.bind(this))
  },

//interact at bar
  askForDrink: function(){
    this.yesButton = document.createElement('button');
    this.yesButton.innerHTML = "Yes";

    this.noButton = document.createElement('button');
    this.noButton.innerHTML = "No";

    this.displayMessage("Would you like a drink?");
    var interactionArea = document.getElementById('middle-interaction');

    if(this.flag == false){
      interactionArea.appendChild(this.yesButton);
      interactionArea.appendChild(this.noButton);

      yesClick = this.yesButton.addEventListener('click', this.orderPlaced.bind(this));
      noClick = this.noButton.addEventListener('click', function(){
        this.orderNotPlaced(this.yesButton, this.noButton);
      }.bind(this));

      this.flag = true;
    }
  },
  orderPlaced: function() {
    this.displayMessage("Please select your drink from the bar inventory");
 //set on click listeners for bar
    var orderedDrinkId = null;
    this.inventoryUI.addOnClickBarButtonsToBuyDrink(function(id){
      orderedDrinkId = id;
//got drink id from button clicked
      if(orderedDrinkId !== null){
        this.game.findBarDrinkById(orderedDrinkId, function(itemOrdered){
//found drink item object from it          
          this.game.addDrinkToPlayer(itemOrdered, function (errorMessage, updatedData) {
console.log('Trying to add drink to player')
//makes request to db to add drink to player
            if(errorMessage){
              this.displayMessage(errorMessage);
              this.inventoryUI.renderAll(this.playerDrinkDrinkSetUp.bind(this), this.barButtonDefaultSetup.bind(this));

            }
            else {
              this.player.subtractItemValue(itemOrdered);
//removes the drink from the bar
              this.game.removeDrinkFromBar(itemOrdered, function (newBarList) {
console.log('Trying to remove drink from bar'); 

                this.bar.addItemValue(itemOrdered);
//updates UIs
                this.inventoryUI.renderAll(this.playerDrinkDrinkSetUp.bind(this), this.barButtonDefaultSetup.bind(this));
                this.statsUI = new StatsUI(this.player, this.bar);

                this.displayMessage("You bought a drink!");
              }.bind(this))
//removes buttons
            }

            this.yesButton.remove();
            this.noButton.remove();
            this.flag = false;
            setTimeout(function(){
              this.displayMessage("");
            }.bind(this), 4000);
          }.bind(this))
        }.bind(this))  
      }
    }.bind(this)); 
  },
  orderNotPlaced: function(yesButton, noButton) {
    this.displayMessage("Alright, then go sit over there with Dominic...");

    this.yesButton.remove();
    this.noButton.remove();
    this.flag = false;
    setTimeout(function(){
      this.displayMessage("");
    }.bind(this), 2000);
  },

//interact with man
  speakToMan: function(){
    this.yesButton = document.createElement('button');
    this.yesButton.innerHTML = "Yes";
    this.noButton = document.createElement('button');
    this.noButton.innerHTML = "No";

    this.displayMessage("Hello there, would you like some money?");
    var interactionArea = document.getElementById('middle-interaction');

    if(this.flag == false){
      interactionArea.appendChild(this.yesButton);
      this.yesButton.innerText = "Heads";
      this.yesButton.style.width = "100px"
      interactionArea.appendChild(this.noButton);
      this.noButton.innerText = "Tails";
      this.noButton.style.width = "100px"

    }

    yesClick = this.yesButton.addEventListener('click', this.chooseHeads.bind(this));
    noClick = this.noButton.addEventListener('click', this.chooseTails.bind(this));

    this.flag = true;
  },
  
  coinFlip: function() {
      return (Math.floor(Math.random() * 2) == 0) ? "heads" : "tails";
  },

  chooseTails: function(){
    var coinResult = this.coinFlip();
    console.log(coinResult);
    if (coinResult === "heads"){
      this.displayMessage("What an idiot...");
    } else {
      this.displayMessage("Aha! Here's 20 big ones! Go forth and quench thy thirst.");
      this.player.acceptMoneyFromMan(20);
    }

    this.yesButton.remove();
    this.noButton.remove();
    this.flag = false;
    setTimeout(function(){
      this.displayMessage("");
    }.bind(this), 4000);
  },

  chooseHeads: function(){
    var coinResult = this.coinFlip();
    console.log(coinResult);
    if (coinResult === "heads"){
      this.player.acceptMoneyFromMan(20);

      this.displayMessage("Aha! Here's 20 big ones! Go forth and quench thy thirst.");
      this.statsUI = new StatsUI(this.player, this.bar);
    } else {
      this.displayMessage("What an idiot...");
    }

    this.yesButton.remove();
    this.noButton.remove();
    this.flag = false;
    setTimeout(function(){
      this.displayMessage("");
    }.bind(this), 4000);
  },

  displayMessage: function(message){
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = message;
  },

};

module.exports = InteractionUI;