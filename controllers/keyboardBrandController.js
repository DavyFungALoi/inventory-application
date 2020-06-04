const Keyboard = require("../models/keyboard");
const KeyboardCategory = require("../models/keyboardCategory");
const KeyboardBrand = require("../models/keyboardBrand")
const mongoose = require("mongoose");
const async = require('async')


// Display list of all Brands

exports.keyboardBrand_list = function (req, res, next) {
  KeyboardBrand.find({}, "name")
    .exec(function (err, list_keyboardbrands) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      console.log(list_keyboardbrands)
      res.render("keyboardBrand_list", {
        name: "KeyboardBrand List",
        keyboardbrands_list: list_keyboardbrands,
      });
    });
};

// Display detail page for a specific Brand.

exports.keyboardbrand_detail = function(req, res, next) {

  async.parallel({
      brand:function(callback) {
        KeyboardBrand.findById(req.params.id)
            .exec(callback);
      },

      brand_keyboards: function(callback) {
          Keyboard.find({ 'brand': req.params.id }).populate('category').populate('brand')
            .exec(callback);
      },

  }, function(err, results) {
      if (err) { return next(err); }
      if (results.brand==null) { // No results.
        
          var err = new Error('Brande not found');
          err.status = 404;
          return next(err);
      }
      // Successful, so render
      res.render('keyboardbrand_detail', { title: 'Brand Detail', brand: results.brand, brand_keyboards: results.brand_keyboards } );
  });

};


/* 
 async.parallel({
      brand:function(callback) {
        KeyboardBrand.findById(req.params.id)
            .exec(callback);
      },

      brand_keyboards: function(callback) {
          Keyboard.find({ 'brand': req.params.id })
            .exec(callback);
      },

  }, function(err, results) {
      console.log(results)
      if (err) { return next(err); }
      if (results.brand==null) { // No results.
        
          var err = new Error('Brande not found');
          err.status = 404;
          return next(err);
      }
      // Successful, so render
      res.render('keyboardbrand_detail', { title: 'Brand Detail', brand: results.brand, brand_keyboards: results.brand_keyboards } );
  });

};

*/