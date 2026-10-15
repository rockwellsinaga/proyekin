"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "UserId",
      });

      Comment.belongsTo(models.Post, {
        foreignKey: "PostId",
      });
    }
  }

  Comment.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Comment required!",
          },
          notNull: {
            msg: "Comment required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  return Comment;
};
