const Product = require('../models/product');

exports.getProduct = (req, res, next) => {
    // get the first product in db
    Product.findOne({}).then(firstProduct => {
        res.render('product', {
            product: firstProduct,
            isUser: req.session.userid,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Product'
        })
    })
}

exports.getProductById = (req, res, next) => {
    const _id = req.params.id;
    Product.findOne({_id}).then(product => {
        res.render('product', {
            product,
            isUser: req.session.userid,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Product Details'
        })
    })    
}