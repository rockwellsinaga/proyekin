"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }

  Profile.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Display name required!",
          },
          notNull: {
            msg: "Display name required!",
          },
        },
      },
      bio: DataTypes.TEXT,
      avatarUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );

  return Profile;
};
