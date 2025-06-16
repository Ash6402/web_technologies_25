let users = [];

exports.getLogin = (req, res) => {
  res.render("auth/login", { title: "Login", layout: "layouts/auth" });
};

exports.getSignup = (req, res) => {
  res.render("auth/signup", { title: "Sign Up", layout: "layouts/auth" });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  res.redirect("/");
};

exports.postSignup = (req, res) => {
  const { name, email, password } = req.body;
  let exists = users.findIndex((user) => user.email == email);
  if (exists > -1) {
    req.flash("error", "User with that email already exists");
    res.redirect("signup");
  }

  users.push({ name, email, password });
  console.log(users);
  res.redirect("login");
};
