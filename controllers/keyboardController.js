const Keyboard = require("../models/keyboard");
const KeyboardCategory = require("../models/keyboardCategory");
const KeyboardBrand = require("../models/keyboardBrand");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const async = require("async");

//var grades = JSON.parse(req.query['grades']);
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

// Display a Form where you can Create a new keyboard

exports.keyboard_create_display = function (req, res, next) {
  async.parallel(
    {
      keyboardBrands: function (callback) {
        KeyboardBrand.find(callback);
      },
      keyboardCategories: function (callback) {
        KeyboardCategory.find(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("keyboard_create", {
        title: "Welcome to Keyboard Creation",
        keyboardBrands: results.keyboardBrands,
        keyboardCategories: results.keyboardCategories,
      });
    }
  );
};

exports.keyboard_create_post = function (req, res, next) {
  const keyboard = new Keyboard({
    name: req.body.description,
    description: req.body.description,
    category: req.body.category,
    brand: req.body.brand,
    price: req.body.price,
    numberInStock: req.body.numberInStock,
  });
    keyboard.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/inventory/keyboards");
  });
  console.log(keyboard);
  console.log(req.body.brand);
};
