var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/api/player_inventory', require('./player_controller'));
router.use('/api/bar_inventory', require('./bar_controller'));

// router.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/../client/build/index.html'));
// })

module.exports = router;