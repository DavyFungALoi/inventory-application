const Keyboard = require("../models/keyboard");
const KeyboardCategory = require("../models/keyboardCategory");
const KeyboardBrand = require("../models/keyboardBrand")
const mongoose = require("mongoose");


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