const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin:
    {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('user', userScheme);

module.exports = User;