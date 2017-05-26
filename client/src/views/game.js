var ModelsContainer = require('../models/models_container.js');

var Game = function (player, bar) {
  this.player = new Player();
  this.bar = new Bar();
};

Game.prototype = {

};


module.exports = Game;