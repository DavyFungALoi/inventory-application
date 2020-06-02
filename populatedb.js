#! /usr/bin/env node

console.log(
  "This script populates some test keyboards to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
const Keyboard = require("./models/keyboard");
const KeyboardCategory = require("./models/keyboardCategory");
const KeyboardBrand = require("./models/keyboardBrand");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let Keyboards = [];
let KeyboardCategories = [];
let KeyboardBrands = [];

function keyboardCreate(
  name,
  description,
  category,
  brand,
  price,
  numberInStock,
  cb
) {
  keyboarddetail = {
    name: name,
    description: description,
    category: category,
    brand: brand,
    price: price,
    numberInStock: numberInStock,
  };
  //if (genre != false) bookdetail.genre = genre;

  var keyboard = new Keyboard(keyboarddetail);
  keyboard.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Keyboard: " + keyboard);
    Keyboards.push(keyboard);
    cb(null, keyboard);
  });
}

function keyboardCategoryCreate(name, cb) {
  const keyboardCategorydetail = new KeyboardCategory({ name: name });
  keyboardCategorydetail.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New KeyboardCategory: " + keyboardCategorydetail);
    KeyboardCategories.push(keyboardCategorydetail);
    cb(null, keyboardCategorydetail);
  });
}

function keyboardBrandCreate(name, cb) {
  branddetail = { name: name };

  var keyboardBrand = new KeyboardBrand(branddetail);

  keyboardBrand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New keyboardBrand: " + keyboardBrand);
    KeyboardBrands.push(keyboardBrand);
    cb(null, keyboardBrand);
  });
}

function createKeyboards(cb) {
  async.parallel(
    [
      function (callback) {
        keyboardCreate(
          "Keychron K4 Wireless Mechanical Keyboard",
          "K4 has full-size functionality in a compact design with 100 necessary keys. Featuring two premium switch options enabling peak productivity and a great tactile typing experience.",
          KeyboardCategories[0],
          KeyboardBrands[1],
          "69",
          "2",
          callback
        );
      },
      function (callback) {
        keyboardCreate(
          "Apple Magic Keyboard QWERTY",
          "Take care of your daily tasks faster and more accurately with the Apple Magic Keyboard. The new scissor mechanism gives you a more comfortable keyboard with fewer typos. The Magic keyboard connects to your Mac or PC wirelessly via Bluetooth. There's no need to worry about battery life. One full battery charge gives you a month of keyboard usage without you needing to recharge it.",
          KeyboardCategories[1],
          KeyboardBrands[0],
          "99",
          "3",
          callback
        );
      },
      function (callback) {
        keyboardCreate(
          "Logitech K120 Keyboard QWERTY",
          "With the Logitech K120 keyboard, you can type comfortably and silently. The keys are low profile and barely make any sound. This way, you won't bother anyone when you're typing fanatically. Thanks to the spill-resistant design, you won't have to worry if you accidentally spill the contents of your cup on the keyboard. The retractable feet ensure the keyboard is positioned in an 8-degree angle, so your hands can rest on the keyboard in a comfortable position. You simply connect the keyboard to your desktop, laptop, or netbook via the USB port",
          KeyboardCategories[1],
          KeyboardBrands[2],
          "25",
          "5",
          callback
        );
      },
      function (callback) {
        keyboardCreate(
          "Logitech G815 Lightsync RGB Mechanical Gaming Keyboard GL Tactile QWERTY",
          "With the Logitech G815 Lightsync RGB Mechanical Gaming Keyboard GL Tactile you assure yourself of a place in the top 3 of every game. Professional gamers cannot do without a keyboard with mechanical keys and for a reason. The Logitech G815 has mechanical keys, which means that the keystrokes are registered with the highest precision every time. A mechanical keyboard does that faster than a keyboard without mechanical switches. You also get a nice feedback from the keyboard so that you hear and feel that you have pressed the key. In addition, with the G815 you have programmable keys, to which you link macros. Synchronize the RGB lighting of the keyboard with your games to give your setup a professional look.",
          KeyboardCategories[0],
          KeyboardBrands[2],
          "174",
          "0",
          callback
        );
      },
      function (callback) {
        keyboardCreate(
          "Ducky ONE 2 Mini Gaming, MX-Blue, RGB-LED, Black",
          "The new bezel design shares a similar sleek frame as it's predecessor, but the One 2 Mini incorporates dual colors on the bezel to match all varieties of keycap colorways. To stand out in the crowd we chose to use PBT seamless double-shot keycaps. It is designed and engineered in a way to provide the user with the best durability and typing experience.",
          KeyboardCategories[0],
          KeyboardBrands[3],
          "132",
          "5",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createKeyboardsCategory(cb) {
  async.parallel(
    [
      function (callback) {
        keyboardCategoryCreate("Mechanical", callback);
      },
      function (callback) {
        keyboardCategoryCreate("Regular", callback);
      },
    ],
    cb
  );
}

function createKeyboardsBrand(cb) {
  async.parallel(
    [
      function (callback) {
        keyboardBrandCreate("Apple", callback);
      },
      function (callback) {
        keyboardBrandCreate("Keychron", callback);
      },
      function (callback) {
        keyboardBrandCreate("Logitech", callback);
      },
      function (callback) {
        keyboardBrandCreate("Ducky", callback);
      },
    ],
    cb
  );
}

async.series(
  [createKeyboardsCategory, createKeyboardsBrand, createKeyboards],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("The array is as following: " + Keyboards);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
