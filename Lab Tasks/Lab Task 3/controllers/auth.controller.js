const bcrypt = require("bcrypt");
const User = require("../models/User.model");

exports.getLogin = (req, res) => {
  res.render("auth/login", { title: "Login", layout: "layouts/auth" });
};

exports.getSignup = (req, res) => {
  res.render("auth/signup", { title: "Sign Up", layout: "layouts/auth" });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (
    !user ||
    (user.password && !(await bcrypt.compare(password, user.password)))
  ) {
    req.flash("error", "Invalid Username or Password");
    res.redirect("login");
  }

  req.session.user = {
    name: user.name,
    email: user.email,
  };

  res.redirect("/");
};

exports.postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  let existing_user = await User.findOne({ email }).exec();
  if (existing_user) {
    req.flash("error", "User with that email already exists");
    res.redirect("signup");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  user.save();

  res.redirect("login");
};

exports.logout = (req, res) => {
  req.session.user = null;
  res.redirect("/auth/login");
};
