var ModelsContainer = require('../models/models_container')
var Game = require('./game.js');

var InventoryUI = function(player, bar){
  this.player = player;
  this.bar = bar;
  
  this.modelsContainer = new ModelsContainer;
  this.game = new Game(this.player, this.bar);
};

InventoryUI.prototype = {
  renderAll: function(onCompletePlayer, onCompleteBar){
    this.modelsContainer.allPlayerItems(function(playerItems){
      this.renderPlayerItemsImages(playerItems);
      onCompletePlayer();
    }.bind(this));
    
    this.modelsContainer.allBarItems(function(barItems){
      this.renderBarItemsImages(barItems);
      onCompleteBar();
    }.bind(this)); 
  },

  renderPlayerItemsImages: function(playerItems){
   var tablePicture = document.getElementById("player-inventory-picture");
   tablePicture.innerHTML = "";

    var playerItemsWithCount = this.addCounts(playerItems);
    var playerItemsFiltered = this.filterToUniqList(playerItemsWithCount);
    for (var item of playerItemsFiltered){

      if (item.name === "Beer"){
        var imageBeerButton = document.createElement('button');
        this.setupPlayerTableCellButton(imageBeerButton, item.name, item.count, "<img src = /public/img/edited_images/beer.png>", item);
      }
      else if (item.name === "Wine"){
        var imageWineButton = document.createElement('button');
        this.setupPlayerTableCellButton(imageWineButton, item.name, item.count, "<img src = /public/img/edited_images/wine.png>", item);
      } 
      else if (item.name === "Coke"){
        var imageCokeButton = document.createElement('button');
        this.setupPlayerTableCellButton(imageCokeButton, item.name, item.count, "<img src = /public/img/edited_images/coke.png>", item);
      }  
      else if (item.name === "Apple Juice"){
        var imageAppleJuiceButton = document.createElement('button');
        this.setupPlayerTableCellButton(imageAppleJuiceButton, item.name, item.count, "<img src = /public/img/edited_images/apple_juice.png>", item);
      } 
      else if (item.name === "Daiquiri"){
        var imageDaiquiriButton = document.createElement('button');
        this.setupPlayerTableCellButton(imageDaiquiriButton, item.name, item.count,  "<img src = /public/img/edited_images/long_island.png>", item);
      }
      else if (item.name === "Pina Colada"){
        var imagePinaColadaButton = document.createElement('button');
        this.setupPlayerTableCellButton(imagePinaColadaButton, item.name, item.count, "<img src = /public/img/edited_images/pina_colada.png>", item);
      }
      else {
      var imageDrinkButton = document.createElement('button');
      this.setupBarTableCellButton(imageDrinkButton, item.name, item.count, "<img src = http://icons.iconarchive.com/icons/iconshock/brilliant-food/256/beer-icon.png>", item);
      }
    }
  },

  renderBarItemsImages: function(barItems){
    var barTable = document.getElementById("bar-inventory-table");
    barTable.innerHTML = "";
    var rowInUse = document.createElement("tr");

    var barItems = this.addCounts(barItems);
    var barItemsFiltered = this.filterToUniqList(barItems);

    var columnPositionCounter = 0;

    for (var item of barItemsFiltered){
      columnPositionCounter += 1;
      if (columnPositionCounter <= 3){

        this.doBarItemImagesLoop(item, rowInUse);
      
      } 
      else {
        columnPositionCounter = 0;
        rowInUse = document.createElement('tr');

        this.doBarItemImagesLoop(item, rowInUse); 
      }
    }
  },

  addOnClickBarButtonsTellGoToBar: function(callback){
    var barButtons = document.getElementsByClassName("bar-drink-button");
    var barButtonsArray = Array.from(barButtons);  
        
    barButtonsArray.forEach(function(button){
console.log('in forEach')
          button.onclick = function(event){
            callback("Don't shout, please go to the bar to order a drink!");
          }
    });
  },

  addOnClickBarButtonsToBuyDrink: function(callback){
    var barButtons = document.getElementsByClassName("bar-drink-button");
    var barButtonsArray = Array.from(barButtons);  
    barButtonsArray.forEach(function(button){
      button.onclick = function(event){
console.log('on click on bar button assigned to buy drink', button.value)
        callback(button.value);
      }
    });
  },
  addOnClickPlayerButtonsToDrink: function(callback){
    var playerButtons = document.getElementsByClassName("player-drink-button");
    var playerButtonsArray = Array.from(playerButtons);
    playerButtonsArray.forEach(function(button){
          button.onclick = function(event){
console.log('onclick has been assigned to player button to drink')
            callback(button.value);
          }
    }.bind(this));
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
      return item.name;
    })

    var filtered = itemList.filter(function (item, index)  {
      return itemNames.indexOf(item.name) == index;
    })      
    return filtered;
  },

  setupPlayerTableCellButton: function(button, info, number, src, item){
    var playerTablePicture = document.getElementById("player-inventory-picture");
    var p = document.createElement('p')
    var p2 = document.createElement('p')
    var td = document.createElement('td');
    p.innerText = info;
    button.innerHTML = src;
    button.value = item.id;
    button.className = "player-drink-button";
    p2.innerText = "["+number+"]";
    td.appendChild(p);
    td.appendChild(button);
    td.appendChild(p2);
    playerTablePicture.appendChild(td);
  },

  setupBarTableCellButton: function(button, info, number, src, rowInUse, item){
    var barTablePicture = document.getElementById("bar-inventory-table")
    var p = document.createElement('p')
    var p2 = document.createElement('p')
    var td = document.createElement('td');
    p.innerText = info;
    button.innerHTML = src;
    button.value = item.id;
    button.className = "bar-drink-button";
    p2.innerText = "["+number+"]"
    td.className += ('bar-inventory-image');
    td.appendChild(p);
    td.appendChild(button);
    td.appendChild(p2);
    rowInUse.appendChild(td);
    barTablePicture.appendChild(rowInUse);
  },

  doBarItemImagesLoop: function(item, rowInUse){
    if (item.name === "Beer"){
        var imageBeerButton = document.createElement('button');
        this.setupBarTableCellButton(imageBeerButton, item.name, item.count, "<img src = /public/img/edited_images/beer.png>",rowInUse, item);
    }
    else if (item.name === "Wine"){
      var imageWineButton = document.createElement('button');
      this.setupBarTableCellButton(imageWineButton, item.name, item.count, "<img src = /public/img/edited_images/wine.png>", rowInUse, item);
    } 
    else if (item.name === "Coke"){
      var imageCokeButton = document.createElement('button');
      this.setupBarTableCellButton(imageCokeButton, item.name, item.count, "<img src = /public/img/edited_images/coke.png>", rowInUse, item);
    }  
    else if (item.name === "Apple Juice"){
      var imageAppleJuiceButton = document.createElement('button');
      this.setupBarTableCellButton(imageAppleJuiceButton, item.name, item.count, "<img src = /public/img/edited_images/apple_juice.png>", rowInUse, item);
    } 
    else if (item.name === "Daiquiri"){
      var imageDaiquiriButton = document.createElement('button');
      this.setupBarTableCellButton(imageDaiquiriButton, item.name, item.count, "<img src = /public/img/edited_images/long_island.png>", rowInUse, item);
    }
    else if (item.name === "Pina Colada"){
      var imagePinaColadaButton = document.createElement('button');
      this.setupBarTableCellButton(imagePinaColadaButton, item.name, item.count, "<img src = /public/img/edited_images/pina_colada.png>", rowInUse, item);
    }
    else {
    var imageDrinkButton = document.createElement('button');
    this.setupBarTableCellButton(imageDrinkButton, item.name, item.count, "<img src = http://icons.iconarchive.com/icons/iconshock/brilliant-food/256/beer-icon.png>", rowInUse, item);
    }
  },

};


module.exports = InventoryUI;