const Product = require('../models/Product.model');
const Order = require('../models/Order.model')

exports.getCheckoutPage = async (req, res) => {
  const cart = req.session.cart || [];

  const products = await Promise.all(
    cart.map(async (item) => {
      const product = await Product.findById(item.id);
      return {
        ...product.toObject(),
        quantity: item.quantity,
        total: item.price * item.quantity,
      };
    })
  );

  res.render('checkout', {
    title: 'Checkout',
    products,
  });
};

exports.placeOrder = async (req, res) => {
    const order = new Order({
        userEmail: req.body.email,
        items: req.session.cart,
    })

    await order.save()
    res.redirect("/")
}
