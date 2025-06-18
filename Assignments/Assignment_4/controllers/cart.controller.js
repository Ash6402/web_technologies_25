const Product = require("../models/Product.model");

exports.getCart = async (req, res) => {
  let products = [];
  const cart = req.session.cart;

  // console.log(cart);

  if (Array.isArray(cart)) {
    const promises = cart.map(({ id }) => Product.findOne({ _id: id }));
    products = await Promise.all(promises);
  }

  // console.log(products);

  res.render("cart", {
    title: "Cart",
    products,
    cart,
  });
};
