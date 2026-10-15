const { Post } = require("../models");

async function postAuthorization(req, res, next) {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
      return res.send("Post not found");
    }

    if (post.UserId !== req.session.userId) {
      return res.send("You are not authorized");
    }

    req.post = post;
    next();
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = postAuthorization;
