var Bar = require('../bar_model.js');
var Item = require('../item_model.js');
var Player = require('../player_model.js');

var assert = require('assert');

describe('Specs', function() {
  var bar;
  var item;
  var player

  beforeEach(function() {
    bar = new Bar({name: "Chanter", cashDrawer: 1000});
    item = new Item({name: "Amstel", value: 5});
    player = new Player({name: "David", wallet: 100});
  });

  it('bar should have name of Chanter', function() {
    assert.equal(bar.name, 'Chanter');
  });

  it('bar should have 1000 in cash drawer', function() {
    assert.equal(bar.cashDrawer, 1000);
  });

  it('item should have name of Amstel', function() {
    assert.equal(item.name, 'Amstel');
  });

  it('item should have value of 5', function() {
    assert.equal(item.value, 5);
  });

  it('player should have name of David', function() {
    assert.equal(player.name, "David");
  });

  it('player should have wallet value of 100', function() {
    assert.equal(player.wallet, 100);
  });
});
