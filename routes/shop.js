const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndexPage);

router.get("/products", shopController.getProductsPage);

router.get("/products/:productId", shopController.getProductPage);

router.get('/cart', shopController.getCartPage);

router.post('/cart', shopController.postCartPage);
/*
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrdersPage); */

module.exports = router;
