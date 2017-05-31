var ModelsContainer = require('../models/models_container')
var Game = require('./game.js');

var InventoryUI = function(player, bar){
  this.player = player;
  this.bar = bar;
  
  this.modelsContainer = new ModelsContainer;

  this.game = new Game(this.player, this.bar);

};

InventoryUI.prototype = {
  renderAll: function(onComplete){
    this.modelsContainer.allPlayerItems(function(playerItems){
      this.renderPlayerItemsImages(playerItems);
      this.renderPlayerItemsCountDropdown(playerItems);
console.log('onComplete before calling', onComplete )

      onComplete();

    }.bind(this));
    
    this.modelsContainer.allBarItems(function(barItems){
      this.renderBarItemsCountDropdown(barItems);
      this.renderBarItemsImages(barItems);
    }.bind(this)); 

  },

  // renderPlayerItemsCountDropdown: function(playerItems){
  //       var select = document.getElementById("player-inventory-dropdown");
  //       select.innerHTML = "";

  //       var playerItemsWithCount = this.addCounts(playerItems)
  //       var playerItemsFiltered = this.filterToUniqList(playerItemsWithCount)

  //       for (var item of playerItemsFiltered){
  //         var option = document.createElement('option');
  //         option.innerText = item.name + ' (' + item.count + ')';
  //         option.value = item.id;
  //         // option.value = JSON.stringify(item);
  //         select.appendChild(option);
  //       }
  //     },
  renderPlayerItemsImages: function(playerItems){
   var tablePicture = document.getElementById("player-inventory-picture")
   tablePicture.innerHTML = ""

    var playerItemsWithCount = this.addCounts(playerItems)
    var playerItemsFiltered = this.filterToUniqList(playerItemsWithCount)
    for (var item of playerItemsFiltered){
      if (item.name === "Beer"){
        var imageBeerButton = document.createElement('button')

        var imageBeerP = document.createElement('p')
        var imageBeerCount = document.createElement('p')
        this.setupPlayerTableCellButton(imageBeerButton, imageBeerP, item.name, item.count, imageBeerCount, "<img src = /public/img/edited_images/beer.png>");
      }
      else if (item.name === "Wine"){
        var imageWineButton = document.createElement('button')
        var imageWineP = document.createElement('p')
        var imageWineCount = document.createElement('p')
        this.setupPlayerTableCellButton(imageWineButton, imageWineP, item.name, item.count, imageWineCount, "<img src = /public/img/edited_images/wine.png>");
      } 
      else if (item.name === "Coke"){
        var imageCokeButton = document.createElement('button')
        var imageCokeP = document.createElement('p')
        var imageCokeCount = document.createElement('p')

        this.setupPlayerTableCellButton(imageCokeButton, imageCokeP, item.name, item.count, imageCokeCount, "<img src = /public/img/edited_images/coke.png>");
      }  
      else if (item.name === "Apple Juice"){
        var imageAppleJuiceButton = document.createElement('button')
        var imageAppleJuiceP = document.createElement('p')
        var imageAppleJuiceCount = document.createElement('p')

        this.setupPlayerTableCellButton(imageAppleJuiceButton, imageAppleJuiceP, item.name, item.count, imageAppleJuiceCount, "<img src = /public/img/edited_images/apple_juice.png>");
      } 
      else if (item.name === "Long Island Iced Tea"){
        var imageLongIslandIcedTeaButton = document.createElement('button')
        var imageLongIslandIcedTeaP = document.createElement('p')
        var imageLongIslandIcedTeaCount = document.createElement('p')

        this.setupPlayerTableCellButton(imageLongIslandIcedTeaButton, imageLongIslandIcedTeaP, item.name, item.count, imageLongIslandIcedTeaCount,  "<img src = /public/img/edited_images/long_island.png>");
      }
      else if (item.name === "Pina Colada"){
        var imagePinaColadaButton = document.createElement('button')
        var imagePinaColadaP = document.createElement('p')
        var imagePinaColadaCount = document.createElement('p')

        this.setupPlayerTableCellButton(imagePinaColadaButton, imagePinaColadaP, item.name, item.count, imagePinaColadaCount, "<img src = /public/img/edited_images/pina_colada.png>");

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
      columnPositionCounter += 1

      if (columnPositionCounter <= 3){
        if (item.name === "Beer"){
            var imageBeerButton = document.createElement('button')
            var imageBeerP = document.createElement('p')
            var imageBeerCount = document.createElement('p')
            this.setupBarTableCellButton(imageBeerButton, imageBeerP, item.name, item.count, imageBeerCount, "<img src = /public/img/edited_images/beer.png>",rowInUse, item);
        }
        else if (item.name === "Wine"){
          var imageWineButton = document.createElement('button')
          var imageWineP = document.createElement('p')
          var imageWineCount = document.createElement('p')
          this.setupBarTableCellButton(imageWineButton, imageWineP, item.name, item.count, imageWineCount, "<img src = /public/img/edited_images/wine.png>", rowInUse, item);
        } 
        else if (item.name === "Coke"){
          var imageCokeButton = document.createElement('button')
          var imageCokeP = document.createElement('p')
          var imageCokeCount = document.createElement('p')
          this.setupBarTableCellButton(imageCokeButton, imageCokeP, item.name, item.count, imageCokeCount, "<img src = /public/img/edited_images/coke.png>", rowInUse, item);
        }  
        else if (item.name === "Apple Juice"){
          var imageAppleJuiceButton = document.createElement('button')
          var imageAppleJuiceP = document.createElement('p')
          var imageAppleJuiceCount = document.createElement('p')
          this.setupBarTableCellButton(imageAppleJuiceButton, imageAppleJuiceP, item.name, item.count, imageAppleJuiceCount,"<img src = /public/img/edited_images/apple_juice.png>", rowInUse, item);
        } 
        else if (item.name === "Long Island Iced Tea"){
          var imageLongIslandIcedTeaButton = document.createElement('button')
          var imageLongIslandIcedTeaP = document.createElement('p')
          var imageLongIslandIcedTeaCount = document.createElement('p')
          this.setupBarTableCellButton(imageLongIslandIcedTeaButton, imageLongIslandIcedTeaP, item.name, item.count, imageLongIslandIcedTeaCount,"<img src = /public/img/edited_images/long_island.png>", rowInUse, item);
        }
        else if (item.name === "Pina Colada"){
          var imagePinaColadaButton = document.createElement('button')
          var imagePinaColadaP = document.createElement('p')
          var imagePinaColadaCount = document.createElement('p')
          this.setupBarTableCellButton(imagePinaColadaButton, imagePinaColadaP, item.name, item.count, imagePinaColadaCount,"<img src = /public/img/edited_images/pina_colada.png>", rowInUse, item);
        }
        else {
        var td = document.createElement('td')
        this.setupBarTableCellButton(imageDrinkButton, "<img src = http://icons.iconarchive.com/icons/iconshock/brilliant-food/256/beer-icon.png>", rowInUse, item)
        }
      } 

      else {
        columnPositionCounter = 0;
        rowInUse = document.createElement('tr')
        if (item.name === "Beer"){
            var imageBeerButton = document.createElement('button')
            var imageBeerP = document.createElement('p')
            var imageBeerCount = document.createElement('p')
            this.setupBarTableCellButton(imageBeerButton, imageBeerP, item.name, item.count, imageBeerCount, "<img src = /public/img/edited_images/beer.png>",rowInUse, item);
        }
        else if (item.name === "Wine"){
          var imageWineButton = document.createElement('button')
          var imageWineP = document.createElement('p')
          var imageWineCount = document.createElement('p')
          this.setupBarTableCellButton(imageWineButton, imageWineP, item.name, item.count, imageWineCount, "<img src = /public/img/edited_images/wine.png>", rowInUse, item);
        } 
        else if (item.name === "Coke"){
          var imageCokeButton = document.createElement('button')
          var imageCokeP = document.createElement('p')
          var imageCokeCount = document.createElement('p')
          this.setupBarTableCellButton(imageCokeButton, imageCokeP, item.name, item.count, imageCokeCount, "<img src = /public/img/edited_images/coke.png>", rowInUse, item);
        }  
        else if (item.name === "Apple Juice"){
          var imageAppleJuiceButton = document.createElement('button')
          var imageAppleJuiceP = document.createElement('p')
          var imageAppleJuiceCount = document.createElement('p')
          this.setupBarTableCellButton(imageAppleJuiceButton, imageAppleJuiceP, item.name, item.count, imageAppleJuiceCount, "<img src = /public/img/edited_images/apple_juice.png>", rowInUse, item);
        } 
        else if (item.name === "Long Island Iced Tea"){
          var imageLongIslandIcedTeaButton = document.createElement('button')
          var imageLongIslandIcedTeaP = document.createElement('p')
          var imageLongIslandIcedTeaCount = document.createElement('p')
          this.setupBarTableCellButton(imageLongIslandIcedTeaButton, imageLongIslandIcedTeaP, item.name, item.count, imageLongIslandIcedTeaCount, "<img src = /public/img/edited_images/long_island.png>", rowInUse, item);
        }
        else if (item.name === "Pina Colada"){
          var imagePinaColadaButton = document.createElement('button')
          var imagePinaColadaP = document.createElement('p')
          var imagePinaColadaCount = document.createElement('p')
          this.setupBarTableCellButton(imagePinaColadaButton, imagePinaColadaP, item.name, item.count, imagePinaColadaCount, "<img src = /public/img/edited_images/pina_colada.png>", rowInUse, item);
        }
        else {
        var td = document.createElement('td')
        this.setupBarTableCellButton(imageDrinkButton, "<img src = http://icons.iconarchive.com/icons/iconshock/brilliant-food/256/beer-icon.png>", rowInUse, item)
        } 
      }
    }
  },
  renderBarItemsCountDropdown: function(barItems){
    var select = document.getElementById("bar-inventory-dropdown");
    select.innerHTML = "";

    var barItemsWithCount = this.addCounts(barItems)
    var barItemsFiltered = this.filterToUniqList(barItemsWithCount)

    for (var item of barItemsFiltered){
      var option = document.createElement("option");
      option.innerText = item.name + ' (' + item.count + ')';
      option.value = item.id;
      select.appendChild(option);
    }
  },

  addOnClickBarButtonsToBuyDrink: function(callback){
    var barTable = document.getElementById("bar-inventory-table");
    var rowNumber = -1; 
    var buttonNames = [];
    for (var i = 0, row; row = barTable.rows[i]; i++) { 
       for (var d = 0, td; td = row.cells[d]; d++) {
        rowNumber += 1;
        var cellIndex = rowNumber;
        buttonNames.push(cellIndex)
        buttonNames[cellIndex] = td.children[0]
       }  
    }
    buttonNames.forEach(function(button){
      button.onclick = function(event){
console.log('button click', button.value)
        callback(button.value);
      }
    });
  },
  addOnClickBarButtonsTellGoToBar: function(callback){
console.log('in remove event listener')
    var barTable = document.getElementById("bar-inventory-table");
    var rowNumber = -1; 
    var buttonNames = [];
    for (var i = 0, row; row = barTable.rows[i]; i++) { 
       for (var d = 0, td; td = row.cells[d]; d++) {
        rowNumber += 1;
        var cellIndex = rowNumber;
        buttonNames.push(cellIndex);
        buttonNames[cellIndex] = td.children[0]
       }  
    }
console.log('all buttons?',buttonNames)
    buttonNames.forEach(function(button){
          button.onclick = function(event){
    console.log('button click remove', button.value)
            callback("Please order a drink from the bar");
          }
    });
  },
  addOnClickPlayerButtonsToDrink: function(callback){
    var playerButtons = document.getElementsByClassName("player-drink-button");
    var playerButtonsArray = Array.from(playerButtons);
console.log('playerButtons: ', playerButtons)
// console.log('Array.from(playerButtons): ', Array.from(playerButtons))

// console.log('addOnClickPlayerButtonsToDrink has been loaded')
// console.log('list of player buttons', buttonNames);
    playerButtonsArray.forEach(function(button){
          button.onclick = function(event){
console.log('onclick has been assigned to button')
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
      return item.name
    })

    var filtered = itemList.filter(function (item, index)  {
      return itemNames.indexOf(item.name) == index
    })      
    return filtered
  },

  setupPlayerTableCellButton: function(button, p, info, number, p2, src){

    var playerTablePicture = document.getElementById("player-inventory-picture")
    var td = document.createElement('td');
    p.innerText = info;
    button.innerHTML = src;
    button.value = item.id;
    button.className = "player-drink-button"
    p2.innerText = "["+number+"]";
    td.appendChild(p);
    td.appendChild(button);
    td.appendChild(p2);
    playerTablePicture.appendChild(td);
  },

  setupBarTableCellButton: function(button, p, info, number, p2, src, rowInUse, item){
    var barTablePicture = document.getElementById("bar-inventory-table")
    var td = document.createElement('td');
    p.innerText = info;
    button.innerHTML = src;
    button.value = item.id;
    p2.innerText = "["+number+"]"
    td.className += ('bar-inventory-image');
    td.appendChild(p)
    td.appendChild(button);
    td.appendChild(p2)
    rowInUse.appendChild(td);
    barTablePicture.appendChild(rowInUse);
  },
};


module.exports = InventoryUI;