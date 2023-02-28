const Product = require("../models/product");

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        docTitle: "All Products",
        path: "/products",
      });
    })
    .catch(err => console.log(err));
};

exports.getProductPage = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        docTitle: product.title,
        path: "/products",
      });
    })
    .catch(err => console.log(err));
};

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        docTitle: "Shop",
        path: "/",
      });
    })
    .catch(err => console.log(err));
};

exports.getCartPage = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render("shop/cart", {
        path: "/cart",
        docTitle: "Your Cart",
        products: products,
      });
    })
    .catch(err => console.log(err));
};

exports.postCartPage = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
	.then(product => {
		return req.user.addToCart(product);
	})
	.then(result => {
		console.log(result);
		res.redirect('/cart');
	});
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteCartItem(prodId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
		.addOrder()
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => console.log(err));
};

exports.getOrdersPage = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render("shop/orders", {
        path: "/orders",
        docTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch(err => console.log(err));
};
