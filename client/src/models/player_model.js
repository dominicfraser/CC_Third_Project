var Player = function(options){
  this.name = options.name;
  this.wallet = options.wallet;
  this.drunkLevel = 10;
}

Player.prototype = {
  subtractItemValue: function(item){
    this.wallet -= item.value;
  }


}


module.exports = Player;