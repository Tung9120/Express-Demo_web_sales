module.exports.postCreate = function(req, res, next){
    var errors = [];

    if(!req.body.name){
        errors.push('Name required');
    }

    if(!req.body.description){
        errors.push('Description required');
    }

    if(!req.body.price){
        errors.push('Price required');
    }

    if(errors.length){
        res.render('', {
            errors: errors,
            value: req.body
        });
        return;
    }

    next();
};