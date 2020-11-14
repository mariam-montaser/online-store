const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check

const authGuard = require('./guards/auth.guard')
const cartController = require('../controllers/cart.controller')

router.get('/', authGuard.isAuth, cartController.getCartPage)

router.post('/', authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check('amount').not().isEmpty().withMessage('amount is required').isInt({min: 1}).withMessage('amount must be at least one'),
    cartController.AddCartItem)

router.post('/save', authGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check('amount').not().isEmpty().withMessage('amount is required').isInt({ min: 1 }).withMessage('amount must be at least one'),
    cartController.updateCart)

router.post('/delete', authGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    cartController.deleteCartItem)


module.exports = router