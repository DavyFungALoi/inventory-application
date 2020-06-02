const Keyboard = require("../models/keyboard");
const KeyboardCategory = require("../models/keyboardCategory");
const KeyboardBrand = require("../models/keyboardBrand")
const mongoose = require("mongoose");


// Display list of all Brands

exports.keyboardBrand_list = function (req, res, next) {
  KeyboardBrand.find({}, "name")
    .exec(function (err, list_keyboardbrands) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("keyboardBrand_list", {
        name: "KeyboardBrand List",
        keyboardbrands_list: list_keyboardbrands,
      });
    });
};