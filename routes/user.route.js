var express = require('express');

var controller = require('../controllers/user.controller.js');
var validate = require('../validate/user.validate');
var upload = require('../middlewares/upload.middlleware');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);

module.exports = router;