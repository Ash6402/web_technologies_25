const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { isAdmin } = require("../middlewares/isAdmin")

router.use(isAdmin)

router.get('/products', adminController.listProducts);
router.get('/products/add', adminController.addProductForm);
router.post('/products/add', adminController.addProduct);
router.get('/products/edit/:id', adminController.editProductForm);
router.post('/products/edit/:id', adminController.updateProduct);
router.post('/products/delete/:id', adminController.deleteProduct);
router.get('/orders', adminController.viewOrders);

module.exports = router;
