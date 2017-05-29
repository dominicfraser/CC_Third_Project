var ModelsContainer = require('../models/models_container')

var InventoryUI = function(player, bar){
  this.player = player;
  this.bar = bar;

  var modelsContainer = new ModelsContainer;

  modelsContainer.allPlayerItems(function(playerItems){
    this.renderPlayerItemsCount(playerItems);
  }.bind(this));

  // modelsContainer.allBarItems(function(barItems){
  //   this.renderBarItemsCount(barItems);
  // }.bind(this));

  };

  InventoryUI.prototype = {

    renderPlayerItemsCount: function(playerItems){
      var select = document.getElementById("player-inventory");
      select.innerHTML = "";

      // var names = this.getAllNames(playerItems);
      // var playerItemsFiltered = this.filterToUniqList(names);
      var playerItemsWithCount = this.addCounts(playerItems)
      var playerItemsFiltered = this.filterToUniqList(playerItemsWithCount)

      for (var item of playerItemsFiltered){
        var option = document.createElement('option');
        option.innerText = item.name + ' (' + item.count + ')';
        option.value = item.id;
        // option.value = JSON.stringify(item);
        select.appendChild(option);
      }
    },

    addCounts: function (items) {
      for (item of items) {
        item.count = this.countItems(items, item);
      }
      return items;
    },

    countItems: function (allItems, item) {
      counter = 0
      for (var i = 0; i < allItems.length; i++){
        if (allItems[i].name == item.name)
          counter += 1;
      }
      return counter;
    },

    filterToUniqList: function(itemList){
      var itemNames = itemList.map(function (item) {
        return item.name
      })

      var filtered = itemList.filter(function (item, index)  {
        return itemNames.indexOf(item.name) == index
      })      
      return filtered
    },




    renderBarItemsCount: function(barItems){
      var select = document.getElementById("bar-inventory");
      select.innerHTML = "";

      var names = this.getAllNames(barItems);
      var barItemsFiltered = this.filterToUniqList(names);

      for (var item of barItemsFiltered){
        var option = document.createElement("option");
        option.innerText = item;
        select.appendChild(option);
      }
    },
  };

  module.exports = InventoryUI;