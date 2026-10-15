const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const PostController = require("../controllers/postController");

router.get("/", PostController.home);
router.use(userRoutes);
router.use(postRoutes);

module.exports = router;
