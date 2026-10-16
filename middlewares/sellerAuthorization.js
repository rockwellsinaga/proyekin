function sellerAuthorization(req, res, next) {
  if (req.session.role !== "seller") {
    const error = encodeURIComponent("Hanya seller yang dapat mengelola post");
    return res.redirect(`/?error=${error}`);
  }

  next();
}

module.exports = sellerAuthorization;
