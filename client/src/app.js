var Map = require('./views/map.js');

var app = function () {
  new Map();
};

window.onload = app();