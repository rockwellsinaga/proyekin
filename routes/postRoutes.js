const router = require("express").Router();
const PostController = require("../controllers/postController");
const authentication = require("../middlewares/authentication");
const sellerAuthorization = require("../middlewares/sellerAuthorization");
const postAuthorization = require("../middlewares/authorization");
const uploadImage = require("../middlewares/upload");

router.get("/posts/add", authentication, sellerAuthorization, PostController.addForm);
router.post(
  "/posts/add",
  authentication,
  sellerAuthorization,
  uploadImage,
  PostController.addPost
);
router.get(
  "/posts/:id/edit",
  authentication,
  sellerAuthorization,
  postAuthorization,
  PostController.editForm
);
router.post(
  "/posts/:id/edit",
  authentication,
  sellerAuthorization,
  postAuthorization,
  uploadImage,
  PostController.editPost
);
router.post(
  "/posts/:id/delete",
  authentication,
  sellerAuthorization,
  postAuthorization,
  PostController.deletePost
);
router.post("/posts/:id/comments/add", authentication, PostController.addComment);
router.get("/posts/:id", PostController.detail);

module.exports = router;
