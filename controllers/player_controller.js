var express = require('express');

var playerRouter = express.Router();

// var Player = require('../client/src/models/playerInventory.js');

var DbQueryHelper = require('../db/dbQueryHelper.js');
var query = new DbQueryHelper();

//player inventory index
playerRouter.get('/', function(req,res){
  query.allPlayerItems(function(playerItems){
    res.json(playerItems)
  })
});




module.exports = playerRouter;