const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const uploadImage = require("../middlewares/upload");

router.get("/register", UserController.showRegister);
router.post("/register", UserController.register);
router.get("/login", UserController.showLogin);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

router.get("/profile/edit", authentication, UserController.editProfileForm);
router.post("/profile/edit", authentication, uploadImage, UserController.editProfile);
router.get("/users/:id", UserController.profile);

module.exports = router;
