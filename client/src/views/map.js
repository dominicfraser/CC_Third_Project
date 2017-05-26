var Game = require('./game.js');
var Player = require('../models/player_model.js');
var Bar = require('../models/bar_model.js');

var Map = function () {
  this.player = new Player({
    name: "Player1",
    wallet: 100
  });
  this.bar = new Bar({
    name: "Chanter",
    cashDrawer: 1000
  });
  this.game = new Game(this.player, this.bar);

  var canvas = document.getElementById("main-canvas");
  console.log(canvas);
  var context = canvas.getContext("2d");

  var drawRectangle = function(x, y, size){
      context.fillRect(x, y, size, size)
    }
  context.fillStyle = "Salmon"

  drawRectangle(180, 180, 180)
  context.beginPath();
  context.moveTo(90,90);
  currentPosition = [90,90];
  window.addEventListener('keydown', movePlayer);

};
var getCanvasContext = function(){
  var canvas = document.getElementById("main-canvas");
  var context = canvas.getContext("2d");
  return context;
}

var movePlayer = function(e){
  var context  = getCanvasContext();
  var positionX = currentPosition[0];
  var positionY = currentPosition[1];

  if (e.key === "ArrowRight"){
    if (positionX + 5 <= 710){
      context.lineTo((positionX+5), positionY)
      context.stroke()
      currentPosition[0] = positionX+5
      console.log("Right")
    }
  }
  else if(e.key === "ArrowLeft"){
    if (positionX - 5 >= 90){
      context.lineTo((positionX-5), positionY)
      context.stroke()
      currentPosition[0] = positionX-5
      console.log("Left")
  }
}
  else if(e.key === "ArrowUp"){
    if (positionY - 5 >= 90){
      context.lineTo(positionX, (positionY-5))
      context.stroke()
      currentPosition[1] = positionY-5
      console.log("Up")
  }
}
  else if(e.key === "ArrowDown"){
    if (positionY + 5 <= 610){
      context.lineTo(positionX, (positionY+5))
      context.stroke()
      currentPosition[1] = positionY+5
      console.log("Down")
  }
} else {
  return;
  }
}



module.exports = Map;