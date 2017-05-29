var ModelsContainer = require('../models/models_container')

var InventoryUI = function(player, bar){
  this.player = player;
  this.bar = bar;

  var modelsContainer = new ModelsContainer;

  modelsContainer.allPlayerItems(function(playerItems){
    this.renderPlayerItemsCount(playerItems);
  }.bind(this));
  modelsContainer.allPlayerItems(function(playerItems){
    this.renderPlayerItemsCountDropdown(playerItems);
  }.bind(this));

  // modelsContainer.allBarItems(function(barItems){
  //   this.renderBarItemsCount(barItems);
  // }.bind(this));

  };

  InventoryUI.prototype = {

    renderPlayerItemsCountDropdown: function(playerItems){
          var select = document.getElementById("player-inventory-dropdown");
          select.innerHTML = "Choose a drink to drink";

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

    renderPlayerItemsCount: function(playerItems){

     var tablePicture = document.getElementById("player-inventory-picture")

      var playerItemsWithCount = this.addCounts(playerItems)
      var playerItemsFiltered = this.filterToUniqList(playerItemsWithCount)

      for (var item of playerItemsFiltered){
        if (item.name === "Peroni"){
        var td = document.createElement('td')
        var imagePeroniButton = document.createElement('button')
        imagePeroniButton.innerHTML = "<img src = https://images-na.ssl-images-amazon.com/images/I/71wvhFzpnrL._SX385_.jpg"


          td.appendChild(imagePeroniButton);
          tablePicture.appendChild(td);

          }
        else if (item.name === "Amstel"){
        var td = document.createElement('td')
        var imageAmstel = document.createElement('img')
        imageAmstel.src = "http://www.beersofeurope.co.uk/media/catalog/product/cache/1/image/298x308/9df78eab33525d08d6e5fb8d27136e95/pimages/Amstel330ml.jpg";

          td.appendChild(imageAmstel);
          tablePicture.appendChild(td);

          } 
          else if (item.name === "Guinness"){
          var td = document.createElement('td')
          var imageGuinness = document.createElement('img')
          imageGuinness.src = "http://3.bp.blogspot.com/-DOthabqw9gQ/UtG_OpxcyFI/AAAAAAAAAEQ/yVjnr0-nO58/s1600/Guinness+single+glass.jpg";

            td.appendChild(imageGuinness);
            tablePicture.appendChild(td);

          }  
          else if (item.name === "Apple Juice"){
          var td = document.createElement('td')
          var imageAppleJuice = document.createElement('img')
          imageAppleJuice.src = "http://www.foodsafetynews.com/files/2013/07/applejuice_406.jpg";

            td.appendChild(imageAppleJuice);
            tablePicture.appendChild(td);

            } 
          else if (item.name === "Cocktail"){
          var td = document.createElement('td')
          var imageCocktail = document.createElement('img')
          imageCocktail.src = "http://az659704.vo.msecnd.net/v1/image/c_lpad,w_1500,h_1500/v1400600701/cocktail_manhattan-1.png";

            td.appendChild(imageCocktail);
            tablePicture.appendChild(td);
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