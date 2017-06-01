var Game = require('./game.js');
var InventoryUI = require('./inventoryUI.js');
var StatsUI = require('./statsUI.js');
var InteractionUI = require('./interactionUI.js');
var Player = require('../models/player_model.js');
var Bar = require('../models/bar_model.js');
var Item = require('../models/item_model.js');

var Map = function () {
  this.player = new Player({name: "Player1", wallet: 30});
  this.bar = new Bar({name: "Chanter", cashDrawer: 1000});
  this.game = new Game(this.player, this.bar);
  this.inventoryUI = new InventoryUI(this.player, this.bar);
  this.statsUI = new StatsUI(this.player, this.bar);
  this.interactionUI = new InteractionUI(this.player, this.bar);

  this.homePagePassedFlag = false;

console.log('inside Map', this)

  this.playerContext = this.getPlayerCanvasContext();
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

  this.guy = document.createElement('img');
  this.guy.src = "/public/img/edited_images/f1guy.png";

  this.bartender = document.createElement('img');
  this.bartender.src = "/public/img/edited_images/f1bartender.png";
//player
  this.player = document.createElement('img');
  this.player.src = "/public/img/edited_images/f1girl2.png";

  this.playerBegin = document.createElement('img');
  this.playerBegin.src = "/public/img/edited_images/f1girl.png";

  this.playerLeft = document.createElement('img');
  this.playerLeft.src = "/public/img/edited_images/l1girl.png";

  this.playerRight = document.createElement('img');
  this.playerRight.src = "/public/img/edited_images/r1girl.png";

  this.playerUp = document.createElement('img');
  this.playerUp.src = "/public/img/edited_images/b1girl.png";

  this.playerHeight = 500;
  this.playerWidth = 700;

  this.currentPosition = [350,450];

  window.addEventListener('keydown', this.movePlayer.bind(this));
  window.addEventListener('keydown', this.interactionsFunctions.bind(this));
  window.addEventListener('keydown', this.pauseMusic.bind(this));


  this.loadWelcomeScreen();
  window.addEventListener('keypress', this.loadCanvas.bind(this));

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
    document.activeElement.blur();
    if (e.key === "Enter" && this.interactionUI.winFlag === false){
      if(((positionX >= 370 && positionX <= 430) && (positionY === 140)))
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

  pauseMusic: function(e){
    if (e.key === "o"){
      this.interactionUI.stopMusic();
    }
},

  drawUpperCanvas: function(){
      this.playerContext.drawImage(this.tableSet, -200, 180, 700, 500);
      this.playerContext.drawImage(this.guy, 100, -30, 700, 500);
      this.playerContext.drawImage(this.piano, 50, -160, 700, 500);
      this.playerContext.drawImage(this.stage, 254, -140, 700, 500);
      this.playerContext.drawImage(this.stageGuy, 230, -160, 700, 500);
      this.playerContext.drawImage(this.stageGirl, 270, -160, 700, 500);
      this.playerContext.drawImage(this.sofaSetTop, 300, 35, 700, 500);
      this.playerContext.drawImage(this.sofaSetBottom, 300, 170, 700, 500);
  },

  moveSprite: function(playerDirectionImage, xInc, yInc){
    if (this.interactionUI.winFlag === false){
      this.player.innerHTML = "";
      this.playerContext.clearRect(this.currentPosition[0]-10, this.currentPosition[1]-20, 30, 44)
      this.playerContext.drawImage(playerDirectionImage, this.currentPosition[0]-350+xInc, this.currentPosition[1]-250+yInc, this.playerWidth, this.playerHeight)
      this.drawUpperCanvas();
  // console.log('current x', this.currentPosition[0])
  // console.log('current y', this.currentPosition[1])
    }
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
        this.moveSprite(this.playerRight, 5, 0);
        this.currentPosition[0] = positionX+5;
      }
    }
    
    else if(e.key === "ArrowLeft"){
        var hitLeftBorder = ((positionX - 5) <= 5);
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

        this.moveSprite(this.playerLeft, -5, 0);
        this.currentPosition[0] = positionX-5;
      }
    
    else if(e.key === "ArrowUp"){
        var hitTopBorder = ((positionY - 5) <= 0);
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
        var hitBottomBorder = ((positionY + 5) >= 500);
        var hitGuy = (positionY === 210) && (positionX <= 470 && positionX >= 430);
        var hitSofas = (positionY === 205) && (positionX <= 700 && positionX >= 605);
        var hitBottomBorder = ((positionY + 5) >= 485);
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

      this.moveSprite(this.playerBegin, 0, +5);
      this.currentPosition[1] = positionY+5;
    }
     
    else { return; }
  },


  loadCanvas: function(e) {
    if ((e.key === "Enter" && this.homePagePassedFlag === false) || (e.key === "Enter" && this.interactionUI.winFlag === true)){

      if(this.interactionUI.winFlag === true){
        this.interactionUI.displayMessage("Here we go again!");
        this.interactionUI.stopWinMusic();        
      } else {
        this.interactionUI.displayMessage("Welcome to Thursday nights at CodeClan!");        
      }

      this.interactionUI.winFlag = false
      this.homePagePassedFlag = true;
      this.currentPosition = [350,450];

      this.mainContext.clearRect(0, 0, 700, 500);
      this.playerContext.clearRect(0, 0, 700, 500);

      if (this.homePagePassedFlag = true){
        var player = document.createElement('img');
        player.src = "/public/img/edited_images/f1girl2.png";
      } 

      this.mainContext.drawImage(this.backdrop, 0, 0, 700, 500);
      this.playerContext.drawImage(this.tableSet, -200, 180, 700, 500);
      this.playerContext.drawImage(this.sofaSetTop, 300, 35, 700, 500);
      this.playerContext.drawImage(this.sofaSetBottom, 300, 170, 700, 500);
      this.playerContext.drawImage(this.bartender, -190, -40, 700, 500);
      this.playerContext.drawImage(this.stage, 254, -140, 700, 500);
      this.playerContext.drawImage(this.stageGuy, 230, -160, 700, 500);
      this.playerContext.drawImage(this.stageGirl, 270, -160, 700, 500);
      this.playerContext.drawImage(this.piano, 50, -160, 700, 500);
      this.playerContext.drawImage(this.guy, 100, -30, 700, 500);
      this.playerContext.drawImage(this.player, 0, 200, 700, 500);

      }
    else {return};
  },

  getMainCanvasContext: function(){
    var canvas = document.getElementById("main-canvas");
    var mainContext = canvas.getContext("2d");
    return mainContext;
  },

  getPlayerCanvasContext: function(){
    var canvas = document.getElementById("player-canvas");
    var playerContext = canvas.getContext("2d");
    return playerContext;
  },

};


module.exports = Map;