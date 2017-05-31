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
//canvas image setup
  this.backdrop = document.createElement('img');
  this.backdrop.src = "/public/img/edited_images/backdrop_empty.png";

  this.guy = document.createElement('img');
  this.guy.src = "/public/img/edited_images/f1guy.png";

  this.tableSet = document.createElement('img');
  this.tableSet.src = "/public/img/edited_images/table_set.png";

  this.piano = document.createElement('img');
  this.piano.src = "/public/img/edited_images/piano.png";

  this.stage = document.createElement('img');
  this.stage.src = "/public/img/edited_images/stage.png";

  this.stageGuy = document.createElement('img');
  this.stageGuy.src = "/public/img/edited_images/stage_guy.png"; 

  this.stageGirl = document.createElement('img');
  this.stageGirl.src = "/public/img/edited_images/stage_girl.png";     

  this.sofaSetBottom = document.createElement('img');
  this.sofaSetBottom.src = "/public/img/edited_images/sofa_set.png";

  this.sofaSetTop = document.createElement('img');
  this.sofaSetTop.src = "/public/img/edited_images/sofa_set.png";

  this.player = document.createElement('img');
  this.player.src = "/public/img/edited_images/f1girl2.png";

  this.playerBegin = document.createElement('img');
  this.playerBegin.src = "/public/img/edited_images/f1girl.png"

  this.playerLeft = document.createElement('img');
  this.playerLeft.src = "/public/img/edited_images/l1girl.png"

  this.playerRight = document.createElement('img');
  this.playerRight.src = "/public/img/edited_images/r1girl.png"

  this.playerUp = document.createElement('img');
  this.playerUp.src = "/public/img/edited_images/b1girl.png"

  this.playerHeight = 500;
  this.playerWidth = 700;

  this.currentPosition = [350,450];

  window.addEventListener('keydown', this.movePlayer.bind(this));
  window.addEventListener('keydown', this.interactionsFunctions.bind(this));


  this.loadWelcomeScreen();
  window.addEventListener('keypress', this.loadCanvas.bind(this));

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
//////////// delete after use
  };                          //END MAIN MAP 

