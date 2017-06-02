var Game = require('./game.js');
var InventoryUI = require('./inventoryUI.js');
var StatsUI = require('./statsUI.js');

var InteractionUI = function (player, bar) {
  this.player = player;
  this.bar = bar;

  this.winFlag = false;
  this.buttonsAppendedToInteractionFlag = false;
  this.inInteractionFlag = false;

  this.game = new Game(this.player, this.bar);
  this.inventoryUI = new InventoryUI(this.player, this.bar);
  
  this.inventoryUI.renderAll(this.playerDrinkDrinkSetUp.bind(this), this.barButtonDefaultSetup.bind(this));
};

InteractionUI.prototype = {

  createNewYesNoButtons: function(){
    this.yesButton = document.createElement('button');
    this.yesButton.innerHTML = "Yes";
    this.noButton = document.createElement('button');
    this.noButton.innerHTML = "No";
  },

  winMusic: function(){
    var music = document.getElementById("winAudio");
    music.play();
  },

  stopWinMusic: function(){
    var music = document.getElementById("winAudio");
    music.pause();
  },

  stopPianoMusic: function(){
    var music = document.getElementById("audio");
    music.pause();
    this.displayMessage("Who turned the music off?!");

    setTimeout(function(){
      this.displayMessage("");
      this.buttonsAppendedToInteractionFlag = false;
    }.bind(this), 2000);
  },

//try to go behind bar   
  cantGoBehindBar:function(){
    if (this.inInteractionFlag === false){
      this.inInteractionFlag = true;

      this.displayMessage("Hey! Customers can't come behind the bar. You better scram before I get the bouncer, punk. Do you REALLY want me to..?")
      var interactionArea = document.getElementById('middle-interaction');

        if(this.buttonsAppendedToInteractionFlag == false){
          this.createNewYesNoButtons();
          interactionArea.appendChild(this.noButton);
          this.noButton.innerText = "NO!!!";
          noClick = this.noButton.addEventListener('click', function(){
            this.noBehindBar(this.noButton);
          }.bind(this));
          this.buttonsAppendedToInteractionFlag = true;
        }
      }
    },  
  noBehindBar: function(noButton){
      this.displayMessage("Last chance, punk...");
      this.noButton.remove();
      setTimeout(function(){
        this.displayMessage("");
        this.buttonsAppendedToInteractionFlag = false;
        this.inInteractionFlag = false;

      }.bind(this), 2000, this.noButton);
    },

//interact at the piano
  askToPlayPiano: function(){
    if (this.inInteractionFlag === false){
      this.inInteractionFlag = true;

      this.displayMessage("Shall we turn up the funk in here?");
      var interactionArea = document.getElementById('middle-interaction');

      if(this.buttonsAppendedToInteractionFlag === false){
        this.createNewYesNoButtons();
        interactionArea.appendChild(this.yesButton);
        interactionArea.appendChild(this.noButton);

        yesClick = this.yesButton.addEventListener('click', this.playTheMusic.bind(this));
        noClick = this.noButton.addEventListener('click', function(){
        this.dontPlayTheMusic(this.yesButton, this.noButton);
      }.bind(this));

        this.buttonsAppendedToInteractionFlag = true;
      }
    }
  },
  dontPlayTheMusic: function(yesButton, noButton){
    this.displayMessage("*Silence...*");
    this.yesButton.remove();
    this.noButton.remove();
    this.buttonsAppendedToInteractionFlag = false;
    setTimeout(function(){
      this.displayMessage("");
      this.inInteractionFlag = false;
    }.bind(this), 4000);
  },
  playTheMusic: function(){
    this.displayMessage("Let's get it poppin'");
    document.getElementById("audio").play();
    this.yesButton.remove();
    this.noButton.remove();
    this.buttonsAppendedToInteractionFlag = false;

    setTimeout(function(){
      this.displayMessage("");
      this.inInteractionFlag = false;
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

                if(this.player.drunkLevel >= 100){
                  this.game.renderWinScreen();
                  this.winMusic();
                  this.displayMessage("Chanter Wins!");
                  this.winFlag = true;
                } else {
                  this.displayMessage("You drank a drink!");
                  setTimeout(function(){
                    this.displayMessage("");
                  }.bind(this), 3000);
                }

        }.bind(this))

      }.bind(this))
    }.bind(this))
  },

// set up default onclick for bar buttons
  barButtonDefaultSetup: function(){
    this.inventoryUI.addOnClickBarButtonsTellGoToBar(function(message){
      this.displayMessage(message);
      setTimeout(function(){
        this.displayMessage("");
      }.bind(this), 2000);
    }.bind(this));
  },

//interact at bar
  askForDrink: function(){
    if (this.inInteractionFlag === false){
      this.inInteractionFlag = true;
      
      this.createNewYesNoButtons();
      this.displayMessage("Would you like a drink?");
      var interactionArea = document.getElementById('middle-interaction');

      if(this.buttonsAppendedToInteractionFlag == false){
        interactionArea.appendChild(this.yesButton);
        interactionArea.appendChild(this.noButton);

        yesClick = this.yesButton.addEventListener('click', this.orderPlaced.bind(this));
        noClick = this.noButton.addEventListener('click', function(){
          this.orderNotPlaced(this.yesButton, this.noButton);
        }.bind(this));

        this.buttonsAppendedToInteractionFlag = true;
      }
    }
  },
  orderPlaced: function() {
    this.displayMessage("Please select your drink from the bar inventory");
    this.yesButton.remove();
    this.noButton.remove();
    this.buttonsAppendedToInteractionFlag = false;
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

            setTimeout(function(){
              this.displayMessage("");
              this.inInteractionFlag = false;
            }.bind(this), 4000);
          }.bind(this))
        }.bind(this))  
      }
    }.bind(this)); 
  },
  orderNotPlaced: function(yesButton, noButton) {
    this.displayMessage("Alright then, go sit over there with Dominic...");

    this.yesButton.remove();
    this.noButton.remove();
    this.buttonsAppendedToInteractionFlag = false;
    setTimeout(function(){
      this.displayMessage("");
      this.inInteractionFlag = false;
    }.bind(this), 2000);
  },

//interact with man
  speakToMan: function(){
    if (this.inInteractionFlag === false){
      this.inInteractionFlag = true;
      
      this.createNewYesNoButtons();
      this.displayMessage("I'll give you some money if you choose correctly!");
      var interactionArea = document.getElementById('middle-interaction');

      if(this.buttonsAppendedToInteractionFlag == false){
        interactionArea.appendChild(this.yesButton);
        this.yesButton.innerText = "Heads";
        this.yesButton.style.width = "100px"
        interactionArea.appendChild(this.noButton);
        this.noButton.innerText = "Tails";
        this.noButton.style.width = "100px"
        this.buttonsAppendedToInteractionFlag = true;
      }

      yesClick = this.yesButton.addEventListener('click', this.chooseHeads.bind(this));
      noClick = this.noButton.addEventListener('click', this.chooseTails.bind(this));
    }
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
    this.buttonsAppendedToInteractionFlag = false;
    setTimeout(function(){
      this.displayMessage("");
      this.inInteractionFlag = false;
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
    this.buttonsAppendedToInteractionFlag = false;
    setTimeout(function(){
      this.displayMessage("");
      this.inInteractionFlag = false;
    }.bind(this), 4000);
  },

  displayMessage: function(message){
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = message;
  },

};

module.exports = InteractionUI;