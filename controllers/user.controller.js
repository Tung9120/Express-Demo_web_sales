var md5 = require('md5');
var shortid = require('shortid');

var db = require('../db');

module.exports.index = function(req, res) {
   res.render('users/index', {
        users: db.get('users').value()
   });
};

module.exports.search = function(req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers
    });
};

module.exports.create = function(req, res) {
    res.render('users/create');
};

module.exports.get = function(req, res) {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();

    let user = {};
    user.id = req.body.id;
    user.name = req.body.name;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.password = md5(req.body.password);

    db.get('users').push(user).write();
    res.redirect('/users');
};