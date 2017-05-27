/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(7);
var Player = __webpack_require__(6);
var Bar = __webpack_require__(3);

var Map = function () {
  this.player = new Player({
    name: "Player1",
    wallet: 100
  });
  this.bar = new Bar({
    name: "Chanter",
    cashDrawer: 1000
  });
  this.game = new Game(this.player, this.bar);

  var canvas = document.getElementById("main-canvas");
  console.log(canvas);
  var context = canvas.getContext("2d");

  var drawRectangle = function(x, y, size){
      context.fillRect(x, y, size, size)
    }
  context.fillStyle = "Salmon";

  drawRectangle(180, 180, 180)
  context.beginPath();
  context.moveTo(90,90);
  currentPosition = [90,90];
  window.addEventListener('keydown', movePlayer);

};
var getCanvasContext = function(){
  var canvas = document.getElementById("main-canvas");
  var context = canvas.getContext("2d");
  return context;
}

var movePlayer = function(e){
  var context  = getCanvasContext();
  var positionX = currentPosition[0];
  var positionY = currentPosition[1];

  if (e.key === "ArrowRight"){
    // positionX += 5

    var hitRightBorder = positionX + 5 >= 710

    var hitLeftEdgeOfSquare = (positionX + 5 >= 180) && (positionY <= 180) || (positionX + 5 >= 180) && (positionY <= 360) 

    if (hitRightBorder){
      console.log('can\'t move')
    }
    else if(hitLeftEdgeOfSquare){
      console.log('can\'t move')
    }
    else {
      context.lineTo((positionX+5), positionY)
      context.stroke()
      currentPosition[0] = positionX+5
      console.log("Right")
    }
  }
  else if(e.key === "ArrowLeft"){
    if (positionX - 5 >= 90){
      context.lineTo((positionX-5), positionY)
      context.stroke()
      currentPosition[0] = positionX-5
      console.log("Left")
  }
}
  else if(e.key === "ArrowUp"){
    if (positionY - 5 >= 90){
      context.lineTo(positionX, (positionY-5))
      context.stroke()
      currentPosition[1] = positionY-5
      console.log("Up")
  }
}
  else if(e.key === "ArrowDown"){
    if (positionY + 5 <= 610){
      context.lineTo(positionX, (positionY+5))
      context.stroke()
      currentPosition[1] = positionY+5
      console.log("Down")
  }
} else {
  return;
  }
}



module.exports = Map;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(0);

var app = function () {
  new Map();
};

window.onload = app;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var RequestHelper = function() {

}

RequestHelper.prototype = {
  makeGetRequest: function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function () {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    });
    request.send();
  },
  makePostRequest: function (url, callback, payload) {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function () {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    })
    request.send(payload);
  }
}

module.exports = RequestHelper;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Bar = function(options){
  this.name = options.name;
  this.cashDrawer = options.cashDrawer;
}


module.exports = Bar;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var Item = function(options){
  this.name = options.name;
  this.value = options.value;
}


module.exports = Item;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var PlayerModel = __webpack_require__(6);
var BarModel = __webpack_require__(3);
var ItemModel = __webpack_require__(4);
var RequestHelper = __webpack_require__(2);

var ModelsContainer = function(){
  this.requestHelper = new RequestHelper;
}

ModelsContainer.prototype = {
  allPlayerItems: function(callback){
    this.requestHelper.makeGetRequest("http://localhost:3000/api/player_inventory", function(results){
      console.log(results);
      var playerItems = this.populatePlayerItems(results);
      callback(playerItems);
    }.bind(this));
  },
  populatePlayerItems: function(results){
    var playerItems = results.map(function(resultObject){
      return new ItemModel(resultObject);
    });
    return playerItems;
  },
  allBarItems: function(callback){
    this.requestHelper.makeGetRequest("http://localhost:3000/api/bar_inventory", function(results){
      console.log(results);
      var barItems = this.populateBarItems(results);
      callback(barItems);
    }.bind(this));
  },
  populateBarItems: function(results){
    var barItems = results.map(function(resultObject){
      return new ItemModel(resultObject);
    });
    return barItems;
  }
};

module.exports = ModelsContainer;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var Player = function(options){
  this.name = options.name;
  this.wallet = options.wallet;
}


module.exports = Player;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var ModelsContainer = __webpack_require__(5)

var Game = function (player, bar) {
  this.player = player;
  this.bar = bar;

  var modelsContainer = new ModelsContainer;

  modelsContainer.allPlayerItems(function(playerItems){
    this.renderPlayerItems(playerItems);
  }.bind(this));

  modelsContainer.allBarItems(function(barItems){
    this.renderBarItems(barItems);
  }.bind(this));

};

Game.prototype = {
  renderPlayerItems: function(playerItems){
    var select = document.getElementById("player-inventory");
    select.innerHTML = "";

    for (var item of playerItems){
      var option = document.createElement('option');
      option.innerText = item.name;
      select.appendChild(option);
    }
  },

  renderBarItems: function(barItems){
    var select = document.getElementById("bar-inventory");
    select.innerHTML = "";

    for (var item of barItems){
      var option = document.createElement("option");
      option.innerText = item.name;
      select.appendChild(option);
    }
  }
};

module.exports = Game;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map