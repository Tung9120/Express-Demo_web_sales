var shortid = require('shortid');

var db = require('../db');

module.exports.index = function(req, res){
    res.render('products/index', {
        products: db.get('products').value()
    });
};

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedProducts = db.get('products').value().filter(function(product){
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('products/index', {
        products: matchedProducts
    });
};

module.exports.get = function(req, res){
    var id = req.params.id;
    var product = db.get('products').find({id: id}).value();
    res.render('products/view', {
        product: product
    });
};

module.exports.create = function(req, res){
    res.render('products/create');
};

module.exports.postCreate = function(req, res){
    req.body.id = shortid.generate();
    req.body.productImage = req.file.path.split('\\').slice(1).join('/');

    let product = {};
    product.id = req.body.id;
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.productImage = req.body.productImage;

    db.get('products').push(product).write();
    res.redirect('/products');
};

