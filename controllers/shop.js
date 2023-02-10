const Product = require('../models/product');

exports.getProductsPage = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            docTitle: 'Shop',
            path: '/products',
        });
    });
}

exports.getIndexPage = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'All Products',
            path: '/'
        });
    });
}

exports.getCartPage = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        docTitle: 'Your Cart'
    });
}

exports.getOrdersPage = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        docTitle: 'Your Orders'
    });
}

exports.getCheckoutPage = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        docTitle: 'Checkout'
    });
}