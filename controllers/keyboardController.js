const Keyboard = require("../models/keyboard");
const KeyboardCategory = require("../models/keyboardCategory");
const KeyboardBrand = require("../models/keyboardBrand")
const mongoose = require("mongoose");


//Homepage//

exports.index = function (req, res) {
  res.render("index", { title: "Local Inventory Application Home" });
};

// Display list of all Keyboards.
exports.keyboard_list = function (req, res, next) {
  Keyboard.find({}, "name price brand category description")
    .populate("category")
    .populate("brand")
    .exec(function (err, list_keyboards) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("keyboard_list", {
        name: "Keyboard List",
        keyboard_list: list_keyboards,
      });
    });
};
