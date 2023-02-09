const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
    res.render('add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        activeAddProduct: true
    });
}

exports.postAddProductPage = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProductsPage = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop', {
            prods: products,
            docTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
        });
    });
}