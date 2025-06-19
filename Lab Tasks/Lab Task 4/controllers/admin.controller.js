const Product = require('../models/Product.model');
const Order = require('../models/Order.model');

exports.listProducts = async (req, res) => {
  const products = await Product.find();
  res.render('product-list', { title: 'All Products', products });
};

exports.addProductForm = (req, res) => {
  res.render('add-product', { title: 'Add Product' });
};

exports.addProduct = async (req, res) => {
  const { name, price, description, url, category } = req.body;
  await Product.create({ name, price, description, url, category });
  res.redirect('/admin/products');
};

exports.editProductForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('edit-product', { title: 'Edit Product', product });
};

exports.updateProduct = async (req, res) => {
  const { name, price, description, url, category } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    name, price, description, url, category
  });
  res.redirect('/admin/products');
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
};

exports.viewOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.render('admin/orders', { title: 'All Orders', orders });
};
