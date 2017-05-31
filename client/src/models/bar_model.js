var Bar = function(options){
  this.name = options.name;
  this.cashDrawer = options.cashDrawer;
}

Bar.prototype = {
  addItemValue: function(item){
    this.cashDrawer += item.value;
  },
}


module.exports = Bar;