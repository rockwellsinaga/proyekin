"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    static associate(models) {
      PostTag.belongsTo(models.Post, {
        foreignKey: "PostId",
      });

      PostTag.belongsTo(models.Tag, {
        foreignKey: "TagId",
      });
    }
  }

  PostTag.init(
    {
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "unique_post_tag",
      },
      TagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "unique_post_tag",
      },
    },
    {
      sequelize,
      modelName: "PostTag",
      timestamps: false,
    }
  );

  return PostTag;
};
