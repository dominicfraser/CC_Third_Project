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
      if (item.name === "Peroni"){
      var td = document.createElement('td')
      var imagePeroniButton = document.createElement('button')
      imagePeroniButton.innerHTML = "<img src = https://images-na.ssl-images-amazon.com/images/I/71wvhFzpnrL._SX385_.jpg>"

        td.appendChild(imagePeroniButton);
        tablePicture.appendChild(td);

        }
      else if (item.name === "Amstel"){
      var td = document.createElement('td')
      var imageAmstelButton = document.createElement('button')
      imageAmstelButton.innerHTML = "<img src = http://www.beersofeurope.co.uk/media/catalog/product/cache/1/image/298x308/9df78eab33525d08d6e5fb8d27136e95/pimages/Amstel330ml.jpg>";

        td.appendChild(imageAmstelButton);
        tablePicture.appendChild(td);

        } 
        else if (item.name === "Guinness"){
        var td = document.createElement('td')
        var imageGuinnessButton = document.createElement('button')
        imageGuinnessButton.innerHTML = "<img src = http://3.bp.blogspot.com/-DOthabqw9gQ/UtG_OpxcyFI/AAAAAAAAAEQ/yVjnr0-nO58/s1600/Guinness+single+glass.jpg>";

          td.appendChild(imageGuinnessButton);
          tablePicture.appendChild(td);

        }  
        else if (item.name === "Apple Juice"){
        var td = document.createElement('td')
        var imageAppleJuiceButton = document.createElement('button')
        imageAppleJuiceButton.innerHTML = "<img src = http://www.foodsafetynews.com/files/2013/07/applejuice_406.jpg>";

          td.appendChild(imageAppleJuiceButton);
          tablePicture.appendChild(td);

          } 
        else if (item.name === "Cocktail"){
        var td = document.createElement('td')
        var imageCocktailButton = document.createElement('button')
        imageCocktailButton.innerHTML = "<img src =http://az659704.vo.msecnd.net/v1/image/c_lpad,w_1500,h_1500/v1400600701/cocktail_manhattan-1.png>";

        td.appendChild(imageCocktailButton);
        tablePicture.appendChild(td);
      }
    }
  },

  renderBarItemsImages: function(barItems){
   var tablePicture = document.getElementById("bar-inventory-picture")
   tablePicture.innerHTML = ""
    var barItems = this.addCounts(barItems);
    var barItemsFiltered = this.filterToUniqList(barItems);

    for (var item of barItemsFiltered){
      var td = document.createElement('td')
      var imageDrinkButton = document.createElement('button')
      imageDrinkButton.innerHTML = "<img src = http://icons.iconarchive.com/icons/iconshock/brilliant-food/256/beer-icon.png>"

      td.appendChild(imageDrinkButton);
      tablePicture.appendChild(td);
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