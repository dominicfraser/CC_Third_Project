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
      console.log('renderPlayerItemsCount')
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
      console.log('filterToUniqList', itemList)
      var itemNames = itemList.map(function (item) {
        return item.name
      })

      var filtered = itemList.filter(function (item, index)  {
        console.log(item, index)
        console.log(itemNames.indexOf(item.name) == index)

        return itemNames.indexOf(item.name) == index
      })
      console.log(filtered)
      return filtered
      // return itemList.filter(function(item, i) {
      //   return itemList.indexOf?(item) == i;
      // });
    },

    // filterToUniqList: function(itemList){
    //   return itemList.filter(function(item, i) {
    //     return itemList.indexOf(item) == i; });
    // },

    // NO ID VERSION
    // getAllNames: function(itemList){
    //   var list = [];
    //   for (var item of itemList) { 
    //     var count = this.countItems(itemList, item)
    //     list.push(item.name + " (" + count + ")")
    //   }
    //   return list
    // },

    // filterToUniqList: function(itemList){
    //   return itemList.filter(function(v,i) {
    //     return itemList.indexOf(v) == i; });
    // },

    // renderBarItems: function(barItems){
    //   var select = document.getElementById("bar-inventory");
    //   select.innerHTML = "";

    //   for (var item of barItems){
    //     var count = this.countItems(barItems, item)
    //     var option = document.createElement("option");
    //     option.innerText = item.name + " (" + count + ")";
    //     select.appendChild(option);
    //   }
    // },

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