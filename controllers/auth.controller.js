const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const validationResult = require('express-validator').validationResult // for valdition results

// sign up get & post
exports.getSignup = (req, res, next) => {
    res.render('signup', {
        authError: req.flash('authError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAdmin: false,
        pageTitle: 'Sign Up'
    })
}

exports.postSignup = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        const {username, email, password} = req.body;
        const newUser = new User({username, email, password});
        newUser.save().then(user => {
            res.redirect('/login');
        })
        .catch(error => {
            req.flash('authError', error);
            res.redirect('/signup');
        })
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/signup');
    }
}

// login get & post
exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash('authError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAdmin: false,
        pageTitle: 'Login'
    })
}

exports.postLogin = (req, res, next) => {
    const {email, password} = req.body;
    if(validationResult(req).isEmpty()) {
        User.findOne({email}).then(user => {
            if(!user) {
                res.redirect('/login');
            } else {
                bcrypt.compare(password, user.password).then(same => {
                    if (!same) {
                        res.redirect('/login');
                    } else {
                        //set session
                        req.session.userid = result.id;
                        req.session.isAdmin = result.isAdmin;
                        res.redirect('/');
                    }
                })
            }
        })
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/login') 
    }
}

//log out
exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}