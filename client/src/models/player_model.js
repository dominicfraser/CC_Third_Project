var Player = function(options){
  this.name = options.name;
  this.wallet = options.wallet;
  this.drunkLevel = 10;
}

Player.prototype = {
  subtractItemValue: function(item){
    this.wallet -= item.value;
  },
  increaseDrunkLevel: function(drink){
    this.drunkLevel += drink.alcoholLevel;
  },
  acceptMoneyFromMan: function(money){
    this.wallet += money;
  }


}


module.exports = Player;