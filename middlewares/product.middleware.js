var db = require('../db');

module.exports.requireAdmin = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        res.locals.errors = "Required login";
        return;
    }

    var user = db.get('users').find({id: req.signedCookies.userId}).value();

    if(!user){
        res.redirect('/auth/login');
        res.locals.errors = "Wrong username";
        return;
    }

    if(user.regency !== 'admin'){
        res.locals.class = 'd-none';
        res.locals.user = user;
        res.redirect('/products');
        return;
    }

    res.locals.user = user;

    next();
};