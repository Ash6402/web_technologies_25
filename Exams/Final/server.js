const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')

require('dotenv').config()

// enable forms
app.use(express.urlencoded({ extended: true }));

// enable sessions
const session = require('express-session');

// enable flash messages
const flash = require('connect-flash');

// routes
const homeRoutes = require("./routes/home.routes")
const authRoutes = require("./routes/auth.routes")
const myOrderRoutes = require("./routes/my-order.routes")
const productRoutes = require("./routes/product.routes")
const cartRoutes = require("./routes/cart.routes")
const checkoutRoutes = require("./routes/checkout.routes")
const adminRoutes = require("./routes/admin.routes");

// data for home page
// const products = require("./data/products.json")

app.set('view engine', 'ejs');
app.use(expressLayouts); 
app.set('layout', 'layouts/main'); 

app.use(express.static('public'))

app.use(flash());

app.use(session({
  secret: '1234567890',
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
    res.locals.error = req.flash('error'),
    res.locals.success = req.flash('success'),
    res.locals.user = req.session.user
    next()
})

mongoose.connect(process.env.MONGODB_URI).then(
    () => console.log("Connected to MongoDB cluster")
)

app.use("/", homeRoutes)
app.use("/auth", authRoutes)
app.use("/my-orders", myOrderRoutes)
app.use("/product", productRoutes)
app.use("/cart", cartRoutes)
app.use("/checkout", checkoutRoutes)
app.use("/admin", adminRoutes)

app.listen(9000, () => {
    console.log("Listening on port 9000")
});
