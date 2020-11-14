// import modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

//import session module
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

//import routers
const homeRouter = require('./routes/home.route');
const authRouter = require('./routes/auth.route');
const productRouter = require('./routes/product.route');
const cartRouter = require('./routes/cart.route');
const adminRouter = require('./routes/admin.route');

//create new app
const app = express();

// connect to DB
const DB_URL = `mongodb+srv://mariammontaser:Py3k9DET50nnDQxR@cluster0.kfbwz.mongodb.net/blog?retryWrites=true&w=majority`;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected')).catch(error => console.log('Failed'))

// static files
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

//use flash session
app.use(flash())

//set the session store
const STORE = new SessionStore({
    uri: DB_URL,
    collection: 'sessions'
})

// use session
app.use(session({
    secret: 'this is very very very secret text ',
    saveUninitialized: false,
    resave: false,
    store: STORE
}))

//template engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// routes
app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/admin', adminRouter)

//error page
app.get('/error', (req,res, next) => {
    res.status(500)
    res.render('error', {
        isUser: req.session.userid,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Error'
    })
})

// error middleware
app.use((error, req, res, next) => {
    res.redirect('/error')
})

// not admin page
app.get('/notAdmin', (req, res, next) => {
    res.status(403)
    res.render('notAdmin', {
        isUser: req.session.userid,
        isAdmin: false,
        pageTitle: 'Not Admin'
    })
})

//not found page
app.use((req, res, next) => {
    res.status(404)
    res.render('notFound',{
        isUser: req.session.userid,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Page Not Found'
    })
})

//app listen
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is running');
})