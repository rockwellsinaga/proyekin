"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "UserId",
      });

      Post.hasMany(models.Comment, {
        foreignKey: "PostId",
      });

      Post.belongsToMany(models.Tag, {
        through: models.PostTag,
        foreignKey: "PostId",
        otherKey: "TagId",
      });
    }

    static getAllPosts(search) {
      return Post.findAll({
        where: {
          title: {
            [Op.iLike]: `%${search || ""}%`,
          },
        },
        include: [
          {
            model: sequelize.models.User,
          },
          {
            model: sequelize.models.Tag,
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    }

    get shortContent() {
      if (this.content.length > 100) {
        return this.content.slice(0, 100) + "...";
      }

      return this.content;
    }
  }

  Post.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title required!",
          },
          notNull: {
            msg: "Title required!",
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Content required!",
          },
          notNull: {
            msg: "Content required!",
          },
          len: {
            args: [10, 10000],
            msg: "Content must contain between 10 and 10000 characters!",
          },
        },
      },
      imageUrl: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  Post.beforeCreate((post) => {
    post.title = post.title.trim();
  });

  return Post;
};
