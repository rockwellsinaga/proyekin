const { Post, User, Profile, Tag, Comment, sequelize } = require("../models");
const formatDate = require("../helpers/formatDate");

class PostController {
  static async home(req, res) {
    try {
      const { search } = req.query;
      const posts = await Post.getAllPosts(search);

      res.render("home", {
        posts,
        search: search || "",
        formatDate,
        message: req.query.message,
        error: req.query.error,
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async detail(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id, {
        include: [
          {
            model: User,
            include: Profile,
          },
          Tag,
          {
            model: Comment,
            include: {
              model: User,
              include: Profile,
            },
          },
        ],
        order: [[Comment, "createdAt", "ASC"]],
      });

      if (!post) {
        return res.send("Post not found");
      }

      res.render("postDetail", {
        post,
        formatDate,
        message: req.query.message,
        error: req.query.error,
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async addForm(req, res) {
    try {
      const tags = await Tag.findAll({ order: [["name", "ASC"]] });
      res.render("addPost", { tags, errors: [], input: {} });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async addPost(req, res) {
    const { title, content, location } = req.body || {};
    const TagIds = PostController.normalizeTagIds(req.body && req.body.TagIds);

    try {
      if (req.uploadError) {
        throw new Error(req.uploadError);
      }

      await sequelize.transaction(async (transaction) => {
        const post = await Post.create(
          {
            UserId: req.session.userId,
            title,
            content,
            location,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
          },
          { transaction }
        );

        await post.setTags(TagIds, { transaction });
      });

      res.redirect("/?message=Post berhasil dibuat");
    } catch (error) {
      try {
        const tags = await Tag.findAll({ order: [["name", "ASC"]] });
        res.render("addPost", {
          tags,
          errors: error.errors ? error.errors.map((item) => item.message) : [error.message],
          input: { title, content, location, TagIds },
        });
      } catch (renderError) {
        res.send(renderError.message);
      }
    }
  }

  static async editForm(req, res) {
    try {
      const post = req.post;
      const selectedTags = await post.getTags();
      const tags = await Tag.findAll({ order: [["name", "ASC"]] });

      res.render("editPost", {
        post,
        tags,
        errors: [],
        selectedTagIds: selectedTags.map((tag) => String(tag.id)),
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async editPost(req, res) {
    const { id } = req.params;
    const { title, content, location } = req.body || {};
    const TagIds = PostController.normalizeTagIds(req.body && req.body.TagIds);
    const post = req.post;
    const oldImageUrl = post.imageUrl;

    try {
      if (req.uploadError) {
        throw new Error(req.uploadError);
      }

      post.title = title;
      post.content = content;
      post.location = location;

      if (req.file) {
        post.imageUrl = `/uploads/${req.file.filename}`;
      }

      await sequelize.transaction(async (transaction) => {
        await post.save({ transaction });
        await post.setTags(TagIds, { transaction });
      });

      res.redirect(`/posts/${id}?message=Post berhasil diperbarui`);
    } catch (error) {
      try {
        const tags = await Tag.findAll({ order: [["name", "ASC"]] });
        post.title = title;
        post.content = content;
        post.location = location;
        post.imageUrl = oldImageUrl;

        res.render("editPost", {
          post,
          tags,
          errors: error.errors ? error.errors.map((item) => item.message) : [error.message],
          selectedTagIds: TagIds,
        });
      } catch (renderError) {
        res.send(renderError.message);
      }
    }
  }

  static deletePost(req, res) {
    req.post
      .destroy()
      .then(() => {
        res.redirect("/?message=Post berhasil dihapus");
      })
      .catch((error) => {
        res.send(error.message);
      });
  }

  static async addComment(req, res) {
    const { id: PostId } = req.params;
    const { content } = req.body || {};

    try {
      await Comment.create({
        UserId: req.session.userId,
        PostId,
        content,
      });

      res.redirect(`/posts/${PostId}`);
    } catch (error) {
      const message = error.errors
        ? error.errors.map((item) => item.message).join(", ")
        : error.message;

      res.redirect(`/posts/${PostId}?error=${encodeURIComponent(message)}`);
    }
  }

  static normalizeTagIds(TagIds) {
    if (!TagIds) return [];
    return Array.isArray(TagIds) ? TagIds : [TagIds];
  }
}

module.exports = PostController;
