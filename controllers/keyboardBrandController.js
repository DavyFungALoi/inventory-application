const Keyboard = require("../models/keyboard");
const KeyboardCategory = require("../models/keyboardCategory");
const KeyboardBrand = require("../models/keyboardBrand");
const mongoose = require("mongoose");
const async = require("async");

// Display list of all Brands

exports.keyboardBrand_list = function (req, res, next) {
  KeyboardBrand.find({}, "name").exec(function (err, list_keyboardbrands) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    console.log(list_keyboardbrands);
    res.render("keyboardBrand_list", {
      name: "KeyboardBrand List",
      keyboardbrands_list: list_keyboardbrands,
    });
  });
};

// Display detail page for a specific Brand.

exports.keyboardBrand_detail = function (req, res, next) {
  async.parallel(
    {
      brand: function (callback) {
        KeyboardBrand.findById(req.params.id).exec(callback);
      },

      brand_keyboards: function (callback) {
        Keyboard.find({ brand: req.params.id })
          .populate("category")
          .populate("brand")
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.brand == null) {
        // No results.

        var err = new Error("Brande not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("keyboardbrand_detail", {
        title: "Brand Detail",
        brand: results.brand,
        brand_keyboards: results.brand_keyboards,
      });
    }
  );
};
// Display the create brand page

exports.keyboardBrand_create_display = function (req, res, next) {
  res.render("keyboardbrand_create", {
    title: "Welcome to Keyboard Brand Creation",
  });
};

exports.keyboardBrand_create_post = function (req, res, next) {
  const keyboardBrand = new KeyboardBrand({
    name: req.body.name,
  });
  KeyboardBrand.findOne({ name: req.body.name }).exec(function (
    err,
    found_brand
  ) {
    if (err) {
      return next(err);
    }
    if (found_brand) {
      res.redirect("/inventory/keyboardbrands");
      console.log("Brand already exist");
    } else {
      keyboardBrand.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/inventory/keyboardbrands");
      });
    }
  });
};
// Display brand delete form on GET.
exports.keyboardBrand_delete_get = function (req, res, next) {
  async.parallel(
    {
      keyboardbrand: function (callback) {
        KeyboardBrand.findById(req.params.id).exec(callback);
      },
      keyboardbrands_keyboards: function (callback) {
        Keyboard.find({ brand: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if ((results.brand = null)) {
        res.redirect("/inventory/brands");
      }
      res.render("keyboardbrand_delete", {
        title: "Delete Brand",
        keyboardbrand: results.keyboardbrand,
        keyboardbrands_keyboards: results.keyboardbrands_keyboards,
      });
    }
  );
};

exports.keyboardBrand_delete_brand = function (req, res, next) {
  async.parallel(
    {
      keyboardbrand: function (callback) {
        KeyboardBrand.findById(req.body.keyboardbrandid).exec(callback);
      },
      keyboardbrands_keyboards: function (callback) {
        Keyboard.find({ 'brand': req.body.keyboardbrandid }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.keyboardbrands_keyboards.length > 0) {
        res.redirect("/inventory/keyboardbrands");
        console.log(
          "you have a keyboard brand, please delete 1 a keyboard first"
        );
        return;
      } else {
        KeyboardBrand.findByIdAndRemove(req.body.keyboardbrandid),
          function deleteKeyboardBrand(err) {
            if (err) {
              return next(err);
            }
            res.redirect("/inventory/keyboardbrands");
          };
      }
    }
  );
};
