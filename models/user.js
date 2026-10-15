"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: "UserId",
      });

      User.hasMany(models.Post, {
        foreignKey: "UserId",
      });

      User.hasMany(models.Comment, {
        foreignKey: "UserId",
      });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username required!",
          },
          notNull: {
            msg: "Username required!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email required!",
          },
          notNull: {
            msg: "Email required!",
          },
          isEmail: {
            msg: "Invalid email format!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password required!",
          },
          notNull: {
            msg: "Password required!",
          },
          len: {
            args: [8, 255],
            msg: "Password must contain at least 8 characters!",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role required!",
          },
          notNull: {
            msg: "Role required!",
          },
          isIn: {
            args: [["buyer", "seller"]],
            msg: "Role must be buyer or seller!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });

  return User;
};
