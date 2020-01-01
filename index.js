var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var shortId = require('shortid');

var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
    .write()

var port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index', {
        name: 'Tung'
    });
});

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/users/create', function(req, res) {
    res.render('users/create');
});

app.get('/users/:id', function(req, res) {
	var id = req.params.id;
	var user = db.get('users').find({id: id});
	res.render('users/view', {
		user: user
	})
});

app.post('/users/create', function(req, res) {
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(port, function() {
    console.log('Server is running on port ' + port);
});