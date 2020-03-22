var shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next){
    if(!req.signedCookies.sessionId){
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });

        db.get('sessions').push({
            id: sessionId
        }).write();
    }

    if(req.cookies.productQuantity){
        res.locals.productQuantity = req.cookies.productQuantity;
    }

    next();
};