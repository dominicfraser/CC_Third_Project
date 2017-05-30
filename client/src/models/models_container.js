var PlayerModel = require("./player_model.js");
var BarModel = require("./bar_model.js");
var ItemModel = require("./item_model.js");
var RequestHelper = require("../helpers/requestHelper.js");

var ModelsContainer = function(){
  this.requestHelper = new RequestHelper;
}

ModelsContainer.prototype = {
  allPlayerItems: function(callback){
    this.requestHelper.makeGetRequest("http://localhost:3000/api/player_inventory", function(results){
      var playerItems = this.populatePlayerItems(results);
      callback(playerItems);
    }.bind(this));
  },
  populatePlayerItems: function(results){
    var playerItems = results.map(function(resultObject){
      return new ItemModel(resultObject);
    });
    return playerItems;
  },
  addPlayerItem: function(newItem, callback){
    var itemData = JSON.stringify(newItem);
    this.requestHelper.makePostRequest('http://localhost:3000/api/player_inventory', callback, itemData);
  },
  removePlayerItem: function(itemToRemove, callback){
    var id = itemToRemove.id
    var itemData = JSON.stringify(itemToRemove);
    this.requestHelper.makeDeleteRequest('http://localhost:3000/api/player_inventory/' + id, callback);
  },

  allBarItems: function(callback){
    this.requestHelper.makeGetRequest("http://localhost:3000/api/bar_inventory", function(results){
      var barItems = this.populateBarItems(results);
      callback(barItems);
    }.bind(this));
  },
  populateBarItems: function(results){
    var barItems = results.map(function(resultObject){
      return new ItemModel(resultObject);
    });
    return barItems;
  },
  addBarItem: function(newItem, callback){
    var itemData = JSON.stringify(newItem);
    this.requestHelper.makePostRequest('http://localhost:3000/api/bar_inventory', callback, itemData);
  },
  removeBarItem: function(itemToRemove, callback){
    var id = itemToRemove.id
    var itemData = JSON.stringify(itemToRemove);
    this.requestHelper.makeDeleteRequest('http://localhost:3000/api/bar_inventory/' + id, callback);
  },
  findSpecificBarItem: function(id, callback){
    // var itemToFind = "nothing here";
    this.requestHelper.makeGetRequest("http://localhost:3000/api/bar_inventory", function(results){
      var barItems = this.populateBarItems(results);
        for(item of barItems){
           if(item.id == id){
                var itemToFind = item;
            }
        }
console.log('this is a callback? in MOD CONT',callback)

      callback(itemToFind);
      
    }.bind(this));
  
  },
};
 

module.exports = ModelsContainer;