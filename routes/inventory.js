var express = require('express');
var router = express.Router();

var keyboard_Controller = require('../controllers/keyboardController')
var keyboardBrand_Controller = require('../controllers/keyboardBrandController')
var keyboardCategory_Controller = require('../controllers/keyboardCategoryController')

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


// GET request for list of all Keyboard Brands.

router.get('/keyboardbrands', keyboardBrand_Controller.keyboardBrand_list);

// GET request for list of an overview of Keyboard brands and associated data

router.get('/keyboardbrandsdetail/:id', keyboardBrand_Controller.keyboardbrand_detail);

// GET request for list of all Keyboard Categories.

router.get('/keyboardcategories', keyboardCategory_Controller.keyboardCategory_list);

// GET request for list of an overview of Keyboard categories and associated data

router.get('/keyboardcategory/:id', keyboardCategory_Controller.keyboardCategory_detail);
