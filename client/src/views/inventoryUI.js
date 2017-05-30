var ModelsContainer = require('../models/models_container')

var InventoryUI = function(player, bar){
  this.player = player;
  this.bar = bar;
  
  var modelsContainer = new ModelsContainer;

  modelsContainer.allPlayerItems(function(playerItems){
    this.renderPlayerItemsImages(playerItems);
    this.renderPlayerItemsCountDropdown(playerItems);
  }.bind(this));
  

  modelsContainer.allBarItems(function(barItems){
    this.renderBarItemsCountDropdown(barItems);
    this.renderBarItemsImages(barItems);
  }.bind(this)); 

};

InventoryUI.prototype = {
  renderPlayerItemsCountDropdown: function(playerItems){
        var select = document.getElementById("player-inventory-dropdown");
        select.innerHTML = "";

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
  renderPlayerItemsImages: function(playerItems){
   var tablePicture = document.getElementById("player-inventory-picture")
   tablePicture.innerHTML = ""

    var playerItemsWithCount = this.addCounts(playerItems)
    var playerItemsFiltered = this.filterToUniqList(playerItemsWithCount)
    for (var item of playerItemsFiltered){
      if (item.name === "Beer"){
        var td = document.createElement('td')
        var imageBeerButton = document.createElement('button')
        imageBeerButton.innerHTML = "<img src = /public/img/edited_images/beer.png>";
        imageBeerButton.value = item.id;

        td.appendChild(imageBeerButton);
        tablePicture.appendChild(td);

        }
      else if (item.name === "Wine"){
        var td = document.createElement('td')
        var imageWineButton = document.createElement('button')
        imageWineButton.innerHTML = "<img src = /public/img/edited_images/wine.jpg>"
        imageWineButton.value = item.id;
        td.appendChild(imageWineButton);
        tablePicture.appendChild(td);
      } 
      else if (item.name === "Coke"){
        var td = document.createElement('td')
        var imageCokeButton = document.createElement('button')
        imageCokeButton.innerHTML = "<img src = /public/img/edited_images/coke.jpg>";
        imageCokeButton.value = item.id;
        td.appendChild(imageCokeButton);
        tablePicture.appendChild(td);

      }  
      else if (item.name === "Apple Juice"){
        var td = document.createElement('td')
        var imageAppleJuiceButton = document.createElement('button')
        imageAppleJuiceButton.innerHTML = "<img src = /public/img/edited_images/applejuice.jpg>"
        imageAppleJuiceButton.value = item.id;
        td.appendChild(imageAppleJuiceButton);
        tablePicture.appendChild(td);

      } 
      else if (item.name === "Long Island Iced Tea"){
      var td = document.createElement('td')
      var imageLongIslandIcedTeaButton = document.createElement('button')
      imageLongIslandIcedTeaButton.innerHTML = "<img src = /public/img/edited_images/longislandicedtea.png>";
      imageLongIslandIcedTeaButton.value = item.id;
      td.appendChild(imageLongIslandIcedTeaButton);
      tablePicture.appendChild(td);
      }
      else if (item.name === "Pina Colada"){
      var td = document.createElement('td')
      var imagePinaColadaButton = document.createElement('button')
      imagePinaColadaButton.innerHTML = "<img src = /public/img/edited_images/pinacolada.png>";
      imagePinaColadaButton.value = item.id;
      td.appendChild(imagePinaColadaButton);
      tablePicture.appendChild(td);
      }
      else {
      var td = document.createElement('td')
      var imageGenericButton = document.createElement('button')
      imageGenericButton.innerHTML = "<img src = /public/img/edited_images/corkboard.jpg>";
      imageGenericButton.value = item.id;
      td.appendChild(imageGenericButton);
      tablePicture.appendChild(td);
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
        var td = document.createElement('td')
        var imageDrinkButton = document.createElement('button')
        imageDrinkButton.innerHTML = "<img src = /public/img/edited_images/corkboard.jpg>"
        imageDrinkButton.value = item.id;
        td.appendChild(imageDrinkButton);
        rowInUse.appendChild(td);  
        barTable.appendChild(rowInUse);
      } 
      else {
        columnPositionCounter = 0;
        rowInUse = document.createElement('tr')

        var td = document.createElement('td')
        var imageDrinkButton = document.createElement('button')
        imageDrinkButton.innerHTML = "<img src = http://icons.iconarchive.com/icons/iconshock/brilliant-food/256/beer-icon.png>"
        imageDrinkButton.value = item.id;
        td.appendChild(imageDrinkButton);
        rowInUse.appendChild(td);  
        barTable.appendChild(rowInUse);
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

  addEventListenersBarButtons: function(callback){
console.log('inside addEvent')
    var barTable = document.getElementById("bar-inventory-table"); 
    for (var i = 0, row; row = barTable.rows[i]; i++) {
    
       for (var d = 0, td; td = row.cells[d]; d++) {
         var button = td.children[0]
         console.log(button.value)
         button.addEventListener('click', function(){
  console.log('button click', button.value)
            callback(button.value)
         })
       }  
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
};


module.exports = InventoryUI;