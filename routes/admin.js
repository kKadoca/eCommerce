const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// all routes here start with /admin
router.get("/add-product", adminController.getAddProductPage);

router.get("/products", adminController.getProductsPage);

router.post("/add-product", adminController.postAddProductPage);

router.get("/edit-product/:productId", adminController.getEditProductPage);

router.post("/edit-product", adminController.postEditProductPage);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
