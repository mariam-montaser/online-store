const CartItem = require('../models/cart');

const validationResult = require('express-validator').validationResult


exports.getCartPage = (req, res, next) => {
    CartItem.find({userId: req.session.userId}).then(items => {
        res.render('cart', {
            items: items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle: 'Cart'
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.AddCartItem = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        const {name, price, amount, productId} = req.body;
        const newItem = new CartItem({
            name, 
            amount, 
            price, 
            productId,
            userId: req.session.userId,
            timestamp: Date.now()
        })
        newItem.save().then(item => {
            res.redirect('/cart');
        })
        .catch(error => {
            next(error)
        })
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.updateCart = (req, res, next) => {
    if(validationResult(req).isEmpty) {
        const {_id, amount} = req.body;
        CartItem.findOne({_id}).then(item => {})
        cartModel
        .editItem(req.body.cartId, {
            amount: req.body.amount,
            timestamp: Date.now()
        })
        .then(() =>
            res.redirect('/cart')
        )
        .catch(err => next(err))
    } else {
        req.flash('validationErrors', validationResult(req).array()),
        res.redirect('/cart')
    }
}

exports.deleteCartItem = (req, res, next) => {
    CartItem.deleteOne({_id: req.body.cartId}).then(() => {
        res.redirect('/cart');
    }).catch(error => next(error));
}