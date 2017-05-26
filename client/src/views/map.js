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
};


module.exports = Map;