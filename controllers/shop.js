const Product = require('../models/product');
const Cart = require('../models/cart');

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

exports.getProductPage = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('shop/product-detail', {
            product: product,
            docTitle: product.title,
            path: '/products'
        });
    });
}

exports.getCartPage = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        docTitle: 'Your Cart'
    });
}

exports.postCartPage = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
    })
    res.redirect('/cart');
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