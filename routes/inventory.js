var express = require('express');
var router = express.Router();

var keyboard_Controller = require('../controllers/keyboardController')

/* GET home page. */


// GET inventory home page.
router.get('/', keyboard_Controller.index);


// GET request for list of all Keyboard items.
router.get('/keyboards', keyboard_Controller.keyboard_list);
/*
router.get('/', function(req, res) {
  res.get('/', keyboard_Controller.index);
});
*/

//router.get('/test', keyboard_Controller.test);
module.exports = router;
