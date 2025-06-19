const express = require('express');
const router = express.Router();
const myOrderController = require("../controllers/my-order.controller");
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.get("/", isAuthenticated, myOrderController.myOrder)

router.post("/cart/add", myOrderController.addToCart)
router.post("/cart/remove", myOrderController.removeFromCart)
router.post("/cart/update", myOrderController.updateCartItem)

module.exports = router
