var express = require('express');
var multer = require('multer');

var upload = multer({dest: './public/uploads/'});

var controller = require('../controllers/product.controller');
var validate = require('../validate/product.validate');
var authMiddleware = require('../middlewares/product.middleware');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create',authMiddleware.requireAdmin, controller.create);

router.get('/:id', controller.get);

router.post('/create', upload.single('productImage'),authMiddleware.requireAdmin, validate.postCreate, controller.postCreate);

module.exports = router;
