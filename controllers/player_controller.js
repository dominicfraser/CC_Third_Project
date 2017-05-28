var express = require('express');

var playerRouter = express.Router();

// var Player = require('../client/src/models/player_model.js');
var Item = require('../client/src/models/item_model.js')

var DbQueryHelper = require('../db/dbQueryHelper.js');
var query = new DbQueryHelper();

//player inventory index
playerRouter.get('/', function(req,res){
  query.allPlayerItems(function(playerItems){
    res.json(playerItems);
  })
});

//delete item
playerRouter.delete("/:id", function(req, res){
  query.removePlayerItem(function(itemObject){
    res.json(itemObject);
  })
});

//add new item
playerRouter.post('/', function(req, res) {
  var item = new Item({
    name: req.body.name,
    value: req.body.value,
  });
  query.addToPlayer(item, function (results) {
    res.json(results)
  })
});




module.exports = playerRouter;