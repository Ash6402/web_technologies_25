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
const authRoutes = require("./routes/auth.route")
const myOrderRoutes = require("./routes/my-order.route")

// data for home page
const products = require("./data/products.json")

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

app.get('/', (_, res) => {
  res.render('index', { title: 'Fred Perry', products });
});

app.use("/auth", authRoutes)
app.use("/my-orders", myOrderRoutes)

app.listen(8000, () => {
    console.log("Listening on port 8080")
});
