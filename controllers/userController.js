const bcrypt = require("bcryptjs");
const { User, Profile, Post, Tag, sequelize } = require("../models");
const formatDate = require("../helpers/formatDate");

class UserController {
  static showRegister(req, res) {
    res.render("register", { errors: [], input: {} });
  }

  static async register(req, res) {
    const { username, email, password, role, displayName } = req.body || {};

    try {
      await sequelize.transaction(async (transaction) => {
        const user = await User.create({ username, email, password, role }, { transaction });

        await Profile.create(
          {
            UserId: user.id,
            displayName: displayName || username,
          },
          { transaction }
        );
      });

      res.redirect("/login?message=Registrasi berhasil, silakan login");
    } catch (error) {
      const errors = error.errors ? error.errors.map((item) => item.message) : [error.message];

      res.render("register", {
        errors,
        input: { username, email, role, displayName },
      });
    }
  }

  static showLogin(req, res) {
    res.render("login", {
      error: req.query.error,
      message: req.query.message,
    });
  }

  static async login(req, res) {
    const { email, password } = req.body || {};

    try {
      const user = await User.findOne({ where: { email } });
      const isValidPassword = user && password && bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return res.redirect("/login?error=Email atau password salah");
      }

      req.session.userId = user.id;
      req.session.role = user.role;
      res.redirect("/");
    } catch (error) {
      res.send(error.message);
    }
  }

  static logout(req, res) {
    req.session.destroy((error) => {
      if (error) {
        return res.redirect("/login?error=Gagal logout");
      }

      res.redirect("/login");
    });
  }

  static async profile(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
        include: [
          Profile,
          {
            model: Post,
            include: Tag,
          },
        ],
        order: [[Post, "createdAt", "DESC"]],
      });

      if (!user) {
        return res.send("User not found");
      }

      res.render("profile", { user, formatDate, message: req.query.message });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async editProfileForm(req, res) {
    try {
      const profile = await Profile.findOne({
        where: { UserId: req.session.userId },
      });

      res.render("editProfile", { profile, errors: [] });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async editProfile(req, res) {
    const { displayName, bio } = req.body || {};
    let profile;
    let oldAvatarUrl;

    try {
      profile = await Profile.findOne({
        where: { UserId: req.session.userId },
      });
      oldAvatarUrl = profile.avatarUrl;

      if (req.uploadError) {
        throw new Error(req.uploadError);
      }

      profile.displayName = displayName;
      profile.bio = bio;

      if (req.file) {
        profile.avatarUrl = `/uploads/${req.file.filename}`;
      }

      await profile.save();
      res.redirect(`/users/${req.session.userId}?message=Profil berhasil diperbarui`);
    } catch (error) {
      const input = {
        displayName,
        bio,
        avatarUrl: profile ? oldAvatarUrl : null,
      };
      const errors = error.errors ? error.errors.map((item) => item.message) : [error.message];

      res.render("editProfile", { profile: input, errors });
    }
  }
}

module.exports = UserController;
