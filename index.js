var express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');

var port = 3000;

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index', {
        name: 'Tung'
    });
});

app.get('/test', function(req, res) {
	res.render('index2',{
		content: 'PUG'
	});
});

app.use('/users', userRoute);

app.listen(port, function() {
    console.log('Server is running on port ' + port);
});