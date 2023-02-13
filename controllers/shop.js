const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProductsPage = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            prods: rows,
            docTitle: 'All Products',
            path: '/products',
        });
    })
    .catch(err => console.log(err));
}

exports.getProductPage = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then(([product]) => {
        res.render('shop/product-detail', {
            product: product[0],
            docTitle: product.title,
            path: '/products'
        })
    })
    .catch(err => console.log(err));
}

exports.getIndexPage = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData], ) => {
        res.render('shop/index', {
            prods: rows,
            docTitle: 'All Products',
            path: '/'
        });

    })
    .catch(err => console.log(err));
}

exports.getCartPage = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                docTitle: 'Your Cart', 
                products: cartProducts
            });
        });
    });
}

exports.postCartPage = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
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