const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
    });
}

exports.postAddProductPage = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProductsPage = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            docTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}