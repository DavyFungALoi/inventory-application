const mongoose = require('mongoose');
const async= require('async')

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
    return '/inventory//keyboardbrandsdetail/' +this._id
  
});

module.exports = mongoose.model('KeyboardBrand', keyboardBrandSchema );


/*

return '/inventory/keyboardbrand' +this._id

/keyboardbrandsdetail/


*/

