var express = require('express');
var router = express.Router();

var keyboard_Controller = require('../controllers/keyboardController')
var keyboardBrand_Controller = require('../controllers/keyboardBrandController')
var keyboardCategory_Controller = require('../controllers/keyboardCategoryController')

/* GET home page. */


// GET inventory home page.
router.get('/', keyboard_Controller.index);


///Keyboard individually

// GET request for list of all Keyboard items.
router.get('/keyboards', keyboard_Controller.keyboard_list);

// GET request for keyboard creation display

router.get('/keyboardcreate', keyboard_Controller.keyboard_create_display);

// POST request for keyboard creation submit
router.post('/keyboardcreate', keyboard_Controller.keyboard_create_post);

// GET request for keyboard update display

router.get('/keyboard/:id/update', keyboard_Controller.keyboard_update_get);


router.post('/keyboard/:id/update', keyboard_Controller.keyboard_update_post);

///Keyboard Brands

// GET request for list of all Keyboard Brands.

router.get('/keyboardbrands', keyboardBrand_Controller.keyboardBrand_list);

// GET request for creation of Keyboard Brands

router.get('/keyboardbrandcreate', keyboardBrand_Controller.keyboardBrand_create_display);

// POST request for keyboard creation submit
router.post('/keyboardbrandcreate', keyboardBrand_Controller.keyboardBrand_create_post);

//Get Request for Deleting items

router.get('/keyboardbrandsdetail/:id/delete', keyboardBrand_Controller.keyboardBrand_delete_get);


//Post request to delete items

router.post('/keyboardbrandsdetail/:id/delete', keyboardBrand_Controller.keyboardBrand_delete_brand);

// GET request for list of an overview of Keyboard details

router.get('/keyboardbrandsdetail/:id', keyboardBrand_Controller.keyboardBrand_detail);

//Keyboard Categories


// GET request for list of all Keyboard Categories.

router.get('/keyboardcategories', keyboardCategory_Controller.keyboardCategory_list);

// GET request for list of an overview of Keyboard categories and associated data

router.get('/keyboardcategory/:id', keyboardCategory_Controller.keyboardCategory_detail);

// GET request for displaying the form to create a new category

router.get('/keyboardcategorycreate', keyboardCategory_Controller.keyboardCategory_create_display);
 
router.post('/keyboardcategorycreate', keyboardCategory_Controller.keyboardCategory_create_post);

module.exports = router;