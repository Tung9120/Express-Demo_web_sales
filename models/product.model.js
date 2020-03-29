var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String, 
    productImage: String,
    description: String,
    price: Number
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;