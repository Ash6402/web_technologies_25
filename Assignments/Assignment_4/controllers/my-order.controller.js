exports.myOrder = (req, res) => {
  res.render("my-orders", { title: "My Orders" });
};

exports.addToCart = async (req, res) => {
  let cart = req.session.cart;
  const { id, quantity } = req.body;

  if (!cart) {
    cart = [];
  }

  const idx = cart.findIndex((item) => item.id == id);

  if (idx > -1) {
    cart[idx].quantity++;
  } else {
    cart.push({
      id,
      quantity,
    });
  }

  console.log(cart);
  req.session.cart = cart;

  req.flash("success", "Successfully Added Item to Cart!");
  res.redirect(`/product/${id}`);
};

exports.removeFromCart = (req, res) => {
    const { id } = req.body
    const cart = req.session.cart

    req.session.cart = cart.filter((item) => item.id != id)
    res.redirect("/cart")
}

exports.updateCartItem = (req, res) => {
    const { id, quantity } = req.body;

    const cart = req.session.cart;

    cart.forEach((item, idx) => {
        if(item.id == id) {
            cart[idx].quantity = quantity;
        }
    })

    req.session.cart = cart;
    res.redirect("/cart")
}
