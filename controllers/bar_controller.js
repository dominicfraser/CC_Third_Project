var express = require('express');

var barRouter = express.Router();

var Item = require('../client/src/models/item_model.js')

var DbQueryHelper = require('../db/dbQueryHelper.js');
var query = new DbQueryHelper();

//bar inventory index
barRouter.get('/', function(req,res){
  query.allBarItems(function(barItems){
    res.json(barItems)
  })
});

//delete item
barRouter.delete("/:id", function(req, res){
  query.removeBarItem(req.params.id, function(itemObject){
    res.json(itemObject);
  })
});

//add new item
barRouter.post('/', function(req, res) {
  var item = new Item({
    name: req.body.name,
    value: req.body.value,
  });
  query.addToBar(item, function (results) {
    res.json(results)
  })
});




module.exports = barRouter;