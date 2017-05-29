var express = require('express');

var playerRouter = express.Router();

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
  query.removePlayerItem(req.params.id, function(itemObject){
    res.json(itemObject);
  })
});

//add new item
playerRouter.post('/', function(req, res) {
  console.log('request body in controller:', req.body)
  var item = new Item({
    name: req.body.name,
    value: req.body.value,
  });
  query.addToPlayer(item, function (results) {
    res.json(results)
  })
});




module.exports = playerRouter;