var shortid = require('shortid');

module.exports = function(req, res, next){
    var sessionId = shortid.generate();
    if(!req.signedCookies.sessionId){
        res.cookie('sessionId', sessionId, {
            signed: true
        });
    }

    next();
};