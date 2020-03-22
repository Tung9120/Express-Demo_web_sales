var db = require('../db');

module.exports.showCart = function(req, res, next){
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId){
        res.redirect('/products');
        return;
    }

    var session = db
        .get('sessions')
        .find({id: sessionId})
        .value();

    if(!session){
        res.render('cart/index');
        return
    }else{
        var productListInCart = session.cart;
    }

    var products = db
        .get('products')
        .value();

    var productsInCart = [];

    for(var key in productListInCart){

        var takenProduct = {};

        var matchedProducts = products.filter(function(product) {
            return product.id === key;
        });

        takenProduct.id = matchedProducts[0].id;
        takenProduct.name = matchedProducts[0].name;
        takenProduct.productImage = matchedProducts[0].productImage;
        takenProduct.description = matchedProducts[0].description
        takenProduct.price = matchedProducts[0].price;
        takenProduct.quantity = productListInCart[key];

        productsInCart.push(takenProduct);
    }

    var productQuantity = productsInCart.reduce(function(total, product){
        return total + product.quantity;
    }, 0);

    res.cookie('productQuantity', productQuantity);

    res.render('cart/index', {
        productsInCart: productsInCart
    });
};

module.exports.addToCart = function(req, res, next){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId){
         res.redirect('/products');
         return;
    }

    var count = db
        .get('sessions')
        .find({id: sessionId})
        .get('cart.' + productId, 0)
        .value();

    db.get('sessions')
        .find({id: sessionId})
        .set('cart.' + productId, count + 1)
        .write();
        
    res.redirect('/products');
};