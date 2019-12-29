var express = require('express');
var app = express();
var port = 3000;

var users = [
    { name: 'Thinh' },
    { name: 'Hung' }
];

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index', {
        name: 'Tung'
    });
});

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/users/create', function(req, res) {
	res.render('users/create');
});

app.listen(port, function() {
    console.log('Server is running on port ' + port);
});