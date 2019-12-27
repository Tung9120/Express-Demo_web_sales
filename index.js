var express = require('express');
var app = express();
var port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
	res.render('index', {
		name: 'Tung'
	});
});

app.get('/users', function(req, res) {
	res.render('users/index', {
		users: [
			{name: 'Nguyen Van A'},
			{name: 'Nguyen Van B'}
		]
	});
});

app.listen(port, function() {
	console.log('Server is running on port ' + port);
});