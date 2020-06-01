const Keyboard = require('../models/keyboard')
const KeyboardCategory = require('../models/keyboardCategory')
const mongoose = require('mongoose');

//Homepage//

exports.index = function(req, res,) {
    res.render('index', { title: 'Local Inventory Application Home'});
}

// Display list of all Keyboards.
exports.keyboard_list = function(req, res, next) {

    Keyboard.find({}, 'name price brand category description')
    .populate('category')
      .exec(function (err, list_keyboards) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('keyboard_list', { name: 'Keyboard List', keyboard_list: list_keyboards });
      });
      
  };
/*
exports.test = function(req, res,) {
  Keyboard.findOne({name: 'Keychron K4 Wireless Mechanical Keyboard'}, function(error, story) {
    story.category = category;
    res.render('test', { title: 'Local Inventory Application Home'});

}
*/
/*

 Keyboard.findOne({name: 'Keychron K4 Wireless Mechanical Keyboard'}, function(error, story) {
    story.category = category;
    console.log(story.category.name); // prints "Ian Fleming"
    res.render('test', { title: 'Local Inventory Application Home'});

 story.category = category;
    console.log(story.category.name); // prints "Ian Fleming"
    res.render('test', { title: 'Local Inventory Application Home'});

Story.findOne({ title: 'Casino Royale' }, function(error, story) {
  if (error) {
    return handleError(error);
  }
  story.author = author;
  console.log(story.author.name); // prints "Ian Fleming"
});
res.render('test', { title: 'Local Inventory Application Home'});
    Keyboard.find({}, 'name price brand category description').populate('category')
*/

  /*

// Display list of all Books.
exports.book_list = function(req, res, next) {

    Book.find({}, 'title author')
      .populate('author')
      .exec(function (err, list_books) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('book_list', { title: 'Book List', book_list: list_books });
      });
      
  };

  */
