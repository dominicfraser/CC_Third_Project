var InteractionUI = function (player, bar, message) {
  this.player = player;
  this.bar = bar;
  this.message = message;

  displayMessage();



};

  InteractionUI.prototype = {

};


var displayMessage = function(){
  messageDisplay = document.getElementById("interaction-message");
  messageDisplay.innerHTML = "Would you like a drink?";
}


module.exports = InteractionUI;