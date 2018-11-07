const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// Creates section in DB
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            mood: req.body.mood
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        console.print(req);
        res.send('Product Created successfully')
    })
};

// Grabs information from DB
exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

// Updates from DB
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

// Deletes from DB
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

