var Game = require('./game.js');
var InventoryUI = require('./inventoryUI.js');
var StatsUI = require('./statsUI.js');
var InteractionUI = require('./interactionUI.js');
var Player = require('../models/player_model.js');
var Bar = require('../models/bar_model.js');
var Item = require('../models/item_model.js');

var Map = function () {
  this.player = new Player({name: "Player1", wallet: 100});
  this.bar = new Bar({name: "Chanter", cashDrawer: 1000});
  this.game = new Game(this.player, this.bar);
  this.inventoryUI = new InventoryUI(this.player, this.bar);
  this.statsUI = new StatsUI(this.player, this.bar);
  this.interactionUI = new InteractionUI(this.player, this.bar);

console.log('inside main map', this)

  this.context = this.getPlayerCanvasContext();
  this.mainContext = this.getMainCanvasContext();

  this.backdrop = document.createElement('img');
  this.backdrop.src = "/public/img/edited_images/backdrop_empty.png";

  // var playerLeft = document.createElement('img');
  // playerLeft.src = "../build/public/img/edited_images/f1girl.png";

  this.playerBegin = document.createElement('img');
  this.playerBegin.src = "/public/img/edited_images/f1girl.png"
  this.playerHeight = 500;
  this.playerWidth = 700;

  this.currentPosition = [350,450];

  window.addEventListener('keydown', this.movePlayer.bind(this));
  
  window.addEventListener('keydown', this.placeOrder.bind(this));

  this.loadCanvas();
//////////////to test coords
  var canvas = document.getElementById("player-canvas");

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
      }, false);
  };  
//////////// delete after use
//END MAIN MAP 

