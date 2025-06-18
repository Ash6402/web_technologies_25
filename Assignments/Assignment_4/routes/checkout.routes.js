
const express = require("express")
const router = express.Router()
const checkoutController = require("../controllers/checkout.controller")

router.get("/", checkoutController.getCheckoutPage)
router.post("/", checkoutController.placeOrder)

module.exports = router
