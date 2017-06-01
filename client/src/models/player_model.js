var Player = function(options){
  this.name = options.name;
  this.wallet = options.wallet;
  this.drunkLevel = 99;
}

Player.prototype = {
  subtractItemValue: function(item){
    this.wallet -= item.value;
  },
  increaseDrunkLevel: function(drink){
    if((this.drunkLevel+drink.alcoholLevel) < 0){
      this.drunkLevel = 0;
    } else {
    this.drunkLevel += drink.alcoholLevel;      
    }
  },
  acceptMoneyFromMan: function(money){
    this.wallet += money;
  },
}


module.exports = Player;