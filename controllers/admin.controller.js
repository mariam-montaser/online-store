const Product = require('../models/product')

const validationResult = require('express-validator').validationResult

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationErrors: req.flash('validationErrors'),
        isUser: true,
        isAdmin: true,
        productAdded: req.flash('added')[0],
        pageTitle: 'Add New Product'
    })
}


exports.postAdd = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        req.body.image = req.file.filename;
        const {name, price, description, category, image} = req.body;
        const newProduct = new Product({
            name, 
            price, 
            description, 
            category,
            image
        })
        newProduct.save()
        .then(product => {
            res.redirect('/admin/add');
        }).catch(error => {
            next(error)
        })
    } else {
        res.redirect('/admin/add');
    }
}