var express = require('express');

var controller = require('../controllers/product.controller');
var validate = require('../validate/product.validate');
var authMiddleware = require('../middlewares/product.middleware');
var upload = require('../middlewares/upload.middlleware');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create',authMiddleware.requireAdmin, controller.create);

router.get('/:id', controller.get);

router.post('/create', upload.single('productImage'),authMiddleware.requireAdmin, validate.postCreate, controller.postCreate);

module.exports = router;
