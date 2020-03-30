var Product = require('../models/product.model');

module.exports.index = async function(req, res){
    var perPage = 4;
    var page = parseInt(req.query.page) || 1;

    var products = await Product
                    .find()
                    .skip((perPage * page) - perPage)
                    .limit(perPage);

    var pageTotal = Math.ceil( await Product.find().count() / perPage);
    
   res.render('products/index', {
       products: products,
       current: page,
       pageTotal: pageTotal
   });
};

module.exports.search = async function(req, res){
    var q = req.query.q;
    var perPage = 4;
    var page = parseInt(req.query.page) || 1;

    var products = await Product
                        .find({name: {$regex: q,$options: 'ig'}})
                        .skip((perPage * page) - perPage )
                        .limit(perPage);

    var pageTotal = Math.ceil( await Product.find().count() / perPage);

    res.render('products/index', {
        products: products, 
        current: page,
        pageTotal: pageTotal,
        value: q
    });
};

module.exports.get = async function(req, res){
    var id = req.params.id;
    
    var product = await Product.findById({_id: id});
    
    res.render('products/view', {
        product: product
    });
};

module.exports.create = function(req, res){
    res.render('products/create');
};

module.exports.postCreate = async function(req, res){
    var page = req.query.page || 1;
    var productImage = (req.body.productImage) ? ( req.file.path.split('\\').slice(1).join('/') ) : "https://via.placeholder.com/150";

    var product = {};
    product.id = req.body.id;
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.productImage = productImage;

    await Product.create(product);
    
    res.redirect('/products?page=' + page);
};

