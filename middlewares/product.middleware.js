var db = require('../db');

module.exports.requireAdmin = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/products');
        return;
    }

    var user = db.get('users').find({id: req.signedCookies.userId}).value();

    if(!user){
        res.redirect('/products');
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