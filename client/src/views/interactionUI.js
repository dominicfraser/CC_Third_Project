var Game = require('./game.js');
var InventoryUI = require('./inventoryUI.js');
var StatsUI = require('./statsUI.js');

var InteractionUI = function (player, bar) {
  this.player = player;
  this.bar = bar;

  this.flag = false;

  this.game = new Game(this.player, this.bar);
  this.inventoryUI = new InventoryUI(this.player, this.bar);
  // this.inventoryUI.addOnClickBarButtonsTellGoToBar(function(message){
  //   this.displayMessage(message);
  // }.bind(this));

};

InteractionUI.prototype = {
   
  cantGoBehindBar:function(){
    this.displayMessage("Hey! Customers can't come behind the bar. You better scram before I get the bouncer, punk. Do you REALLY want me to..?")
    var interactionArea = document.getElementById('middle');

      if(this.flag == false){
        interactionArea.appendChild(this.noButton);
        this.noButton.innerText = "NO!!!"
        noClick = this.noButton.addEventListener('click', function(){
          this.noBehindBar(this.noButton)
        }.bind(this));
  
        this.flag = true;
      }
    },  

  noBehindBar: function(noButton){
      messageDisplay = document.getElementById("interaction-message");
      messageDisplay.innerHTML = "Last chance, punk...";
  
      setTimeout(function(){
        this.displayMessage("");
        this.noButton.remove();
        this.flag = false;
      }.bind(this), 2000, this.noButton);
    },

  cantGoBehindBar:function(){
    this.displayMessage("Hey! Customers can't come behind the bar. You better scram before I get the bouncer, punk. Do you REALLY want me to..?")
    var interactionArea = document.getElementById('middle');

    if(this.flag == false){
      interactionArea.appendChild(this.noButton);
      this.noButton.innerText = "NO!!!"
      noClick = this.noButton.addEventListener('click', function(){
        this.noBehindBar(this.noButton)
      }.bind(this));

      this.flag = true;
    }
  },

  noBehindBar: function(noButton){
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = "Last chance, punk...";

    setTimeout(function(){
      this.displayMessage("");
      this.noButton.remove();
      this.flag = false;
    }.bind(this), 2000, this.noButton);
  },

  askToPlayPiano: function(){
    this.yesButton = document.createElement('button');
    this.yesButton.innerHTML = "Yes";
    this.noButton = document.createElement('button');
    this.noButton.innerHTML = "No";

    this.displayMessage("Shall we turn up the funk in here?");
    var interactionArea = document.getElementById('middle');

    if(this.flag == false){
      interactionArea.appendChild(this.yesButton);
      interactionArea.appendChild(this.noButton);

      yesClick = this.yesButton.addEventListener('click', this.playTheMusic.bind(this));
      noClick = this.noButton.addEventListener('click', function(){
        this.dontPlayTheMusic(this.yesButton, this.noButton)
      }.bind(this));

      this.flag = true;
    }
  },

  dontPlayTheMusic: function(yesButton, noButton){
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = "*Silence...*";

    setTimeout(function(){
      this.displayMessage("");
      this.yesButton.remove();
      this.noButton.remove();
      this.flag = false;
    }.bind(this), 2000, this.yesButton, this.noButton);
  },

  playTheMusic: function(){
    messageDisplay = document.getElementById("interaction-message");
    this.displayMessage("Let's get it poppin'")

    document.getElementById("audio").play();

    setTimeout(function(){
      this.displayMessage("");
      this.yesButton.remove();
      this.noButton.remove();
      this.flag = false;
    }.bind(this), 2000, this.yesButton, this.noButton);

  },

  askForDrink: function(){
    this.yesButton = document.createElement('button');
    this.yesButton.innerHTML = "Yes";
    this.noButton = document.createElement('button');
    this.noButton.innerHTML = "No";

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
    this.inventoryUI.addOnClickBarButtonsToBuyDrink(function(id){
      orderedDrinkId = id;

      if(orderedDrinkId !== null){
        this.game.findBarDrinkById(orderedDrinkId, function(itemOrdered){
          
          this.inventoryUI.addOnClickBarButtonsTellGoToBar(function(message){
            this.displayMessage(message);
          }.bind(this));

          this.game.addDrinkToPlayer(itemOrdered, function (errorMessage, updatedData) {
console.log('Trying to add drink to player')

            if(errorMessage){
              this.displayMessage(errorMessage);
            }
            else {
              this.player.subtractItemValue(itemOrdered);
              this.player.increaseDrunkLevel(itemOrdered);

              this.game.removeDrinkFromBar(itemOrdered, function (newBarList) {
console.log('Trying to remove drink from bar'); 

                this.bar.addItemValue(itemOrdered)

                this.inventoryUI = new InventoryUI(this.player, this.bar);
                this.statsUI = new StatsUI(this.player, this.bar);

                this.displayMessage("You bought a drink!");
              }.bind(this))

            }
            setTimeout(function(){
              this.displayMessage("");
              this.yesButton.remove();
              this.noButton.remove();
              this.flag = false;
            }.bind(this), 2000, this.yesButton, this.noButton);
          }.bind(this))
        }.bind(this))  
      }
    }.bind(this)); 
  },

  orderNotPlaced: function(yesButton, noButton) {
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = "Alright, then go sit over there with Dominic...";

    setTimeout(function(){
      this.displayMessage("");
      this.yesButton.remove();
      this.noButton.remove();
      this.flag = false;
    }.bind(this), 2000, this.yesButton, this.noButton);
  },

  speakToMan: function(){
    this.yesButton = document.createElement('button');
    this.yesButton.innerHTML = "Yes";
    this.noButton = document.createElement('button');
    this.noButton.innerHTML = "No";

    this.displayMessage("Hello there, would you like some money?");
    var interactionArea = document.getElementById('middle');

    if(this.flag == false){
      interactionArea.appendChild(this.yesButton);
      this.yesButton.innerText = "Heads";
      interactionArea.appendChild(this.noButton);
      this.noButton.innerText = "Tails";
    }

    yesClick = this.yesButton.addEventListener('click', this.acceptMan.bind(this));
    noClick = this.noButton.addEventListener('click', this.rejectMan.bind(this));

    this.flag = true;
  },

  coinFlip: function() {
      return (Math.floor(Math.random() * 2) == 0) ? "heads" : "tails";
  },

  rejectMan: function(){
    var coinResult = this.coinFlip();
    console.log(coinResult);
    if (coinResult === "heads"){
      messageDisplay = document.getElementById("interaction-message");
      messageDisplay.innerHTML = "What an idiot...";
    } else {
      this.displayMessage("Aha! Here's 20 big ones! Go forth and quench thy thirst.")
      this.player.acceptMoneyFromMan(20);
    }

    setTimeout(function(){
      this.displayMessage("");
      this.yesButton.remove();
      this.noButton.remove();
      this.flag = false;
    }.bind(this), 2000, this.yesButton, this.noButton);
  },
  
  acceptMan: function(){
    var coinResult = this.coinFlip();
    console.log(coinResult);
    if (coinResult === "heads"){
    this.player.acceptMoneyFromMan(20);

    messageDisplay = document.getElementById("interaction-message");
    this.displayMessage("Aha! Here's 20 big ones! Go forth and quench thy thirst.")
    this.statsUI = new StatsUI(this.player, this.bar);
  } else {
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = "What an idiot...";
  }

    setTimeout(function(){
      this.displayMessage("");
      this.yesButton.remove();
      this.noButton.remove();
      this.flag = false;
    }.bind(this), 2000, this.yesButton, this.noButton);
  },

  displayMessage: function(message){
    messageDisplay = document.getElementById("interaction-message");
    messageDisplay.innerHTML = message;
  },

};


module.exports = InteractionUI;