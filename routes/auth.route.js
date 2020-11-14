const router = require('express').Router()
const bodyParser = require('body-parser') // to deal with inputs values
const check = require('express-validator').check //for validation


const authController = require('../controllers/auth.controller')
const authGuard = require('./guards/auth.guard')

router.get('/signup', authGuard.notAuth, authController.getSignup)

router.post(
    '/signup', 
    authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check('username').not().isEmpty().withMessage('user mame is required'),
    check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('invalid email'),
    check('password').not().isEmpty().withMessage('password is required').isLength({min:6}).withMessage('password must contain at least 6 charachter'),
    check('confirmPassword').custom((value, {req}) => {
        if(value === req.body.password) return true
        else throw 'Doesn\'t match'
    }),
    authController.postSignup
    )

router.get('/login', authGuard.notAuth, authController.getLogin)

router.post(
    '/login',
    authGuard.notAuth, 
    bodyParser.urlencoded({extended: true}),
    check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('invalid email'),
    check('password').not().isEmpty().withMessage('password is required').isLength({ min: 5 }).withMessage('password must contain at least 5 charachter'),
    authController.postLogin
    )

router.all('/logout', authGuard.isAuth, authController.logout)

module.exports = router