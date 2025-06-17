const express = require('express');
const router = express.Router();
const myOrderController = require("../controllers/my-order.controller");
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.get("/", isAuthenticated, myOrderController.myOrder)

module.exports = router
