"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Post, {
        through: models.PostTag,
        foreignKey: "TagId",
        otherKey: "PostId",
      });
    }
  }

  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Tag name required!",
          },
          notNull: {
            msg: "Tag name required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );

  return Tag;
};
