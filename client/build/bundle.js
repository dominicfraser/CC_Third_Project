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

  context = getCanvasContext();

  context.beginPath();
  context.moveTo(90,90);
  currentPosition = [90,90];
  window.addEventListener('keydown', movePlayer);

  loadCanvas();


};

var loadCanvas = function() {
  var backdrop = document.createElement('img');
  backdrop.src = "/public/img/bar_full_img.png";

  context = getCanvasContext();

  backdrop.onload = function() {
    context.drawImage(this, 0, 0, 700, 500);
    // drawMap();
  }; 
};

  // drawMap = function() {
  //   context.drawImage(backdrop, 0, 0, 700, 500);
  // };

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
  };


};



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
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

var Bar = function(options){
  this.name = options.name;
  this.cashDrawer = options.cashDrawer;
}


module.exports = Bar;

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

var Player = function(options){
  this.name = options.name;
  this.wallet = options.wallet;
}


module.exports = Player;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var Game = function (player, bar) {
  this.player = player;
  this.bar = bar;
};

Game.prototype = {

};

module.exports = Game;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map