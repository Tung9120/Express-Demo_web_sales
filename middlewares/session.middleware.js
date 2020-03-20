var shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next){
    var sessionId = shortid.generate();
    if(!req.signedCookies.sessionId){
        res.cookie('sessionId', sessionId, {
            signed: true
        }, {maxAge: 60000});
    }

    db.get('sessions').push({
        id: sessionId
    }).write();

    next();
};