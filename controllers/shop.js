const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProductsPage = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/product-list', {
            prods: products,
            docTitle: 'All Products',
            path: '/products',
        });
    })
    .catch(err => console.log(err));
}

exports.getProductPage = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId)
    .then((product) => {
        res.render('shop/product-detail', {
            product: product,
            docTitle: product.title,
            path: '/products'
        })
    })
    .catch(err => console.log(err));
}

exports.getIndexPage = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'Shop',
            path: '/'
        });

    })
    .catch(err => console.log(err));
}

exports.getCartPage = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                docTitle: 'Your Cart', 
                products: products
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

exports.postCartPage = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: {id: prodId}})
    })
    .then(products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(prodId)
    })
    .then(product => {
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity } 
       });
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({ where: { id: prodId }})
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
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