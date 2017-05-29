var InteractionUI = function (player, bar, message) {
  this.player = player;
  this.bar = bar;
  this.message = message;
};

InteractionUI.prototype = {
  askForDrink: function(){
    displayMessage("Would you like a drink?");


    var interactionArea = document.getElementById('middle');

    var yesButton = document.createElement('button');
    yesButton.innerHTML = "Yes";

    var noButton = document.createElement('button');
    noButton.innerHTML = "No";

    interactionArea.appendChild(yesButton);
    interactionArea.appendChild(noButton);

    yesClick = yesButton.addEventListener('click', orderPlaced);
    noClick = noButton.addEventListener('click', orderNotPlaced);
  },
};


var displayMessage = function(message){
  messageDisplay = document.getElementById("interaction-message");
  messageDisplay.innerHTML = message;
};

var orderPlaced = function () {
  //DO SOON
};

var orderNotPlaced = function () {
  messageDisplay = document.getElementById("interaction-message");
  messageDisplay.innerHTML = "What a loser...";
  //ADD TIMER?
};


module.exports = InteractionUI;