Map.prototype = {

  loadWelcomeScreen: function(){
    var bouncer = document.createElement('img');
    bouncer.src = "/public/img/edited_images/bouncer.jpg";

    mainContext = this.getMainCanvasContext();

    bouncer.onload = function() {
      mainContext.drawImage(this, 165, 90, 360, 300);
    }

    this.interactionUI.displayMessage("If you are over 18, please press Enter.");
  },

  interactionsFunctions: function(e){
    var positionX = this.currentPosition[0];
    var positionY = this.currentPosition[1];
    if (e.key === "Enter"){
      if(((positionX >= 370 && positionX <= 430) && (positionY >= 145 && positionY <= 145)))
      {
        this.interactionUI.askToPlayPiano();
      }
      else if(((positionX >= 10 && positionX <= 230) && (positionY >= 290 && positionY <= 290)) 
        || 
        ((positionX >= 240 && positionX <= 240) && (positionY >= 160 && positionY <= 280)))
      {
        this.interactionUI.askForDrink();
      }
      else if(((positionX >= 400 && positionX <= 490) && (positionY >= 170 && positionY <= 290))) 
      {
       this.interactionUI.speakToMan();
     }
    } 
    else if (e.key === "ArrowLeft"){
        if(((positionX <= 240) && (positionY >= 95 && positionY <= 145)))
        {
          this.interactionUI.cantGoBehindBar();
        }
      }
    else {return}
  },

  drawUpperCanvas: function(){
      context.drawImage(this.tableSet, -200, 180, 700, 500);
      context.drawImage(this.guy, 100, -30, 700, 500);
      context.drawImage(this.piano, 50, -160, 700, 500);
      context.drawImage(this.stage, 254, -140, 700, 500);
      context.drawImage(this.stageGuy, 230, -160, 700, 500);
      context.drawImage(this.stageGirl, 270, -160, 700, 500);
      context.drawImage(this.sofaSetTop, 300, 35, 700, 500);
      context.drawImage(this.sofaSetBottom, 300, 170, 700, 500);
  },

  moveSprite: function(playerDirectionImage, xInc, yInc){
    this.player.innerHTML = "";
    context.clearRect(this.currentPosition[0]-10, this.currentPosition[1]-20, 30, 44)
    context.drawImage(playerDirectionImage, this.currentPosition[0]-350+xInc, this.currentPosition[1]-250+yInc, this.playerWidth, this.playerHeight)
    this.drawUpperCanvas();
console.log('current x', this.currentPosition[0])
console.log('current y', this.currentPosition[1])
  },

  movePlayer: function(e){
    var positionX = this.currentPosition[0];
    var positionY = this.currentPosition[1];

    if (e.key === "ArrowRight"){
      var hitRightBorder = ((positionX + 5) >= 700);
      var hitGuy = (positionY <= 260 && positionY >= 215) && (positionX === 425);
      var hitChairsTable = (positionY <= 495 && positionY >= 385) && (positionX === 115);
      var hitPiano = (positionY <= 135 && positionY >= 45) && (positionX === 350);
      var hitStage = (positionY <= 155 && positionY >= 85) && (positionX === 490);
      var hitSofas = (positionY <= 500 && positionY >= 235) && (positionX === 600);

      if (hitRightBorder){
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
        this.moveSprite(this.playerRight, 5, 0)
        this.currentPosition[0] = positionX+5
      }
    }
    
    else if(e.key === "ArrowLeft"){
        var hitLeftBorder = ((positionX - 5) <= 5)
        var hitRightSideOfBar = (positionY <= 275 && positionY >= 0) && (positionX <= 240 && positionX >= 240);
        var hitGuy = (positionY <= 260 && positionY >= 215) && (positionX === 475);
        var hitChairsTable = (positionY <= 495 && positionY >= 385) && (positionX === 185);
        var hitPiano = (positionY <= 135 && positionY >= 45) && (positionX === 445);

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

        this.moveSprite(this.playerLeft, -5, 0)
        this.currentPosition[0] = positionX-5
      }
    
    else if(e.key === "ArrowUp"){
        var hitTopBorder = ((positionY - 5) <= 0)
        var hitWallBorder = (positionX <= 700 && positionX >= 0) && (positionY <= 90 && positionY >= 90);
        var hitBottomOfBar = (positionX >= 0 && positionX <= 235) && (positionY <= 290 && positionY >= 235);
        var hitGuy = (positionY === 265) && (positionX <= 470 && positionX >= 430);
        var hitChairsTable = (positionY === 480) && (positionX <= 190 && positionX >=115);
        var hitPiano = (positionY === 140) && (positionX <= 440 && positionX >= 355);
        var hitStage = (positionY === 160) && (positionX <= 700 && positionX >= 495);

        if (hitTopBorder){
          return;
        }
        else if (hitWallBorder){
          return;
        }
        else if (hitBottomOfBar){
          return;
        }
        else if (hitGuy){
          return;
        }
// else if (hitChairsTable){
//   return;
// }
        else if (hitPiano){
          return;
        }
        else if (hitStage){
          return;
        }
        this.moveSprite(this.playerUp, 0, -5)
        this.currentPosition[1] = positionY-5
    }
    
    else if(e.key === "ArrowDown"){
        var hitBottomBorder = ((positionY + 5) >= 500)
        var hitGuy = (positionY === 210) && (positionX <= 470 && positionX >= 430);
        var hitSofas = (positionY === 205) && (positionX <= 700 && positionX >= 605);
        var hitBottomBorder = ((positionY + 5) >= 485)
        var hitChairsTable = (positionY === 385) && (positionX <= 180 && positionX >=120);
        var hitSofas = (positionY === 230) && (positionX <= 700 && positionX >= 605);

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
    }
     
    else { return; }
  },

  loadCanvas: function(e) {
    if (e.key === "Enter"){

      mainContext.clearRect(0, 0, 700, 500);

      var backdrop = document.createElement('img');
      backdrop.src = "/public/img/edited_images/backdrop_empty.png";

      var tableSet = document.createElement('img');
      tableSet.src = "/public/img/edited_images/table_set.png";

      var player = document.createElement('img');
      player.src = "/public/img/edited_images/f1girl2.png";

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

      var stageGuy = document.createElement('img');
      stageGuy.src = "/public/img/edited_images/stage_guy.png";  

      var stageGirl = document.createElement('img');
      stageGirl.src = "/public/img/edited_images/stage_girl.png";    

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

      stageGuy.onload = function() {
        context.drawImage(this, 230, -160, 700, 500);
      };

      stageGirl.onload = function() {
        context.drawImage(this, 270, -160, 700, 500);
      };

      piano.onload = function() {
        context.drawImage(this, 50, -160, 700, 500);
      };

      guy.onload = function() {
        context.drawImage(this, 100, -30, 700, 500);
      };

      player.onload = function() {
        context.drawImage(this, 0, 200, 700, 500);
      };
    }
    else {return};
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
