const Product = require('../models/product');

exports.getHome = (req, res, next) => {
    const category = req.query.category;
    const validCategories = ['laptop', 'phone', 'tablet'];
    let products;
    if(category && validCategories.includes(category)) {
        //get products by category
        Product.find({category}).then(fetchedProducts => {
            products = fetchedProducts;
        });
    } else {
        //get all products
        Product.find().then(fetchedProducts => {
            products = fetchedProducts;
        });
    }
    res.render('index', {
            products,
            isUser: req.session.userid,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle: 'Homepage'
        })
}