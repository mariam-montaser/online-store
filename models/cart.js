const mongoose = require('mongoose');

// const DB_url = 'mongodb+srv://mariammontaser:mariammontaser@node-projects-kfbwz.mongodb.net/online-shop?retryWrites=true&w=majority'

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
})
const CartItem = mongoose.model('cart', cartSchema);

module.exports = CartItem;

// add new item to cart
exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose
        .connect(DB_url)
        .then(() => {
            let item = new CartItem(data)
            return item.save()
        })
        .then(() => {
            mongoose.disconnect();
            resolve()
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

//get items by user id
exports.getItemByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose
        .connect(DB_url)
        .then(() => CartItem.find({userId: userId}, {}, {sort: {timestamp: 1}}))
        .then(items => {
            mongoose.disconnect()
            resolve(items)
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose
        .connect(DB_url)
        .then(() => 
            CartItem.updateOne({_id: id}, newData))
        .then(items => {
            mongoose.disconnect()
            resolve(items)
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
