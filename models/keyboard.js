 const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const keyboardSchema = new Schema({
    name: {type: String, required:true},
    description: String,
    category: [{type: Schema.Types.ObjectId, ref: 'KeyboardCategory'}],
    brand: {type: Schema.Types.ObjectId, ref: 'KeyboardBrand'},
    price: Number,
    numberInStock: Number,
});

// Virtual for book's URL
keyboardSchema
.virtual('url')
.get(function () {
    return '/inventory/keyboard/' +this._id
  
});

// Compile model from schema
module.exports = mongoose.model('Keyboard', keyboardSchema );
