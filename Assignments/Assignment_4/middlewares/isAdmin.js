
exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.user.isAdmin) {
    return next();
  }

  res.redirect('/');
};
