 const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const keyboardSchema = new Schema({
  name: {type: String, required:true},
  price: Number,
  catagory: String,
  description: String,
  numberInStock: String,
  url: String,
  brand: String,
});

// Virtual for book's URL
keyboardSchema
.virtual('url')
.get(function () {
  
});

// Compile model from schema
module.exports = mongoose.model('Keyboard', keyboardSchema );

/*

keyboard
name
price
category[..0]
description
number in stock
url
brand[1]
*/