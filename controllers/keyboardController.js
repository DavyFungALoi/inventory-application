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

// Display a Form where you can update a keyboard

exports.keyboard_update_get = function(req,res,next) {
  async.parallel (
        {
          keyboard_found: function(callback) {
            Keyboard.findById(req.params.id).populate('brand').populate('category').exec(callback)
            
          },
          brands: function(callback) {
            KeyboardBrand.find(callback)
          },
          categories: function(callback) {
            KeyboardCategory.find(callback)
          },
        }, function (err, results) {
          if (err) {return next(err)}
          if (results.keyboard=null) {
            console.log('no keyboard found')
            return next(err)
            
          }
          res.render('keyboard_update', {title: 'Update Keyboard', brands:results.brands, categories: results.categories, keyboard: results.keyboard_found})
        }

  )
}


// update a keyboard using the Form

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


exports.keyboard_update_post = function (req, res, next) {
  const keyboard = new Keyboard({
    name: req.body.description,
    description: req.body.description,
    category: req.body.category,
    brand: req.body.brand,
    price: req.body.price,
    numberInStock: req.body.numberInStock,
    _id:req.params.id
  });
   Keyboard.findByIdAndUpdate(req.params.id, keyboard, {}, function (err) {
    if (err) {
      return next(err);
    }
    console.log('keyboard updated');
    res.redirect("/inventory/keyboards");
  });
  console.log(keyboard);
  console.log(req.body.brand);
};
/*
Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
  if (err) { return next(err); }
     // Successful - redirect to book detail page.
     res.redirect(thebook.url);
  });

Keyboard.findByIdAndUpdate(req.params.id, keyboard, {},)(function (err) {
  if (err) {
    return next(err);
  }
  console.log('keyboard updated');
  res.redirect("/inventory/keyboards");
});
console.log(keyboard);
console.log(req.body.brand);
/*
exports.keyboard_update_post = 



exports.keyboard_update_post = function (req, res, next) {
  const keyboard = new Keyboard({
    name: req.body.description,
    description: req.body.description,
    category: req.body.category,
    brand: req.body.brand,
    price: req.body.price,
    numberInStock: req.body.numberInStock,
    _id:req.params.id
   }
    
  });
    Keyboard.findByIdAndUpdate(req.params.id, (keyboard) {
    if (err) {
      return next(err);
    }

    */
     
    

/*
// Handle book update on POST.
exports.book_update_post = [

  // Convert the genre to an array
  (req, res, next) => {
      if(!(req.body.genre instanceof Array)){
          if(typeof req.body.genre==='undefined')
          req.body.genre=[];
          else
          req.body.genre=new Array(req.body.genre);
      }
      next();
  },
 
  // Validate fields.
  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }),
  body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }),

  // Sanitize fields.
  sanitizeBody('title').escape(),
  sanitizeBody('author').escape(),
  sanitizeBody('summary').escape(),
  sanitizeBody('isbn').escape(),
  sanitizeBody('genre.*').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

  // Sanitize fields.
  sanitizeBody('title').escape(),
  sanitizeBody('author').escape(),
  sanitizeBody('summary').escape(),
  sanitizeBody('isbn').escape(),
  sanitizeBody('genre.*').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a Book object with escaped/trimmed data and old id.
      var book = new Book(
        { title: req.body.title,
          author: req.body.author,
          summary: req.body.summary,
          isbn: req.body.isbn,
          genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
          _id:req.params.id //This is required, or a new ID will be assigned!
         });

      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/error messages.

          // Get all authors and genres for form.
          async.parallel({
              authors: function(callback) {
                  Author.find(callback);
              },
              genres: function(callback) {
                  Genre.find(callback);
              },
          }, function(err, results) {
              if (err) { return next(err); }

              // Mark our selected genres as checked.
              for (let i = 0; i < results.genres.length; i++) {
                  if (book.genre.indexOf(results.genres[i]._id) > -1) {
                      results.genres[i].checked='true';
                  }
              }
              res.render('book_form', { title: 'Update Book',authors: results.authors, genres: results.genres, book: book, errors: errors.array() });
          });
          return;
      }
      else {
          // Data from form is valid. Update the record.
          Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
              if (err) { return next(err); }
                 // Successful - redirect to book detail page.
                 res.redirect(thebook.url);
              });
      }
  }
];


// Display book update form on GET.
exports.book_update_get = function(req, res, next) {

  // Get book, authors and genres for form.
  async.parallel({
      book: function(callback) {
          Book.findById(req.params.id).populate('author').populate('genre').exec(callback);
      },
      authors: function(callback) {
          Author.find(callback);
      },
      genres: function(callback) {
          Genre.find(callback);
      },
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.book==null) { // No results.
              var err = new Error('Book not found');
              err.status = 404;
              return next(err);
          }
          // Success.
          // Mark our selected genres as checked.
          for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
              for (var book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
                  if (results.genres[all_g_iter]._id.toString()==results.book.genre[book_g_iter]._id.toString()) {
                      results.genres[all_g_iter].checked='true';
                  }
              }
          }
          res.render('book_form', { title: 'Update Book', authors: results.authors, genres: results.genres, book: results.book });
      });

};

      // Create a Book object with escaped/trimmed data and old id.
      var book = new Book(
        { title: req.body.title,
          author: req.body.author,
          summary: req.body.summary,
          isbn: req.body.isbn,
          genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
          _id:req.params.id //This is required, or a new ID will be assigned!
         });

      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/error messages.

          // Get all authors and genres for form.
          async.parallel({
              authors: function(callback) {
                  Author.find(callback);
              },
              genres: function(callback) {
                  Genre.find(callback);
              },
          }, function(err, results) {
              if (err) { return next(err); }

              // Mark our selected genres as checked.
              for (let i = 0; i < results.genres.length; i++) {
                  if (book.genre.indexOf(results.genres[i]._id) > -1) {
                      results.genres[i].checked='true';
                  }
              }
              res.render('book_form', { title: 'Update Book',authors: results.authors, genres: results.genres, book: book, errors: errors.array() });
          });
          return;
      }
      else {
          // Data from form is valid. Update the record.
          Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
              if (err) { return next(err); }
                 // Successful - redirect to book detail page.
                 res.redirect(thebook.url);
              });
      }
  }
];


// Display book update form on GET.
exports.book_update_get = function(req, res, next) {

  // Get book, authors and genres for form.
  async.parallel({
      book: function(callback) {
          Book.findById(req.params.id).populate('author').populate('genre').exec(callback);
      },
      authors: function(callback) {
          Author.find(callback);
      },
      genres: function(callback) {
          Genre.find(callback);
      },
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.book==null) { // No results.
              var err = new Error('Book not found');
              err.status = 404;
              return next(err);
          }
          // Success.
          // Mark our selected genres as checked.
          for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
              for (var book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
                  if (results.genres[all_g_iter]._id.toString()==results.book.genre[book_g_iter]._id.toString()) {
                      results.genres[all_g_iter].checked='true';
                  }
              }
          }
          res.render('book_form', { title: 'Update Book', authors: results.authors, genres: results.genres, book: results.book });
      });

};
*/
