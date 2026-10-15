const router = require("express").Router();
const PostController = require("../controllers/postController");
const authentication = require("../middlewares/authentication");
const postAuthorization = require("../middlewares/authorization");
const uploadImage = require("../middlewares/upload");

router.get("/posts/add", authentication, PostController.addForm);
router.post("/posts/add", authentication, uploadImage, PostController.addPost);
router.get("/posts/:id/edit", authentication, postAuthorization, PostController.editForm);
router.post(
  "/posts/:id/edit",
  authentication,
  postAuthorization,
  uploadImage,
  PostController.editPost
);
router.post("/posts/:id/delete", authentication, postAuthorization, PostController.deletePost);
router.post("/posts/:id/comments/add", authentication, PostController.addComment);
router.get("/posts/:id", PostController.detail);

module.exports = router;
