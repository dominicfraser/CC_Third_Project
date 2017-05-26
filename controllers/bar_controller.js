var express = require('express');

var barRouter = express.Router();

var BarInventory = require('../client/src/models/barInventory.js');

var DbQueryHelper = require('../db/dbQueryHelper.js');
var query = new DbQueryHelper();

//bar inventory index
barRouter.get('/', function(req,res){
  query.allBarItems(function(barItems){
    res.json(barItems)
  })
});




module.exports = barRouter;