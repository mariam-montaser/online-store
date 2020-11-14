const mongoose = require('mongoose');

// const DB_url = 'mongodb+srv://mariammontaser:mariammontaser@node-projects-kfbwz.mongodb.net/online-shop?retryWrites=true&w=majority'

//product model and schema
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
})
const Product = mongoose.model('product', productSchema);

module.exports = Product;