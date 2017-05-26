var PlayerModel = require("./player_model.js");
var BarModel = require("./bar_model.js");
var ItemModel = require("./item_model.js");
var RequestHelper = require("../helpers/requestHelper.js");

var ModelsContainer = function(){
  this.requestHelper = new RequestHelper();
}

ModelsContainer.prototype = {
  allPlayerItems: function(callback){
    this.requestHelper.makeGetRequest("http://localhost:3000/api/player_inventory", function(results){
      console.log(results);
      var playerItems = this.populatePlayerItems(results);
      callback(playerItems);
    }.bind(this))
  },
}