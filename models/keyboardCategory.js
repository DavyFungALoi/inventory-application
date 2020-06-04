const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const keyboardCategorySchema = new Schema({
    name: {type: String, required:true},
    
});

// Virtual for book's URL
keyboardCategorySchema
.virtual('url')
.get(function () {
    return '/inventory/keyboardcategory/' +this._id
});

module.exports = mongoose.model('KeyboardCategory', keyboardCategorySchema );
