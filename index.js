
var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(req, res) {
	res.send('Hello Express js');
});

app.get('/users', function(req, res) {
	res.send('User list');
});

app.listen(port, function() {
	console.log('Server is running on port ' + port);
});