const Keyboard = require("../models/keyboard");
const KeyboardCategory = require("../models/keyboardCategory");
const mongoose = require("mongoose");
const async = require('async')

// Display list of all Categories

exports.keyboardCategory_list = function (req, res, next) {
  KeyboardCategory.find({}, "name")
    .exec(function (err, list_keyboardcategories) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      console.log(list_keyboardcategories)
      res.render("keyboardCategory_list", {
        name: "KeyboardCategory List",
        keyboardbcategory_list: list_keyboardcategories,
      });
    });
};

exports.keyboardCategory_detail = function(req, res, next) {

  async.parallel({
      category:function(callback) {
        KeyboardCategory.findById(req.params.id)
            .exec(callback);
      },

      category_keyboards: function(callback) {
          Keyboard.find({ 'category': req.params.id }).populate('brand').populate('category')
            .exec(callback);
      },

  }, function(err, results) {
      console.log(results)
      if (err) { return next(err); }
      if (results.category==null) { // No results.
        
          var err = new Error('category not found');
          err.status = 404;
          return next(err);
      }
      // Successful, so render
      res.render('keyboardcategory_detail', { title: 'category Detail', category: results.category, category_keyboards: results.category_keyboards } );
  });

};