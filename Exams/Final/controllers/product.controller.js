const Product = require("../models/Product.model")

exports.getProduct = async (req, res)=> {
    const id = req.params.id
    const product = await Product.findOne({_id: id}).exec()
    res.render("product-page", {
        title: "Product",
        product
    })
}
