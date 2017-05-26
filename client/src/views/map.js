var Game = require('./game.js');
var ModelsContainer = require('../models/models_container.js');

var Map = function () {
  this.player = new Player();
  this.bar = new Bar();
  this.game = new Game(player, bar);
};


module.exports = Map;