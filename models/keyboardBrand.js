const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const keyboardBrandSchema = new Schema({
    name: {type: String, required:true},
    summary: String
    
});

// Virtual for book's URL
keyboardBrandSchema
.virtual('url')
.get(function () {
  
});

module.exports = mongoose.model('KeyboardBrand', keyboardBrandSchema );