Map.prototype = {

  placeOrder: function(e){
    if (e.key === "o"){
      console.log('inside IF of place order',this);
      this.interactionUI.askForDrink();
    };  
      // console.log('inside place order', this)
  },

  drawBar: function() {
    this.mainContext.drawImage(this.backdrop, 0, 0, 700, 500);
  },

  moveSprite: function(playerDirectionImage, xInc, yInc){
    this.drawBar();
    context.clearRect(this.currentPosition[0]-10, this.currentPosition[1]-20, 30, 40)
    context.drawImage(playerDirectionImage, this.currentPosition[0]-350+xInc, this.currentPosition[1]-250+yInc, this.playerWidth, this.playerHeight)
  },

  movePlayer: function(e){
    var context  = this.getPlayerCanvasContext();
    var positionX = this.currentPosition[0];
    var positionY = this.currentPosition[1];

    if (e.key === "ArrowRight"){

      var hitRightBorder = positionX + 5 >= 700

      var hitGuy = (positionY <= 280 && positionY >= 180) && (positionX <= 470 && positionX >= 410)

      var hitChairsTable = (positionY <= 495 && positionY >= 355) && (positionX <= 190 && positionX >=115)

      var hitPiano = (positionY <= 145 && positionY >= 45) && (positionX <= 450 && positionX >= 345)

      var hitStage = (positionY <= 160 && positionY >= 85) && (positionX <= 700 && positionX >= 485)

      var hitSofas = (positionY <= 500 && positionY >= 200) && (positionX <= 700 && positionX >= 600)

      if (hitRightBorder){
        console.log('can\'t move')
      }
      else if (hitGuy){
        return;
      }
      else if (hitChairsTable){
        return;
      }
      else if (hitChairsTable){
        return;
      }
      else if (hitPiano){
        return;
      }
      else if (hitStage){
        return;
      }
      else if (hitSofas){
        return;
      }
      else {
        this.moveSprite(this.playerBegin, 5, 0)
        this.currentPosition[0] = positionX+5
        console.log("Right")
      }
    }
    else if(e.key === "ArrowLeft"){

        console.log(positionX, positionY)

        var hitLeftBorder = ((positionX - 5) <= 0)

        var hitRightSideOfBar = (positionY <= 280 && positionY >= 0) && (positionX <= 240 && positionX >= 240)

        var hitGuy = (positionY <= 280 && positionY >= 180) && (positionX <= 470 && positionX >= 410)

        var hitChairsTable = (positionY <= 495 && positionY >= 355) && (positionX <= 190 && positionX >=115)

        var hitPiano = (positionY <= 145 && positionY >= 45) && (positionX <= 450 && positionX >= 345)

        if (hitLeftBorder){
          return;
        }
        else if (hitRightSideOfBar){
          return;
        }
        else if (hitGuy){
          return;
        }
        else if (hitChairsTable){
          return;
        }
        else if (hitPiano){
          return;
        }

        this.moveSprite(this.playerBegin, -5, 0)
        this.currentPosition[0] = positionX-5
        console.log("Left")
      }
    
    else if(e.key === "ArrowUp"){
        var hitTopBorder = ((positionY - 5) <= 0)

        var hitWallBorder = (positionX <= 700 && positionX >= 0) && (positionY <= 90 && positionY >= 90)

        var hitBottomOfBar = (positionX >= 0 && positionX <= 240) && (positionY <= 290 && positionY >= 235)

        var hitGuy = (positionY <= 280 && positionY >= 180) && (positionX <= 470 && positionX >= 410)

        var hitChairsTable = (positionY <= 495 && positionY >= 355) && (positionX <= 190 && positionX >=115)

        var hitPiano = (positionY <= 145 && positionY >= 45) && (positionX <= 450 && positionX >= 345)

        var hitStage = (positionY <= 160 && positionY >= 85) && (positionX <= 700 && positionX >= 485)

        if (hitTopBorder){
          console.log('can\'t move')
          return;
        }
        else if (hitWallBorder){
          return;
        }
        else if (hitBottomOfBar){
          console.log('can\'t move')
          return;
        }
        else if (hitGuy){
          return;
        }
        else if (hitChairsTable){
          return;
        }
        else if (hitPiano){
          return;
        }
        else if (hitStage){
          return;
        }
        this.moveSprite(this.playerBegin, 0, -5)
        this.currentPosition[1] = positionY-5
        console.log("Up")

    }
    else if(e.key === "ArrowDown"){

        var hitBottomBorder = ((positionY + 5) >= 500)
        
        var hitGuy = (positionY <= 280 && positionY >= 180) && (positionX <= 470 && positionX >= 410)

        var hitChairsTable = (positionY <= 495 && positionY >= 355) && (positionX <= 190 && positionX >=115)

        var hitSofas = (positionY <= 500 && positionY >= 200) && (positionX <= 700 && positionX >= 600)


        if (hitBottomBorder){
          return;
        }
        else if (hitGuy){
          return;
        }
        else if (hitChairsTable){
          return;
        }
        else if (hitSofas){
          return;
        }
     
        this.moveSprite(this.playerBegin, 0, +5)
        this.currentPosition[1] = positionY+5
        console.log("Down")
      }
     

    else { return; }
  },

  loadCanvas: function() {
    var backdrop = document.createElement('img');
    backdrop.src = "/public/img/edited_images/backdrop_empty.png";

    var tableSet = document.createElement('img');
    tableSet.src = "/public/img/edited_images/table_set.png";

    var sofaSetBottom = document.createElement('img');
    sofaSetBottom.src = "/public/img/edited_images/sofa_set.png";

    var sofaSetTop = document.createElement('img');
    sofaSetTop.src = "/public/img/edited_images/sofa_set.png";

    var bartender = document.createElement('img');
    bartender.src = "/public/img/edited_images/f1bartender.png";

    var stage = document.createElement('img');
    stage.src = "/public/img/edited_images/stage.png";

    var piano = document.createElement('img');
    piano.src = "/public/img/edited_images/piano.png";

    var guy = document.createElement('img');
    guy.src = "/public/img/edited_images/f1guy.png";


    context = this.getPlayerCanvasContext();
    mainContext = this.getMainCanvasContext();

    backdrop.onload = function() {
      mainContext.drawImage(this, 0, 0, 700, 500); 
    };

    tableSet.onload = function() {
      context.drawImage(this, -200, 180, 700, 500);
    };

    sofaSetTop.onload = function() {
      context.drawImage(this, 300, 35, 700, 500);
    };

    sofaSetBottom.onload = function() {
      context.drawImage(this, 300, 170, 700, 500);
    };

    bartender.onload = function() {
      context.drawImage(this, -190, -40, 700, 500);
    };

    stage.onload = function() {
      context.drawImage(this, 254, -140, 700, 500);
    };

    piano.onload = function() {
      context.drawImage(this, 50, -160, 700, 500);
    };

    guy.onload = function() {
      context.drawImage(this, 100, -30, 700, 500);
    };
  },

  getMainCanvasContext: function(){
    var canvas = document.getElementById("main-canvas");
    var context = canvas.getContext("2d");
    return context;
  },

  getPlayerCanvasContext: function(){
    var canvas = document.getElementById("player-canvas");
    var context = canvas.getContext("2d");
    return context;
  },

};


module.exports = Map;
