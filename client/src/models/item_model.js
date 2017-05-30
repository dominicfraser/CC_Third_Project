var Item = function(options){
  this.name = options.name;
  this.value = options.value;
  this.id = options._id;
  this.alcoholLevel = options.alcoholLevel;
}


module.exports = Item;