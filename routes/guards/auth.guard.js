exports.isAuth = (req, res, next) => {
    if(req.session.userid) next()
    else res.redirect('/login')
}

exports.notAuth = (req, res, next) => {
    if (!req.session.userid) next()
    else res.redirect('/')
}