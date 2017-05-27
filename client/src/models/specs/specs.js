var Bar = require('../bar_model.js');
var Item = require('../item_model.js');
var Player = require('../player_model.js');

var assert = require('assert');

describe('Specs', function() {
  var bar;
  var item;
  var player

  beforeEach(function() {
    bar = new Bar("Chanter", 1000);
    item = new Item()
  });

  it('should have title titanic', function() {
    assert.equal(film.title, 'Titanic');
  });
});
