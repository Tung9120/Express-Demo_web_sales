var db = require('../db');

module.exports.requireAdmin = function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        res.locals.errors = "Required login";
        return;
    }

    var user = db.get('users').find({id: req.signedCookies.id}).value();

    if(!user){
        res.redirect('/auth/login');
        res.locals.errors = "Wrong username";
        return;
    }
    
    next();
};