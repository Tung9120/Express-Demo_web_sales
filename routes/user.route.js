var express = require('express');

var controller = require('../controllers/user.controller.js');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/',authMiddleware.requireAuth, controller.index);

router.get('/search',authMiddleware.requireAuth, controller.search);

router.get('/create',authMiddleware.requireAuth, controller.create);

router.get('/:id',authMiddleware.requireAuth, controller.get);

router.post('/create',authMiddleware.requireAuth, validate.postCreate, controller.postCreate);

module.exports = router;