const Product = require("../models/Product.model");

exports.getHomePage = async (_, res) => {

  const [t_shirts, jackets] = await Promise.all([
    Product.find({ category: "t_shirts" }).exec(),
    Product.find({ category: "jackets" }).exec(),
  ]);

  res.render("index", {
    title: "Fred Perry",
    products: {
      t_shirts,
      jackets,
    },
  });
};
