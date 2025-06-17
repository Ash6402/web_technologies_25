const Product = require("../models/Product.model")

exports.getProduct = async (req, res)=> {
    const product = await Product.findOne().exec()
    console.log(product)
    res.render("product-page", {
        title: "Product",
        product
    })
}
